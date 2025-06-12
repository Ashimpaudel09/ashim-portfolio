import { useEffect, useState } from "react";
import axios from "axios";

export default function Skills() {
  const [skills, setSkills] = useState([]);

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/skills");
        setSkills(res.data);
      } catch (err) {
        console.error("Error fetching skills:", err);
      }
    };

    fetchSkills();
  }, []);

  const getInsight = (level) => {
    if (level >= 85) return "Strong grasp of core concepts";
    if (level >= 70) return "Confident and growing steadily";
    return "Currently exploring and improving";
  };

  return (
    <section
      id="skills"
      className="
        min-h-screen
        pt-16 px-4
        text-gray-100
        max-w-7xl mx-auto
        transition-all duration-300

        /* Large screens: padding left for navbar */
        lg:pl-[145px]
        lg:pt-16

        /* Smaller screens: remove left padding, add top padding for navbar on top */
        md:pl-4 md:pt-24
        sm:pl-4 sm:pt-24
      "
    >
      <h2 className="text-4xl font-bold text-blue-400 mb-10 text-center">
        Skillset Overview
      </h2>
      <div
        className="
          grid gap-8 max-w-6xl mx-auto
          grid-cols-2
          sm:grid-cols-2
          md:grid-cols-2  /* 2 columns on medium */
          lg:grid-cols-3  /* 3 columns only on large and above */
        "
      >
        {skills.map(({ _id, name, level, icon }) => (
          <div
            key={_id}
            className="bg-gray-800 p-6 rounded-2xl shadow-md hover:shadow-blue-500/20 transition-shadow"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <img src={icon} alt={`${name} icon`} className="w-6 h-6" />
                <h3 className="text-xl font-semibold">{name}</h3>
              </div>
              <span className="text-sm text-blue-400">{level}%</span>
            </div>
            <div className="w-full h-3 bg-gray-700 rounded-full mb-3">
              <div
                className="h-3 rounded-full bg-gradient-to-r from-blue-500 to-teal-400 transition-all duration-700"
                style={{ width: `${level}%` }}
              />
            </div>
            <p className="text-sm italic text-gray-400">{getInsight(level)}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
