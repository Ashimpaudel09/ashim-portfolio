import { useState } from "react";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";

export default function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [responseMsg, setResponseMsg] = useState("");

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResponseMsg("");

    try {
      const res = await fetch("https://ashim-portfolio-backend.onrender.com/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setResponseMsg("Message sent successfully!");
        setFormData({ name: "", email: "", message: "" });
      } else {
        setResponseMsg("Failed to send message. Please try again.");
      }
    } catch (error) {
      setResponseMsg("An error occurred. Please try again.");
      console.error("Contact form error:", error);
    }
    setLoading(false);
  };

  return (
    <section id="contact" className="min-h-screen px-6 py-12 flex flex-col items-center justify-center">
      <h2 className="text-4xl font-semibold text-blue-300 mb-8">Get in Touch</h2>

      <div className="w-full max-w-3xl rounded-lg shadow-lg p-8 space-y-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-300 mb-1">Name</label>
            <input
              type="text"
              name="name"
              placeholder="Your name"
              required
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-gray-300 mb-1">Email</label>
            <input
              type="email"
              name="email"
              placeholder="you@example.com"
              required
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-gray-300 mb-1">Message</label>
            <textarea
              name="message"
              placeholder="Write your message..."
              required
              value={formData.message}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded bg-gray-700 text-white h-32 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white px-6 py-2 rounded font-semibold transition"
          >
            {loading ? "Sending..." : "Send Message"}
          </button>
        </form>

        {responseMsg && (
          <p className="text-center text-gray-300 mt-4">{responseMsg}</p>
        )}

        <div className="flex items-center justify-center gap-6 pt-4">
          <a href="https://github.com/Ashimpaudel09" target="_blank" rel="noopener noreferrer">
            <FaGithub className="text-2xl text-gray-300 hover:text-white" />
          </a>
          <a href="https://www.linkedin.com/in/ashim-paudel-620ab4341/" target="_blank" rel="noopener noreferrer">
            <FaLinkedin className="text-2xl text-gray-300 hover:text-white" />
          </a>
          <a href="https://twitter.com/#" target="_blank" rel="noopener noreferrer">
            <FaTwitter className="text-2xl text-gray-300 hover:text-white" />
          </a>
        </div>
      </div>
    </section>
  );
}
