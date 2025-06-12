import React, { useEffect, useRef } from "react";

export default function NeuronCanvas() {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const dpr = window.devicePixelRatio || 1;

    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = width + "px";
    canvas.style.height = height + "px";
    ctx.scale(dpr, dpr);

    const maxDistance = 150;
    const particlesCount = Math.floor((width * height) / 9000);
    const particles = [];

    const mouse = { x: null, y: null };

    class Particle {
      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.radius = Math.random() * 1.5 + 1;
        this.vx = (Math.random() - 0.5) * 0.4;
        this.vy = (Math.random() - 0.5) * 0.4;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0 || this.x > width) this.vx *= -1;
        if (this.y < 0 || this.y > height) this.vy *= -1;
      }

      draw() {
        let distToMouse = mouse.x !== null && mouse.y !== null
          ? Math.hypot(this.x - mouse.x, this.y - mouse.y)
          : null;

        let glowIntensity = 0;
        if (distToMouse !== null && distToMouse < maxDistance) {
          glowIntensity = 1 - distToMouse / maxDistance;
        }

        const baseColor = `rgba(30, 64, 175, 0.8)`;
        const glowColor = `rgba(70, 130, 255, ${glowIntensity * 0.9})`;

        ctx.beginPath();
        ctx.fillStyle = baseColor;
        if (glowIntensity > 0) {
          ctx.shadowColor = glowColor;
          ctx.shadowBlur = glowIntensity * 20;
        } else {
          ctx.shadowBlur = 0;
        }
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
      }
    }

    function initParticles() {
      particles.length = 0;
      for (let i = 0; i < particlesCount; i++) {
        particles.push(new Particle());
      }
    }

    function drawConnections() {
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < maxDistance) {
            let distToMouseI = mouse.x !== null && mouse.y !== null
              ? Math.hypot(particles[i].x - mouse.x, particles[i].y - mouse.y)
              : null;
            let distToMouseJ = mouse.x !== null && mouse.y !== null
              ? Math.hypot(particles[j].x - mouse.x, particles[j].y - mouse.y)
              : null;

            let glowFactor = 0;
            if (distToMouseI !== null && distToMouseI < maxDistance)
              glowFactor += 1 - distToMouseI / maxDistance;
            if (distToMouseJ !== null && distToMouseJ < maxDistance)
              glowFactor += 1 - distToMouseJ / maxDistance;

            glowFactor = Math.min(glowFactor / 2, 1);

            const baseAlpha = 0.3;
            const alpha = baseAlpha + glowFactor * 0.7;

            ctx.strokeStyle = `rgba(29,78,216,${alpha * (1 - dist / maxDistance)})`;
            ctx.lineWidth = 1.2;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
    }

    function animate() {
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p) => {
        p.update();
        p.draw();
      });

      drawConnections();

      animationRef.current = requestAnimationFrame(animate);
    }

    function onResize() {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = width + "px";
      canvas.style.height = height + "px";
      ctx.scale(dpr, dpr);
      initParticles();
    }

    function onMouseMove(e) {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    }

    function onMouseOut() {
      mouse.x = null;
      mouse.y = null;
    }

    initParticles();
    animate();

    window.addEventListener("resize", onResize);
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mouseout", onMouseOut);

    return () => {
      window.removeEventListener("resize", onResize);
      canvas.removeEventListener("mousemove", onMouseMove);
      canvas.removeEventListener("mouseout", onMouseOut);
      cancelAnimationFrame(animationRef.current);
    };
  }, []);

  return (
    <canvas
      id="neuron-canvas"
      ref={canvasRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: 0,
      }}
    />
  );
}
