import { motion } from "framer-motion";

export default function Welcome() {
  return (
    <section
      id="welcome"
      className="text-teal-400 mt-5 mb-8 overflow-hidden whitespace-nowrap"
    >
      <motion.h2
        className="font-semibold inline-block"
        style={{ fontSize: "clamp(1rem, 5vw, 2.5rem)" }}
       
      >
        Welcome To My Portfolio
      </motion.h2>
    </section>
  );
}
