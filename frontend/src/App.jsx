import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import NeuronCanvas from "./components/NeuronCanvas";
import Intro from "./components/Intro";
import Navbar from "./components/Navbar";
import About from "./components/About";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import Welcome from "./components/Welcome";
import AdminPanel from "./components/AdminPanel";

export default function App() {
  const [introDone, setIntroDone] = useState(false);

  useEffect(() => {
    if (introDone) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [introDone]);

  return (
    <Router>
      <Routes>
        {/* Admin panel route, no intro, navbar etc. */}
        <Route path="/adminpanel" element={<AdminPanel />} />

        {/* Main app route */}
        <Route
          path="/"
          element={
            <>

              <NeuronCanvas />

              <Intro onComplete={() => setIntroDone(true)} />
              <main
                id="main-content"
                className={`transition-opacity duration-700 ${introDone ? "opacity-100 visible" : "opacity-0 invisible"
                  }`}
                tabIndex={-1}
              >
                {introDone && (
                  <>
                    <Welcome />
                    <Navbar />
                    
                          <About />
                          <Skills />
                          <Projects />
                          <Contact />
                    
                  </>
                )}
              </main>
            </>
          }
        />
      </Routes>
    </Router>
  );
}
