import React, { useState } from "react";

const ProjectRepos = () => {
  const [search, setSearch] = useState("");

  const projects = [
    "Online Voting System",
    "Student Event Management",
    "AI Chatbot",
    "E-Learning Platform",
  ];

  const filteredProjects = projects.filter((project) =>
    project.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <header className="bg-white shadow-md px-6 py-4">
        <h1 className="text-xl font-semibold">Projects</h1>
      </header>
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      
      <div className="w-full max-w-lg bg-white border border-gray-300 shadow-md p-6">
        
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Project Repositories
        </h2>

        {/* Search */}
        <input
          type="text"
          placeholder="Search projects..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full border border-gray-400 px-3 py-2 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-blue-600"
        />

        {/* Project List */}
        <ul className="space-y-3">
          {filteredProjects.length > 0 ? (
            filteredProjects.map((project, index) => (
              <li
                key={index}
                className="flex items-center justify-between border border-gray-300 rounded-md px-4 py-2"
              >
                <span className="text-gray-800 font-medium">
                  {project}
                </span>

                <div className="space-x-2">
                  <button className="bg-blue-600 text-white text-sm px-3 py-1 rounded hover:bg-blue-700 transition">
                    View
                  </button>
                  <button className="bg-red-600 text-white text-sm px-3 py-1 rounded hover:bg-red-700 transition">
                    Delete
                  </button>
                </div>
              </li>
            ))
          ) : (
            <li className="text-sm text-gray-500 text-center">
              No projects found
            </li>
          )}
        </ul>
      </div>
    </div>
    </div>
  );
};

export default ProjectRepos;