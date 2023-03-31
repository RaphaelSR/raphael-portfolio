import React from "react";
import { HiOutlineMail, HiOutlinePhone } from "react-icons/hi";
import { FaLinkedin, FaGithub } from "react-icons/fa";
import { IoLanguageOutline } from "react-icons/io5";
import { ExperienceItem } from "./ExperienceItem";
import { useTranslations } from "../hooks/useTranslations";
import { Competences } from "./Competences";

const Resume = () => {
  const {
    titles,
    competences,
    contact,
    summary,
    github,
    experience,
    education,
    awards,
  } = useTranslations();

  return (
    <div className="relative py-3 sm:max-w-4xl sm:mx-auto">
      <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-light-blue-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
      <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
        <div className="flex flex-col items-center space-y-4 mb-4 sm:space-y-0 sm:space-x-10 sm:flex-row">
          <h1 className="text-4xl font-bold mb-4 text-gray-800">
            {titles.name}
          </h1>
          <img
            src="https://avatars.githubusercontent.com/u/12202804?v=4"
            alt="Raphael Rocha"
            className="w-28 h-28 sm:w-40 sm:h-40 mb-4 rounded-full border-4 border-cyan-600"
          />
        </div>

        <h2 className="text-xl sm:text-2xl font-semibold mb-2 text-gray-600">
          {titles.title}
        </h2>
        <h3 className="text-lg mb-6 text-gray-500">{titles.location}</h3>
        <div className="divide-y divide-gray-200">
          <div className="py-8 text-sm sm:text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
            <p>{summary}</p>
          </div>
          <div className="pt-6 text-sm sm:text-base leading-6 font-bold sm:text-lg sm:leading-7 space-y-2">
            <p>{titles.contactTitle}</p>
            <div className="flex items-center space-x-2">
              <HiOutlinePhone className="text-cyan-600" />
              <p className="text-cyan-600">{contact.mobile}</p>
            </div>
            <div className="flex items-center space-x-2">
              <HiOutlineMail className="text-cyan-600" />
              <p className="text-cyan-600">{contact.email}</p>
            </div>
            <div className="flex items-center space-x-2">
              <FaLinkedin className="text-cyan-600" />
              <p className="text-cyan-600">
                <a
                  href="https://www.linkedin.com/in/raphaelrocha-903014103"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {contact.linkedin}
                </a>
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <FaGithub className="text-cyan-600" />
              <p className="text-cyan-600">
                <a
                  href="https://github.com/RaphaelSR"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {github}
                </a>
              </p>
            </div>
          </div>
          <Competences competences={competences} titles={titles} />
          <div className="pt-6 text-sm sm:text-base leading-6 font-bold sm:text-lg sm:leading-7">
            <p>{titles.languagesTitle}</p>
            <div className="flex items-center space-x-2">
              <IoLanguageOutline className="text-cyan-600" />
              <span className="text-cyan-600">{competences.languages[0]}</span>
              <span className="text-cyan-600">{competences.languages[1]}</span>
            </div>
          </div>
          <div className="pt-6 text-sm sm:text-base leading-6 font-bold sm:text-lg sm:leading-7">
            <h3>{titles.experiencesTitle}</h3>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {experience.map((experience) => {
                return (
                  <ExperienceItem
                    title={experience.position}
                    period={experience.period}
                    location={experience.location}
                    description={experience.description}
                    projects={experience.projects}
                    company={experience.company}
                  />
                );
              })}
            </div>
          </div>
          <div className="pt-6 text-sm sm:text-base leading-6 font-bold sm:text-lg sm:leading-7">
            <p>{titles.educationTitle}</p>
            <p className="text-cyan-600">
              <a
                href="https://www.cesupa.br/"
                target="_blank"
                rel="noopener noreferrer"
              >
                {education.university}
              </a>
            </p>
            <p className="text-gray-500">
              {education.degree} {education.period}
            </p>
          </div>
          <div className="pt-6 text-sm sm:text-base leading-6 font-bold sm:text-lg sm:leading-7">
            <p>{titles.certificationsTitle}</p>
            <ul className="list-disc list-inside text-cyan-600">
              {competences.certifications.map((certification, index) => {
                return <li key={index}>{certification}</li>;
              })}
            </ul>
          </div>
          <div className="pt-6 text-sm sm:text-base leading-6 font-bold sm:text-lg sm:leading-7">
            <p>{titles.awardsTitle}</p>
            <ul className="list-disc list-inside text-cyan-600">
              {awards.map((awards, index) => {
                return <li key={index}>{awards}</li>;
              })}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Resume;
