import React, { useState } from "react";
import {
  SiNodedotjs,
  SiReact,
  SiTypescript,
  SiHtml5,
  SiCss3,
  SiFirebase,
  SiTailwindcss,
  SiExpo,
  SiRedux,
  SiMongodb,
  SiMysql,
  SiExpress,
  SiStyledcomponents,
  SiSass,
} from "react-icons/si";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";
import { useTransition, animated } from "react-spring";

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
  const [showAll, setShowAll] = useState(false);
  const visibleSkills = showAll
    ? competences.programming
    : competences.programming.slice(0, 6);

  const transitions = useTransition(visibleSkills, {
    keys: (item) => item,
    from: { opacity: 0, transform: "translate3d(-50px,0,0)" },
    enter: { opacity: 1, transform: "translate3d(0,0,0)" },
    leave: { opacity: 0, transform: "translate3d(-50px,0,0)" },
  });
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
      case "Firebase":
        return <SiFirebase className="text-cyan-600" />;
      case "Tailwind CSS":
        return <SiTailwindcss className="text-cyan-600" />;
      case "Expo":
        return <SiExpo className="text-cyan-600" />;
      case "Redux":
        return <SiRedux className="text-cyan-600" />;
      case "MongoDB":
        return <SiMongodb className="text-cyan-600" />;
      case "MySQL":
        return <SiMysql className="text-cyan-600" />;
      case "Express":
        return <SiExpress className="text-cyan-600" />;
      case "Styled Components":
        return <SiStyledcomponents className="text-cyan-600" />;
      case "SASS":
        return <SiSass className="text-cyan-600" />;
      default:
        return null;
    }
  }

  return (
    <div className="pt-6 text-base leading-6 font-bold sm:text-lg sm:leading-7">
      <p>{titles.skillsTitle}</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {transitions((style, skill) => (
          <animated.div
            key={skill}
            style={style}
            className="flex items-center space-x-2"
          >
            {getSkillIcon(skill)}
            <span className="text-cyan-600">{skill}</span>
          </animated.div>
        ))}
      </div>
      <button
        className="mt-4 text-cyan-600 hover:text-cyan-800 transition-colors duration-200 focus:outline-none"
        onClick={() => setShowAll(!showAll)}
      >
        {showAll ? (
          <AiOutlineMinus className="text-2xl" />
        ) : (
          <AiOutlinePlus className="text-2xl" />
        )}
      </button>
    </div>
  );
}
