// components/Competences.tsx
import React from "react";
import {
  SiNodedotjs,
  SiReact,
  SiTypescript,
  SiHtml5,
  SiCss3,
} from "react-icons/si";

interface CompetencesProps {
  competences: {
    languages: string[];
    programming: string[];
    certifications: string[];
  };
  titles: {
    skillsTitle: string;
  };
}

export function Competences({ competences, titles }: CompetencesProps) {
  function getSkillIcon(skill: string) {
    switch (skill) {
      case "Node.js":
        return <SiNodedotjs className="text-cyan-600" />;
      case "React.js":
        return <SiReact className="text-cyan-600" />;
      case "React native":
        return <SiReact className="text-cyan-600" />;
      case "Typescript":
        return <SiTypescript className="text-cyan-600" />;
      case "HTML":
        return <SiHtml5 className="text-cyan-600" />;
      case "CSS":
        return <SiCss3 className="text-cyan-600" />;
      default:
        return null;
    }
  }

  return (
    <div className="pt-6 text-base leading-6 font-bold sm:text-lg sm:leading-7">
      <p>{titles.skillsTitle}</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {competences.programming.map((skill, index) => (
          <div key={index} className="flex items-center space-x-2">
            {getSkillIcon(skill)}
            <span className="text-cyan-600">{skill}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
