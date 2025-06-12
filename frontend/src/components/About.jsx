import React from "react";

export default function About() {
  return (
    <section
      id="about"
      className="min-h-screen px-4 sm:px-6 md:px-12 lg:px-24 py-10 
                 flex flex-col justify-center items-center text-center
                 lg:pl-[145px] lg:pt-16
                 md:pl-4 md:pt-24
                 sm:pl-4 sm:pt-24"
    >
      <div className="max-w-4xl w-full">
        <h2 className="text-3xl sm:text-4xl font-semibold mb-6 text-blue-300">
          About Me
        </h2>

        <p className="text-sm sm:text-base md:text-lg text-gray-300 leading-relaxed mb-4">
          Hi, I’m a passionate Data Analyst (using Python) and Full Stack Developer
          with a strong foundation in the MERN stack. I enjoy building clean,
          efficient, and scalable applications that not only function well but also
          provide great user experiences. With a keen eye for patterns and a love for
          numbers, I specialize in uncovering insights from data that drive smarter
          business decisions and improve overall performance.
        </p>

        <p className="text-sm sm:text-base md:text-lg text-gray-300 leading-relaxed mb-4">
          Currently, I’m leveling up my skills by diving deeper into the world of Data
          Science. From exploring machine learning algorithms to mastering data
          visualization and predictive modeling, I'm committed to combining my
          analytical background with advanced data science tools to create even more
          impactful solutions.
        </p>

        <p className="text-xs sm:text-sm md:text-base text-gray-400 leading-relaxed">
          Beyond coding, I enjoy learning about business ideas and strategies,
          exploring new tools, and connecting with people around me. I'm an extroverted
          person who thrives in collaborative environments and loves building
          meaningful relationships both inside and outside of tech.
        </p>
      </div>
    </section>
  );
}
