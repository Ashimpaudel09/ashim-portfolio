import React, { useEffect, useState } from "react";

export default function Intro({ onComplete }) {
  const [moved, setMoved] = useState(false);

  useEffect(() => {
    // Lock scroll when intro is showing
    if (!moved) {
      document.body.style.overflow = "hidden";
    }

    // Unlock scroll on unmount or when moving away
    return () => {
      document.body.style.overflow = "";
    };
  }, [moved]);

  const handleEnterClick = () => {
    setMoved(true);
    if (onComplete) onComplete(); // Notify parent
    document.body.style.overflow = ""; // Enable scrolling
  };

  return (
    <div
      id="intro-block"
      className={moved ? "moved" : "centered-fixed"}
    >
      <img
        src="https://res.cloudinary.com/dmlntyta1/image/upload/v1749265923/ASHIM_PAUDEL_04507010006108_profile_pic-removebg-preview_ehelia.png"
        alt="Ashim Paudel"
        draggable={false}
        loading="eager"
        className="rounded-full object-cover shadow-lg border-4 border-navy-700"
      />
      <p className="description text-sm md:text-base text-slate-300">
        ASHIM PAUDEL
      </p>
      <small>
        <p>FULL STACK DEVELOPER</p>
        <p>DATA ANALYST</p>
      </small>

      {/* Show button only if not moved */}
      {!moved && (
        <button
          className="btn-transparent fade-in"
          onClick={handleEnterClick}
        >
          Enter My World
        </button>
      )}
    </div>
  );
}
