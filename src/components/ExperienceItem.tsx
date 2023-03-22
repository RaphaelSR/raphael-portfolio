import { useState } from "react";

interface ExperienceItemProps {
  title: string;
  period: string;
  location: string;
  description: string;
}

export function ExperienceItem({
  title,
  period,
  location,
  description,
}: ExperienceItemProps) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div
      className="bg-white p-4 rounded-md shadow-md cursor-pointer transition-all duration-300 ease-in-out transform hover:scale-105"
      onMouseEnter={() => setExpanded(true)}
      onMouseLeave={() => setExpanded(false)}
    >
      <h4 className="font-bold text-cyan-600">{title}</h4>
      <p className="text-gray-500">{period}</p>
      <p className="text-gray-500">{location}</p>
      {expanded && <p className="mt-2 text-gray-700">{description}</p>}
    </div>
  );
}
