import { useEffect, useState } from 'react';

export default function Projects() {
  const [mainProjects, setMainProjects] = useState([]);
  const [basicProjects, setBasicProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isWide, setIsWide] = useState(false);

  useEffect(() => {
    function checkWidth() {
      setIsWide(window.innerWidth >= 1023);
    }
    checkWidth();
    window.addEventListener('resize', checkWidth);
    return () => window.removeEventListener('resize', checkWidth);
  }, []);

  function normalizeUrl(url) {
    if (!url) return '';
    if (url.startsWith('http://') || url.startsWith('https://')) return url;
    return 'https://' + url;
  }

  useEffect(() => {
    setLoading(true);
    setError(null);

    Promise.all([
      fetch('https://ashim-portfolio-backend.onrender.com/api/projects?category=project').then((res) => res.json()),
      fetch('https://ashim-portfolio-backend.onrender.com/api/projects?category=basic project').then((res) => res.json()),
    ])
      .then(([mainData, basicData]) => {
        setMainProjects(mainData);
        setBasicProjects(basicData);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching projects:', err);
        setError('Failed to load projects.');
        setLoading(false);
      });
  }, []);

  if (loading)
    return <div className="text-center text-blue-300 pt-10">Loading projects...</div>;
  if (error) return <div className="text-center text-red-500 pt-10">{error}</div>;

  // Group main projects by projectType
  const groupedMainProjects = mainProjects.reduce((acc, project) => {
    const type = project.projectType || 'Other Projects';
    if (!acc[type]) acc[type] = [];
    acc[type].push(project);
    return acc;
  }, {});

  return (
    <section
      id="projects"
      className={`min-h-screen flex flex-col justify-start
        pb-24 transition-all duration-300 ease-in-out
        max-w-7xl w-full mx-auto
        ${isWide ? 'pl-[145px] pr-8' : 'px-6 pt-28'}
      `}
    >
      <h2 className="text-4xl sm:text-5xl font-semibold mb-8 text-blue-300 text-center">
        Projects
      </h2>

      {/* Grouped Main Projects */}
      {Object.entries(groupedMainProjects).map(([type, projects]) => (
        <div key={type} className="mb-16 w-full">
          <h3 className="text-2xl sm:text-3xl font-semibold text-blue-300 mb-6 text-center sm:text-left">
            {type}
          </h3>
          <div className="grid grid-cols-2 xs:grid-cols-2 md:grid-cols-2 sm:grid-cols-2 xl:grid-cols-2 gap-8 w-full">
            {projects.map(({ _id, title, description, link,link1, image, languages = [] }) => (
              <div
                key={_id}
                className="group grid grid-cols-1 md:grid-cols-[40%_60%] rounded-2xl overflow-hidden shadow-lg
                  bg-gradient-to-tr from-gray-900 via-gray-900 to-gray-800
                  border border-gray-700
                  hover:shadow-xl hover:scale-[1.03] transition-transform duration-300 cursor-pointer
                  p-6"
                title={title}
              >
                {image && (
                  <div className="overflow-hidden rounded-lg max-h-[240px] md:max-h-full">
                    <img
                      src={image}
                      alt={`Screenshot of ${title}`}
                      className="w-full h-full object-cover rounded-lg transform transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                )}
                <div className="flex flex-col justify-between gap-4 mt-6 md:mt-0 md:pl-6">
                  <h3 className="text-2xl sm:text-3xl font-semibold text-blue-400">{title}</h3>
                  <p className="text-gray-300 text-sm sm:text-base leading-relaxed">{description}</p>
                  <div className="text-sm text-gray-400">
                    <span className="font-medium">Languages:</span> {languages.join(', ')}
                  </div>
                  {link && (
                    <a
                      href={normalizeUrl(link)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-400 hover:underline text-sm sm:text-base font-semibold mt-2"
                    >
                      View Project →
                    </a>
                  )}
                   {link1 && (
                    <a
                      href={normalizeUrl(link1)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-400 hover:underline text-sm sm:text-base font-semibold mt-2"
                    >
                      Github Link →
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}

      {/* Basic Projects Section */}
      {basicProjects.length > 0 && (
        <div className="mt-16 w-full">
          <h3 className="text-2xl sm:text-3xl font-semibold text-blue-300 mb-6 text-center sm:text-left">
            Other Basic Projects
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {basicProjects.map(({ _id, title, link, description }) => (
              <div
                key={_id}
                className="p-6 rounded-2xl shadow-lg
                bg-gradient-to-tr from-gray-900 via-gray-900 to-gray-800
                border border-gray-700
                hover:shadow-xl hover:scale-[1.03] transition-transform duration-300 cursor-pointer"
                title={title}
              >
                <h4 className="text-lg sm:text-xl font-medium text-blue-400 mb-3">{title}</h4>
                <p className="text-gray-300 text-sm sm:text-base leading-relaxed">{description}</p>
                {link && (
                  <a
                    href={normalizeUrl(link)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 text-base hover:underline font-medium"
                  >
                    View →
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
