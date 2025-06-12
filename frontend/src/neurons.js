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
    const particlesCount = Math.floor((width * height) / 8000);
    const particles = [];

    const mouse = { x: null, y: null };

    class Particle {
      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.radius = 2;
        this.vx = 0;
        this.vy = 0;
      }

      update() {
        if (mouse.x !== null && mouse.y !== null) {
          let dx = mouse.x - this.x;
          let dy = mouse.y - this.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < maxDistance && dist > 5) { // avoid exactly on mouse
            const springStrength = 0.1; // spring force
            // Normalize vector
            dx /= dist;
            dy /= dist;

            // Apply spring force
            this.vx += dx * springStrength;
            this.vy += dy * springStrength;
          }
        }

        // Apply friction
        this.vx *= 0.85;
        this.vy *= 0.85;

        // Update position
        this.x += this.vx;
        this.y += this.vy;

        // Bounce off edges with damping
        if (this.x < 0) {
          this.x = 0;
          this.vx = -this.vx * 0.7;
        } else if (this.x > width) {
          this.x = width;
          this.vx = -this.vx * 0.7;
        }
        if (this.y < 0) {
          this.y = 0;
          this.vy = -this.vy * 0.7;
        } else if (this.y > height) {
          this.y = height;
          this.vy = -this.vy * 0.7;
        }
      }

      draw() {
        ctx.beginPath();
        ctx.fillStyle = "#1e40af";
        ctx.shadowColor = "#1e40af";
        ctx.shadowBlur = 10;
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
            const alpha = 1 - dist / maxDistance;
            ctx.strokeStyle = `rgba(29,78,216,${alpha * 0.7})`;
            ctx.lineWidth = 1.3;
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
