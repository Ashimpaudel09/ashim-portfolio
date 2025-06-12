import React, { useEffect, useState } from "react";
import './assets/navbar.css'

export default function Navbar() {
  const sections = [
    { label: "About", id: "about" },
    { label: "Skills", id: "skills" },
    { label: "Projects", id: "projects" },
    { label: "Contact", id: "contact" },
  ];

  const [activeId, setActiveId] = useState("");

  const handleScroll = (e, id) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    const handleScrollEvent = () => {
      let currentSectionId = "";
      sections.forEach(({ id }) => {
        const section = document.getElementById(id);
        if (section) {
          const rect = section.getBoundingClientRect();
          if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) {
            currentSectionId = id;
          }
        }
      });
      setActiveId(currentSectionId);
    };

    window.addEventListener("scroll", handleScrollEvent);

    // Initialize active section on mount
    handleScrollEvent();

    return () => {
      window.removeEventListener("scroll", handleScrollEvent);
    };
  }, [sections]);

  return (
    <nav id="navbar">
      {sections.map(({ label, id }) => (
        <a
          key={id}
          href={`#${id}`}
          onClick={(e) => handleScroll(e, id)}
          className={activeId === id ? "active" : ""}
        >
          {label}
        </a>
      ))}
    </nav>
  );
}
