// components/ExperienceItem.tsx
import { useState } from "react";

interface ExperienceItemProps {
  title: string;
  period: string;
  location: string;
  description?: string;
  projects?: Project[];
}

interface Project {
  name: string;
  description: string;
}

export function ExperienceItem({
  title,
  period,
  location,
  description,
  projects,
}: ExperienceItemProps) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div
      className={`bg-white p-4 rounded-md shadow-md cursor-pointer transition-all duration-300 ease-in-out transform ${
        expanded ? "scale-105" : ""
      }`}
      onMouseEnter={() => setExpanded(true)}
      onMouseLeave={() => setExpanded(false)}
    >
      <h4 className="font-bold text-cyan-600">{title}</h4>
      <p className="text-gray-500">{period}</p>
      <p className="text-gray-500">{location}</p>
      {expanded && (
        <>
          {description && <p className="mt-2 text-gray-700">{description}</p>}
          {projects && projects.length > 0 && (
            <div className="mt-4">
              <h5 className="font-semibold text-gray-800 mb-2">Projects:</h5>
              {projects.map((project, index) => (
                <div key={index} className="mb-2">
                  <p className="font-medium text-gray-700">{project.name}</p>
                  <p className="text-gray-600">{project.description}</p>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}
