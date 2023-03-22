import React from "react";
import "../tailwind.css";

import { HiOutlineMail, HiOutlinePhone } from "react-icons/hi";
import { FaLinkedin, FaGithub } from "react-icons/fa";
import { IoLanguageOutline } from "react-icons/io5";
import { SiNodedotjs, SiReact } from "react-icons/si";
import { ExperienceItem } from "./components/ExperienceItem";

function App() {
  return (
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-4xl sm:mx-auto">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-light-blue-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
          <h1 className="text-4xl font-bold mb-4 text-gray-800">
            Raphael Rocha
          </h1>
          <img
            src="https://avatars.githubusercontent.com/u/12202804?v=4"
            alt="Raphael Rocha"
            className="w-24 h-24 mb-4 rounded-full border-4 border-cyan-600"
          />
          <h2 className="text-2xl font-semibold mb-2 text-gray-600">
            Software Engineer | React Native | React | Node
          </h2>
          <h3 className="text-xl mb-6 text-gray-500">Belém, Pará, Brasil</h3>
          <div className="divide-y divide-gray-200">
            <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
              <p>
                Olá! Sou um desenvolvedor web com 9 anos de experiência em
                tecnologia e desenvolvimento. Tenho um forte histórico em
                desenvolvimento front-end, tendo trabalhado em vários projetos
                React e React Native e recebido feedback positivo. Minhas
                habilidades também incluem proficiência em ambientes de nuvem e
                boas práticas de cibersegurança. Como ex-engenheiro de software
                em uma startup que fundei, tenho experiência em desenvolver
                impressoras 3D e máquinas CNC e automatizar processos de
                fabricação. Prezo pelo trabalho em equipe, comunicação clara e
                direta e a constante busca por melhorias nos produtos que
                entrego.
              </p>
            </div>
            <div className="pt-6 text-base leading-6 font-bold sm:text-lg sm:leading-7 space-y-2">
              <p>Contato:</p>
              <div className="flex items-center space-x-2">
                <HiOutlinePhone className="text-cyan-600" />
                <p className="text-cyan-600">+55 91 98282-3076</p>
              </div>
              <div className="flex items-center space-x-2">
                <HiOutlineMail className="text-cyan-600" />
                <p className="text-cyan-600">raphaelrochabcc@gmail.com</p>
              </div>
              <div className="flex items-center space-x-2">
                <FaLinkedin className="text-cyan-600" />
                <p className="text-cyan-600">
                  <a
                    href="https://www.linkedin.com/in/raphaelrocha-903014103"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    www.linkedin.com/in/raphaelrocha-903014103
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
                    https://github.com/RaphaelSR
                  </a>
                </p>
              </div>
            </div>
            <div className="pt-6 text-base leading-6 font-bold sm:text-lg sm:leading-7">
              <p>Principais competências:</p>
              <div className="flex flex-wrap items-center space-x-2">
                <SiNodedotjs className="text-cyan-600" />
                <span className="text-cyan-600">Node.js</span>
                <SiReact className="text-cyan-600" />
                <span className="text-cyan-600">React.js</span>
                <SiReact className="text-cyan-600" />
                <span className="text-cyan-600">React Native</span>
              </div>
            </div>
            <div className="pt-6 text-base leading-6 font-bold sm:text-lg sm:leading-7">
              <p>Idiomas:</p>
              <div className="flex items-center space-x-2">
                <IoLanguageOutline className="text-cyan-600" />
                <span className="text-cyan-600">Português</span>
                <span className="text-cyan-600">English</span>
              </div>
            </div>
            <div className="pt-6 text-base leading-6 font-bold sm:text-lg sm:leading-7">
              <h3>Experiências:</h3>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                <ExperienceItem
                  title="Outsource Mobile Developer at Vix - Grupo Águia Branca"
                  period="julho de 2022 - Present (9 meses)"
                  location="Vitória, Espírito Santo, Brasil"
                  description="As the Lead Mobile Developer for the Vapt-jornada project, I lead the development of new features and improvements for the React Native app, which has over 10.000 active users. I am responsible for ensuring the quality and efficiency of the app, as well as maintaining the code and resolving issues."
                />

                <ExperienceItem
                  title="Outsource Front-end Developer at Wine.com.br"
                  period="outubro de 2021 - junho de 2022 (9 meses)"
                  location="Belo Horizonte, Minas Gerais, Brasil"
                  description="Front-end and mobile developer for projects at wine.com.br. I developed new features and screens for the Wine main App, integrated with new SDKs and APIs, and developed the México App, responsible for the development of new features in mobile with React Native and back-end with Node using Shopify and others APIs to integration. I also worked on the development of the Black Friday Web project made in React."
                />

                <ExperienceItem
                  title="SEPLAD"
                  period="outubro de 2020 - outubro de 2021 (1 ano 1 mês)"
                  location="Belém, Pará, Brasil"
                  description="Front-end and mobile developer for projects at SEPLAD. I developed the views with HTML, CSS and bootstrap for the DoarPA web application, and developed the Sepladpa app with webviews to access LOA and PPA government programs."
                />

                <ExperienceItem
                  title="Trend Micro"
                  period="fevereiro de 2021 - março de 2021 (2 meses)"
                  location="São Paulo, Brasil"
                  description="Trainee in Trend Micro's IT security certification program. Two months with classes about cloud computing, cloud security, ethical hacking, LGPD, overview about cybersecurity, exams, and tests every week and three cybersecurity certifications."
                />

                <ExperienceItem
                  title="Prodepa"
                  period="março de 2020 - setembro de 2020 (7 meses)"
                  location="Belém, Pará, Brasil"
                  description="Front-end developer for projects at Prodepa."
                />

                <ExperienceItem
                  title="Casa Civil do Governo do Estado do Pará"
                  period="março de 2019 - março de 2020 (1 ano 1 mês)"
                  location="Belém e Região, Brasil"
                  description="Management of the civil house network in the state of Pará. Application of improvements in the internal protocols and structure of the governor's palace."
                />

                <ExperienceItem
                  title="LAB3D"
                  period="janeiro de 2016 - julho de 2019 (3 anos 7 meses)"
                  location="Belém e Região, Brasil"
                  description="As the CEO and founding partner of Lab3D for three years, I led the development and growth of the first startup for training and manufacturing of 3D printers in the north of Brazil. As the Manager of Project Development, I utilized my expertise in digital manufacturing, automation in rapid prototyping machinery, leadership, design, and innovation to guide the development of new features for the 3D printers routines. I was responsible for the implementation of new features using C and C++ programming languages, which helped to improve the performance and efficiency of the printers. Additionally, I was responsible for the leadership and mentorship of the development team, ensuring that projects were completed on time and to the highest standards."
                />

                <ExperienceItem
                  title="Defensoria Pública do Estado do Pará"
                  period="janeiro de 2016 - janeiro de 2017 (1 ano 1 mês)"
                  location="Belém e Região, Brasil"
                  description="During my traineeship in the IT department's Network section, I gained experience in network traffic control, local server maintenance, and future network strategy planning. I developed technical skills in troubleshooting and network maintenance and learned about network security protocols. This traineeship provided a foundation in network administration and prepared me for a career in IT."
                />

                <ExperienceItem
                  title="Fabrica de software CESUPA"
                  period="fevereiro de 2015 - dezembro de 2015 (11 meses)"
                  location="Belém e Região, Brasil"
                  description="During my experience, I actively participated in programming using Ruby on Rails, Java and C# for companies located in the Amazon region through partnerships with CESUPA."
                />
              </div>
            </div>
            <div className="pt-6 text-base leading-6 font-bold sm:text-lg sm:leading-7">
              <p>Formação acadêmica:</p>
              <p className="text-cyan-600">
                <a
                  href="https://www.cesupa.br/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Cesupa - Centro Universitário do Estado do Pará
                </a>
              </p>
              <p className="text-gray-500">
                Bachelor's degree, Computer Science (2014 - 2018)
              </p>
            </div>

            <div className="pt-6 text-base leading-6 font-bold sm:text-lg sm:leading-7">
              <p>Certificações:</p>
              <ul className="list-disc list-inside text-cyan-600">
                <li>McAfee Endpoint Threat Protection/Defense</li>
                <li>Bootcamp GoStack 14</li>
                <li>Apex One Certified Professional</li>
                <li>
                  Deep Discovery Advanced Threat Detection 3.3 Certified
                  Professional
                </li>
              </ul>
            </div>
            <div className="pt-6 text-base leading-6 font-bold sm:text-lg sm:leading-7">
              <p>Prêmios e Honras:</p>
              <ul className="list-disc list-inside text-cyan-600">
                <li>Vencedor do primeiro Hackathon Insern 2021</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
