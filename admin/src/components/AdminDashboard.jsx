import { useState, useEffect } from "react";

const BACKEND_URL = "https://ashim-portfolio-backend.onrender.com";

export default function AdminDashboard({ token }) {
  // Skills state
  const [skills, setSkills] = useState([]);
  const [editingSkillId, setEditingSkillId] = useState(null);
  const [editedSkill, setEditedSkill] = useState({
    name: "",
    icon: "",
    level: 50,
  });

  // Projects state
  const [projects, setProjects] = useState([]);
  const [editingProjectId, setEditingProjectId] = useState(null);
  const [editedProject, setEditedProject] = useState({
    title: "",
    description: "",
    technologies: "",
    languages: "",
    image: "",
    link: "",
    category: "project",
    projectType: "",
  });

  // New skill and project form states
  const [newSkill, setNewSkill] = useState({
    name: "",
    icon: "",
    level: 50,
  });

  const [newProject, setNewProject] = useState({
    title: "",
    description: "",
    technologies: "",
    languages: "",
    image: "",
    link: "",
    category: "project",
    projectType: "",
  });

  // Fetch skills from backend
  useEffect(() => {
    fetchSkills();
    fetchProjects();
  }, []);

  const fetchSkills = async () => {
    try {
      const res = await fetch(`${BACKEND_URL}/api/skills`);
      const data = await res.json();
      setSkills(data);
    } catch (err) {
      console.error("Error fetching skills:", err);
    }
  };

  const fetchProjects = async () => {
    try {
      const res = await fetch(`${BACKEND_URL}/api/projects`);
      const data = await res.json();
      setProjects(data);
    } catch (err) {
      console.error("Error fetching projects:", err);
    }
  };

  // Skill handlers
  const addSkill = async (e) => {
    e.preventDefault();
    try {
      await fetch(`${BACKEND_URL}/api/skills`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newSkill),
      });
      setNewSkill({ name: "", icon: "", level: 50 });
      fetchSkills();
    } catch (err) {
      console.error("Error adding skill:", err);
    }
  };

  const updateSkill = async (id, updatedSkill) => {
    try {
      await fetch(`${BACKEND_URL}/api/skills/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updatedSkill),
      });
      setEditingSkillId(null);
      setEditedSkill({ name: "", icon: "", level: 50 });
      fetchSkills();
    } catch (err) {
      console.error("Error updating skill:", err);
    }
  };

  const deleteSkill = async (id) => {
    if (!confirm("Are you sure you want to delete this skill?")) return;
    try {
      await fetch(`${BACKEND_URL}/api/skills/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchSkills();
    } catch (err) {
      console.error("Error deleting skill:", err);
    }
  };

  // Project handlers
  const addProject = async (e) => {
    e.preventDefault();
    const payload = {
      ...newProject,
      technologies: newProject.technologies
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
      languages: newProject.languages
        .split(",")
        .map((l) => l.trim())
        .filter(Boolean),
    };
    if (payload.category.toLowerCase() === "basic project") {
      delete payload.projectType;
    }
    try {
      await fetch(`${BACKEND_URL}/api/projects`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });
      setNewProject({
        title: "",
        description: "",
        technologies: "",
        languages: "",
        image: "",
        link: "",
        category: "project",
        projectType: "",
      });
      fetchProjects();
    } catch (err) {
      console.error("Error adding project:", err);
    }
  };

  const updateProject = async (id, updatedProject) => {
    const payload = {
      ...updatedProject,
      technologies: updatedProject.technologies
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
      languages: updatedProject.languages
        .split(",")
        .map((l) => l.trim())
        .filter(Boolean),
    };
    if (payload.category.toLowerCase() === "basic project") {
      delete payload.projectType;
    }
    try {
      await fetch(`${BACKEND_URL}/api/projects/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });
      setEditingProjectId(null);
      setEditedProject({
        title: "",
        description: "",
        technologies: "",
        languages: "",
        image: "",
        link: "",
        category: "project",
        projectType: "",
      });
      fetchProjects();
    } catch (err) {
      console.error("Error updating project:", err);
    }
  };

  const deleteProject = async (id) => {
    if (!confirm("Are you sure you want to delete this project?")) return;
    try {
      await fetch(`${BACKEND_URL}/api/projects/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchProjects();
    } catch (err) {
      console.error("Error deleting project:", err);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6 text-white space-y-16 font-sans">
      <h1 className="text-6xl font-extrabold text-center tracking-wide mb-12">
        Admin Dashboard
      </h1>

      {/* Add Skill Section */}
      <section className="bg-gray-900 rounded-xl p-8 shadow-lg">
        <h2 className="text-3xl font-semibold mb-8 border-b border-green-500 pb-3">
          Add Skill
        </h2>
        <form
          onSubmit={addSkill}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end"
          aria-label="Add Skill Form"
        >
          <div className="flex flex-col">
            <label htmlFor="newSkillName" className="mb-1 text-gray-300 font-medium">
              Skill Name
            </label>
            <input
              id="newSkillName"
              type="text"
              placeholder="Skill Name"
              value={newSkill.name}
              onChange={(e) => setNewSkill({ ...newSkill, name: e.target.value })}
              className="input px-3 py-2 rounded-md bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="newSkillIcon" className="mb-1 text-gray-300 font-medium">
              Icon URL
            </label>
            <input
              id="newSkillIcon"
              type="url"
              placeholder="https://example.com/icon.png"
              value={newSkill.icon}
              onChange={(e) => setNewSkill({ ...newSkill, icon: e.target.value })}
              className="input px-3 py-2 rounded-md bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="newSkillLevel" className="mb-1 text-gray-300 font-medium">
              Skill Level: <span className="font-semibold">{newSkill.level}%</span>
            </label>
            <input
              id="newSkillLevel"
              type="range"
              min="0"
              max="100"
              value={newSkill.level}
              onChange={(e) =>
                setNewSkill({ ...newSkill, level: Number(e.target.value) })
              }
              className="w-full accent-green-500 cursor-pointer"
            />
          </div>

          <button
            type="submit"
            className="md:col-span-3 bg-green-600 hover:bg-green-700 transition-colors rounded-md py-3 font-semibold text-lg"
          >
            Add Skill
          </button>
        </form>

        {/* Skills Display */}
        <ul className="mt-10 grid gap-8 md:grid-cols-3">
          {skills.map((skill) => (
            <li
              key={skill._id}
              className="bg-gray-800 p-6 rounded-lg relative shadow-md"
            >
              {editingSkillId === skill._id ? (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    updateSkill(skill._id, editedSkill);
                  }}
                  className="space-y-5"
                  aria-label={`Edit skill ${skill.name}`}
                >
                  <div>
                    <label
                      htmlFor={`editSkillName-${skill._id}`}
                      className="block text-gray-300 mb-1 font-medium"
                    >
                      Skill Name
                    </label>
                    <input
                      id={`editSkillName-${skill._id}`}
                      type="text"
                      value={editedSkill.name}
                      onChange={(e) =>
                        setEditedSkill({ ...editedSkill, name: e.target.value })
                      }
                      className="input w-full px-3 py-2 rounded-md bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-green-500"
                      required
                    />
                  </div>

                  <div>
                    <label
                      htmlFor={`editSkillIcon-${skill._id}`}
                      className="block text-gray-300 mb-1 font-medium"
                    >
                      Icon URL
                    </label>
                    <input
                      id={`editSkillIcon-${skill._id}`}
                      type="url"
                      value={editedSkill.icon}
                      onChange={(e) =>
                        setEditedSkill({ ...editedSkill, icon: e.target.value })
                      }
                      className="input w-full px-3 py-2 rounded-md bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-green-500"
                      required
                    />
                  </div>

                  <div>
                    <label
                      htmlFor={`editSkillLevel-${skill._id}`}
                      className="block text-gray-300 mb-1 font-medium"
                    >
                      Skill Level: <span>{editedSkill.level}%</span>
                    </label>
                    <input
                      id={`editSkillLevel-${skill._id}`}
                      type="range"
                      min="0"
                      max="100"
                      value={editedSkill.level}
                      onChange={(e) =>
                        setEditedSkill({
                          ...editedSkill,
                          level: Number(e.target.value),
                        })
                      }
                      className="w-full accent-green-500 cursor-pointer"
                    />
                  </div>

                  <div className="flex justify-end gap-3">
                    <button
                      type="submit"
                      className="bg-green-600 hover:bg-green-700 transition-colors rounded-md py-2 px-4 font-semibold"
                    >
                      Save
                    </button>
                    <button
                      type="button"
                      onClick={() => setEditingSkillId(null)}
                      className="bg-gray-600 hover:bg-gray-700 transition-colors rounded-md py-2 px-4 font-semibold"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              ) : (
                <>
                  <div className="flex items-center space-x-4 mb-4">
                    <img
                      src={skill.icon}
                      alt={`${skill.name} icon`}
                      className="w-12 h-12 object-contain"
                    />
                    <h3 className="text-xl font-semibold">{skill.name}</h3>
                  </div>
                  <div className="mb-6">
                    <label
                      htmlFor={`skillLevelBar-${skill._id}`}
                      className="block mb-1 text-gray-300 font-medium"
                    >
                      Skill Level
                    </label>
                    <progress
                      id={`skillLevelBar-${skill._id}`}
                      max="100"
                      value={skill.level}
                      className="w-full h-4 rounded bg-gray-700 accent-green-500"
                    />
                    <div className="text-right text-green-400 font-semibold mt-1">
                      {skill.level}%
                    </div>
                  </div>
                  <div className="flex justify-between space-x-4">
                    <button
                      onClick={() => {
                        setEditingSkillId(skill._id);
                        setEditedSkill({
                          name: skill.name,
                          icon: skill.icon,
                          level: skill.level,
                        });
                      }}
                      className="flex-1 bg-blue-600 hover:bg-blue-700 transition-colors rounded-md py-2 font-semibold"
                      aria-label={`Edit skill ${skill.name}`}
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteSkill(skill._id)}
                      className="flex-1 bg-red-600 hover:bg-red-700 transition-colors rounded-md py-2 font-semibold"
                      aria-label={`Delete skill ${skill.name}`}
                    >
                      Delete
                    </button>
                  </div>
                </>
              )}
            </li>
          ))}
        </ul>
      </section>

      {/* Add Project Section */}
      <section className="bg-gray-900 rounded-xl p-8 shadow-lg">
        <h2 className="text-3xl font-semibold mb-8 border-b border-green-500 pb-3">
          Add Project
        </h2>
        <form
          onSubmit={addProject}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
          aria-label="Add Project Form"
        >
          <div className="flex flex-col">
            <label htmlFor="newProjectTitle" className="mb-1 text-gray-300 font-medium">
              Title
            </label>
            <input
              id="newProjectTitle"
              type="text"
              placeholder="Project Title"
              value={newProject.title}
              onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
              className="input px-3 py-2 rounded-md bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="newProjectDescription" className="mb-1 text-gray-300 font-medium">
              Description
            </label>
            <textarea
              id="newProjectDescription"
              placeholder="Project Description"
              value={newProject.description}
              onChange={(e) =>
                setNewProject({ ...newProject, description: e.target.value })
              }
              rows={4}
              className="input px-3 py-2 rounded-md bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500 resize-none"
              required
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="newProjectTechnologies" className="mb-1 text-gray-300 font-medium">
              Technologies (comma-separated)
            </label>
            <input
              id="newProjectTechnologies"
              type="text"
              placeholder="React, Node.js, Tailwind"
              value={newProject.technologies}
              onChange={(e) =>
                setNewProject({ ...newProject, technologies: e.target.value })
              }
              className="input px-3 py-2 rounded-md bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="newProjectLanguages" className="mb-1 text-gray-300 font-medium">
              Languages (comma-separated)
            </label>
            <input
              id="newProjectLanguages"
              type="text"
              placeholder="JavaScript, TypeScript"
              value={newProject.languages}
              onChange={(e) =>
                setNewProject({ ...newProject, languages: e.target.value })
              }
              className="input px-3 py-2 rounded-md bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="newProjectImage" className="mb-1 text-gray-300 font-medium">
              Image URL
            </label>
            <input
              id="newProjectImage"
              type="url"
              placeholder="https://example.com/image.png"
              value={newProject.image}
              onChange={(e) => setNewProject({ ...newProject, image: e.target.value })}
              className="input px-3 py-2 rounded-md bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="newProjectLink" className="mb-1 text-gray-300 font-medium">
              Project Link
            </label>
            <input
              id="newProjectLink"
              type="url"
              placeholder="https://example.com"
              value={newProject.link}
              onChange={(e) => setNewProject({ ...newProject, link: e.target.value })}
              className="input px-3 py-2 rounded-md bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="newProjectCategory" className="mb-1 text-gray-300 font-medium">
              Category
            </label>
            <select
              id="newProjectCategory"
              value={newProject.category}
              onChange={(e) =>
                setNewProject({ ...newProject, category: e.target.value })
              }
              className="input px-3 py-2 rounded-md bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="project">Project</option>
              <option value="basic project">Basic project</option>
            </select>
          </div>

          {/* Show Project Type only if category != basic project */}
          {newProject.category.toLowerCase() !== "basic project" && (
            <div className="flex flex-col">
              <label htmlFor="newProjectType" className="mb-1 text-gray-300 font-medium">
                Project Type
              </label>
              <input
                id="newProjectType"
                type="text"
                placeholder="Project Type"
                value={newProject.projectType}
                onChange={(e) =>
                  setNewProject({ ...newProject, projectType: e.target.value })
                }
                className="input px-3 py-2 rounded-md bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
          )}

          <div className="md:col-span-2 flex justify-end">
            <button
              type="submit"
              className="bg-green-600 hover:bg-green-700 transition-colors rounded-md py-3 px-8 font-semibold text-lg"
            >
              Add Project
            </button>
          </div>
        </form>

        {/* Projects Display */}
        <ul className="mt-10 space-y-10">
          {projects.map((project) => (
            <li
              key={project._id}
              className="bg-gray-800 p-6 rounded-lg shadow-md"
            >
              {editingProjectId === project._id ? (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    updateProject(project._id, editedProject);
                  }}
                  className="grid grid-cols-1 md:grid-cols-2 gap-6"
                  aria-label={`Edit project ${project.title}`}
                >
                  <div className="flex flex-col">
                    <label
                      htmlFor={`editProjectTitle-${project._id}`}
                      className="mb-1 text-gray-300 font-medium"
                    >
                      Title
                    </label>
                    <input
                      id={`editProjectTitle-${project._id}`}
                      type="text"
                      value={editedProject.title}
                      onChange={(e) =>
                        setEditedProject({ ...editedProject, title: e.target.value })
                      }
                      className="input px-3 py-2 rounded-md bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-green-500"
                      required
                    />
                  </div>

                  <div className="flex flex-col">
                    <label
                      htmlFor={`editProjectDescription-${project._id}`}
                      className="mb-1 text-gray-300 font-medium"
                    >
                      Description
                    </label>
                    <textarea
                      id={`editProjectDescription-${project._id}`}
                      value={editedProject.description}
                      onChange={(e) =>
                        setEditedProject({ ...editedProject, description: e.target.value })
                      }
                      rows={4}
                      className="input px-3 py-2 rounded-md bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-green-500 resize-none"
                      required
                    />
                  </div>

                  <div className="flex flex-col">
                    <label
                      htmlFor={`editProjectTechnologies-${project._id}`}
                      className="mb-1 text-gray-300 font-medium"
                    >
                      Technologies (comma-separated)
                    </label>
                    <input
                      id={`editProjectTechnologies-${project._id}`}
                      type="text"
                      value={editedProject.technologies}
                      onChange={(e) =>
                        setEditedProject({ ...editedProject, technologies: e.target.value })
                      }
                      className="input px-3 py-2 rounded-md bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                  </div>

                  <div className="flex flex-col">
                    <label
                      htmlFor={`editProjectLanguages-${project._id}`}
                      className="mb-1 text-gray-300 font-medium"
                    >
                      Languages (comma-separated)
                    </label>
                    <input
                      id={`editProjectLanguages-${project._id}`}
                      type="text"
                      value={editedProject.languages}
                      onChange={(e) =>
                        setEditedProject({ ...editedProject, languages: e.target.value })
                      }
                      className="input px-3 py-2 rounded-md bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                  </div>

                  <div className="flex flex-col">
                    <label
                      htmlFor={`editProjectImage-${project._id}`}
                      className="mb-1 text-gray-300 font-medium"
                    >
                      Image URL
                    </label>
                    <input
                      id={`editProjectImage-${project._id}`}
                      type="url"
                      value={editedProject.image}
                      onChange={(e) =>
                        setEditedProject({ ...editedProject, image: e.target.value })
                      }
                      className="input px-3 py-2 rounded-md bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                  </div>

                  <div className="flex flex-col">
                    <label
                      htmlFor={`editProjectLink-${project._id}`}
                      className="mb-1 text-gray-300 font-medium"
                    >
                      Project Link
                    </label>
                    <input
                      id={`editProjectLink-${project._id}`}
                      type="url"
                      value={editedProject.link}
                      onChange={(e) =>
                        setEditedProject({ ...editedProject, link: e.target.value })
                      }
                      className="input px-3 py-2 rounded-md bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                  </div>

                  <div className="flex flex-col">
                    <label
                      htmlFor={`editProjectCategory-${project._id}`}
                      className="mb-1 text-gray-300 font-medium"
                    >
                      Category
                    </label>
                    <select
                      id={`editProjectCategory-${project._id}`}
                      value={editedProject.category}
                      onChange={(e) =>
                        setEditedProject({ ...editedProject, category: e.target.value })
                      }
                      className="input px-3 py-2 rounded-md bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-green-500"
                    >
                      <option value="project">Project</option>
                      <option value="basic project">Basic project</option>
                    </select>
                  </div>

                  {editedProject.category.toLowerCase() !== "basic project" && (
                    <div className="flex flex-col">
                      <label
                        htmlFor={`editProjectType-${project._id}`}
                        className="mb-1 text-gray-300 font-medium"
                      >
                        Project Type
                      </label>
                      <input
                        id={`editProjectType-${project._id}`}
                        type="text"
                        value={editedProject.projectType}
                        onChange={(e) =>
                          setEditedProject({ ...editedProject, projectType: e.target.value })
                        }
                        className="input px-3 py-2 rounded-md bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-green-500"
                      />
                    </div>
                  )}

                  <div className="md:col-span-2 flex justify-end gap-4">
                    <button
                      type="submit"
                      className="bg-green-600 hover:bg-green-700 transition-colors rounded-md py-2 px-6 font-semibold"
                    >
                      Save
                    </button>
                    <button
                      type="button"
                      onClick={() => setEditingProjectId(null)}
                      className="bg-gray-600 hover:bg-gray-700 transition-colors rounded-md py-2 px-6 font-semibold"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              ) : (
                <>
                  <div className="flex justify-between items-start">
                    <h3 className="text-2xl font-semibold">{project.title}</h3>
                    <div className="space-x-3">
                      <button
                        onClick={() => {
                          setEditingProjectId(project._id);
                          setEditedProject({
                            title: project.title,
                            description: project.description,
                            technologies: project.technologies.join(", "),
                            languages: project.languages.join(", "),
                            image: project.image,
                            link: project.link,
                            category: project.category,
                            projectType: project.projectType || "",
                          });
                        }}
                        className="bg-blue-600 hover:bg-blue-700 transition-colors rounded-md py-2 px-5 font-semibold"
                        aria-label={`Edit project ${project.title}`}
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => deleteProject(project._id)}
                        className="bg-red-600 hover:bg-red-700 transition-colors rounded-md py-2 px-5 font-semibold"
                        aria-label={`Delete project ${project.title}`}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                  <p className="mt-3 text-gray-300">{project.description}</p>
                  <p className="mt-3">
                    <strong>Technologies:</strong> {project.technologies.join(", ")}
                  </p>
                  <p className="mt-1">
                    <strong>Languages:</strong> {project.languages.join(", ")}
                  </p>
                  {project.image && (
                    <img
                      src={project.image}
                      alt={project.title}
                      className="mt-4 rounded-md max-h-48 object-contain"
                    />
                  )}
                  {project.link && (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block mt-4 text-green-500 underline"
                    >
                      Visit Project
                    </a>
                  )}
                  <p className="mt-2 italic text-gray-400">
                    Category: {project.category}
                    {project.projectType ? ` | Type: ${project.projectType}` : ""}
                  </p>
                </>
              )}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
