import React from "react";
import { HiOutlineMail, HiOutlinePhone } from "react-icons/hi";
import { FaLinkedin, FaGithub } from "react-icons/fa";
import { IoLanguageOutline } from "react-icons/io5";
import { SiNodedotjs, SiReact } from "react-icons/si";
import { ExperienceItem } from "./ExperienceItem";
import { useTranslations } from "../hooks/useTranslations";

const Resume = () => {
  const translations = useTranslations();

  return (
    <div className="relative py-3 sm:max-w-4xl sm:mx-auto">
      <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-light-blue-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
      <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
        <div className="flex items-center space-x-36">
        <h1 className="text-4xl font-bold mb-4 text-gray-800">
          {translations.titles.name}
        </h1>
        <img
          src="https://avatars.githubusercontent.com/u/12202804?v=4"
          alt="Raphael Rocha"
          className="w-24 h-24 mb-4 rounded-full border-4 border-cyan-600"
        />
        </div>
        <h2 className="text-2xl font-semibold mb-2 text-gray-600">
          {translations.titles.title}
        </h2>
        <h3 className="text-xl mb-6 text-gray-500">
          {translations.titles.location}
        </h3>
        <div className="divide-y divide-gray-200">
          <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
            <p>{translations.summary}</p>
          </div>
          <div className="pt-6 text-base leading-6 font-bold sm:text-lg sm:leading-7 space-y-2">
            <p>{translations.titles.contactTitle}</p>
            <div className="flex items-center space-x-2">
              <HiOutlinePhone className="text-cyan-600" />
              <p className="text-cyan-600">{translations.contact.mobile}</p>
            </div>
            <div className="flex items-center space-x-2">
              <HiOutlineMail className="text-cyan-600" />
              <p className="text-cyan-600">{translations.contact.email}</p>
            </div>
            <div className="flex items-center space-x-2">
              <FaLinkedin className="text-cyan-600" />
              <p className="text-cyan-600">
                <a
                  href="https://www.linkedin.com/in/raphaelrocha-903014103"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {translations.contact.linkedin}
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
                  {translations.github}
                </a>
              </p>
            </div>
          </div>
          <div className="pt-6 text-base leading-6 font-bold sm:text-lg sm:leading-7">
            <p>{translations.titles.skillsTitle}</p>
            <div className="flex flex-wrap items-center space-x-2">
              <SiNodedotjs className="text-cyan-600" />
              <span className="text-cyan-600">
                {translations.competences.programming[0]}
              </span>
              <SiReact className="text-cyan-600" />
              <span className="text-cyan-600">
                {translations.competences.programming[1]}
              </span>
              <SiReact className="text-cyan-600" />
              <span className="text-cyan-600">
                {translations.competences.programming[2]}
              </span>
            </div>
          </div>
          <div className="pt-6 text-base leading-6 font-bold sm:text-lg sm:leading-7">
            <p>{translations.titles.languagesTitle}</p>
            <div className="flex items-center space-x-2">
              <IoLanguageOutline className="text-cyan-600" />
              <span className="text-cyan-600">
                {translations.competences.languages[0]}
              </span>
              <span className="text-cyan-600">
                {translations.competences.languages[1]}
              </span>
            </div>
          </div>
          <div className="pt-6 text-base leading-6 font-bold sm:text-lg sm:leading-7">
            <h3>{translations.titles.experiencesTitle}</h3>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {translations.experience.map((experience) => {
                return (
                  <ExperienceItem
                    title={experience.position}
                    period={experience.period}
                    location={experience.location}
                    description={experience.description}
                    projects={experience.projects}
                  />
                );
              })}
            </div>
          </div>
          <div className="pt-6 text-base leading-6 font-bold sm:text-lg sm:leading-7">
            <p>{translations.titles.educationTitle}</p>
            <p className="text-cyan-600">
              <a
                href="https://www.cesupa.br/"
                target="_blank"
                rel="noopener noreferrer"
              >
                {translations.education.university}
              </a>
            </p>
            <p className="text-gray-500">
              {translations.education.degree} {translations.education.period}
            </p>
          </div>

          <div className="pt-6 text-base leading-6 font-bold sm:text-lg sm:leading-7">
            <p>{translations.titles.certificationsTitle}</p>
            <ul className="list-disc list-inside text-cyan-600">
              {translations.competences.certifications.map((certification, index) => {
                return <li key={index}>{certification}</li>;
              })}
            </ul>
          </div>
          <div className="pt-6 text-base leading-6 font-bold sm:text-lg sm:leading-7">
            <p>{translations.titles.awardsTitle}</p>
            <ul className="list-disc list-inside text-cyan-600">
              {translations.awards.map((awards, index) => {
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
