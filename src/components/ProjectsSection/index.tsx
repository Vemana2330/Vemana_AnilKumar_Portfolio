"use client";

import React, { useState, useRef, useEffect } from "react";
import AppSection from "../AppSection";
import { PROJECTS } from "@/constants/menu";
import AppButton from "../AppButton";
import AppText from "../AppText";
import GithubLogo from "@images/icons/github-logo.svg";
import GlobeIcon from "@images/icons/globe-icon.svg";
import PlayIcon from '@images/icons/play-icon.svg';
import Image from "next/image";

/*const TAGS = {
  DS: "Data Science and ML",
  IA: "IOT & Applications",
  
};*/

const PER_PAGE_PROJECTS = 3;

const randomColors = [
  "text-blue-600",
  "text-green-600",
  "text-yellow-600",
  "text-red-600",
  "text-pink-600",
  "text-purple-600",
  "text-indigo-600",
  "text-teal-600",
  "text-orange-600",
  "text-lime-600",
  "text-cyan-600",
  "text-emerald-600",
  "text-amber-600",
  "text-fuchsia-600",
  "text-true-gray-600",
];

const mainProjects = [
  {
    id: "iCHEF_IOT",
    name: "iCHEF- Smart IOT Kitchen",
    description: `Conceptualized and designed an AI-powered automated cooking system that integrates IoT, machine learning, and intuitive hardware to simplify meal preparation. Implemented a CNN model with 96% accuracy using TensorFlow and Keras to classify burnt and cooked food. Created a mobile application, designed with Figma and built using MIT App Inventor, enabling real-time monitoring, recipe customization, and social recipe sharing. Engineered a hardware prototype combining Arduino Mega, servo motors, and load cells for precise ingredient measurement and automated cooking. Curated a dataset of 76,000+ recipes to offer personalized cooking suggestions, calorie tracking, and health-conscious meal planning.`,
    techStack: ["TensorFlow", "Keras", "MIT App Inventor", "Figma", "NumPy", "Matplotlib", "Arduino Mega"],
    imgURL: "/images/iCHEF_IOT.jpg",
    githubLink: `https://github.com/Vemana2330/iChef_Smart_IOT_Kitchen`,
    //tags: [TAGS.DS]
  },

  {
    id: "maternal_health_risk_classifier",
    name: "Maternal Health Risk Classifier",
    description: `The project focused on meticulous data preprocessing, including cleaning, outlier detection, and feature scaling, ensuring high-quality inputs for model training. Feature importance analysis revealed blood sugar (35.6%) as the most significant predictor of risk levels. Exploratory data analysis highlighted key patterns that could assist healthcare professionals in real-time risk assessment. Future improvements include expanding regional datasets and integrating advanced decision-support systems for early risk detection and enhanced maternal health outcomes.`,
    techStack: [ "Logistic Regression", "Decision Tree", "Random Forest", "Scikit-learn", "Pandas", "Seaborn", "Matplotlib"],
    imgURL: "/images/maternal_Health.jpg",
    githubLink: `https://github.com/Vemana2330/Maternal_Health_Risk_Classifier`,
    //tags: [TAGS.DS]
  },

  {
    id: "living_ease",
    name: "LivingEase- Resident Management System",
    description: "Designed an integrated Resident Management System application to streamline operations in gated communities, addressing inefficiencies, poor coordination, and communication gaps. Key services like amenity booking, maintenance allocation, and pest control scheduling were automated to ensure timely execution. Intuitive interfaces were designed for residents, administrators, service providers, and delivery personnel to facilitate smooth interactions. Real-time notifications for events, emergencies, and service updates were integrated, improving communication and transparency. The system fostered a connected ecosystem, linking residents, administrators, service providers, vendors, and delivery personnel, ultimately optimizing operational efficiency and enhancing stakeholder satisfaction.",
    techStack: ["Java", "Java Swing", "NetBeans", "Java Collections Framework (JCF)", "(MVC) Design Pattern", "OOPs"],
    imgURL: "/images/rms.jpg",
    githubLink: `https://github.com/Vemana2330/LivingEase_Resident_Management_System`,
    //tags: [TAGS.DS]
  },


  {
    id: "dynamic_price_simulator",
    name: "Dynamic Pricing Simulator",
    description: `Architected a Java Swing application to streamline car pricing management through real-time sales data analysis. Enabled pricing teams to simulate and adjust target prices, driving data-driven decisions and profit optimization. Developed dynamic pricing algorithms to recommend adjustments based on sales trends and integrated reporting modules for detailed performance insights. Designed with a modular profile-and-workspace architecture, ensuring scalability and structured pricing simulations.`,
    techStack: ["Java", "Java Swing", "NetBeans", "Java Collections Framework (JCF)", "(MVC) Design Pattern", "OOPs"],
    imgURL: "/images/price_Simulator.jpg",
    githubLink: `https://github.com/Vemana2330/Dynamic_Pricing_Simulator`
    //tags: [TAGS.DA]
  },

  {
    id: "autocolorization",
    name: "Autocolorization",
    description: `Developed an automatic image colorization system using deep learning techniques, applying Convolutional Neural Networks (CNN) for transforming black-and-white images into vibrant, realistic colorized versions. Leveraged transfer learning from the pre-trained VGG16 model, enhancing the model's ability to predict accurate color mappings and generate high-quality colorized images from grayscale inputs.`,
    techStack: ["Keras", "TensorFlow", "scikit-image", "NumPy", "Matplotlib", "VGG16"],
    imgURL: "/images/autocolorization.jpg",
    githubLink: `https://github.com/Vemana2330/VGG_Autocolorization`,
    //tags: [TAGS.DS]
  },

  
  
];

const ProjectsSection = () => {
  const [selectedProjects, setSelectedProjects] = useState(mainProjects);
  const [displayedProjects, setDisplayedProjects] = useState(PER_PAGE_PROJECTS);

  const projectRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const projectObserverRefs = useRef<Record<string, IntersectionObserver | null>>({});

  useEffect(() => {
    selectedProjects.forEach((project) => {
      const projectRef = projectRefs.current[project.id];

      if (!projectRef) return;

      const obsCallBack = function (entries : IntersectionObserverEntry[]) {
        const [entry] = entries;

        if (!entry.isIntersecting) {
          projectRef.classList.remove("opacity-100");
          projectRef.classList.remove("translate-y-0");
          projectRef.classList.add("opacity-0");
          projectRef.classList.add("translate-y-[5%]");
        } else {
          projectRef.classList.remove("opacity-0");
          projectRef.classList.remove("translate-y-[5%]");
          projectRef.classList.add("opacity-100");
          projectRef.classList.add("translate-y-0");
        }
      };

      const obsOptions = {
        root: null,
        threshold: 0,
      };

      const projectObserver = new IntersectionObserver(obsCallBack, obsOptions);
      projectObserver.observe(projectRef);
      projectObserverRefs.current[project.id] = projectObserver;
    });

    return () => {
      selectedProjects.forEach((project) => {
        projectObserverRefs.current[project.id]?.disconnect();
      });
    };
  }, [selectedProjects, displayedProjects]);

  const handleOnClickBtn = () => {
    if (displayedProjects < selectedProjects.length) {
      setDisplayedProjects((prevState) => prevState + PER_PAGE_PROJECTS);
    } else {
      setDisplayedProjects((prevState) => prevState - PER_PAGE_PROJECTS);
    }
  };

  return (
    <AppSection headerTxt="Projects">
      <div className="section-content-padding w-full relative flex flex-col items-center justify-start md:gap-8 gap-6">
        <div className="sm:project-section-grid-layout flex flex-col gap-4">
          {selectedProjects.slice(0, displayedProjects).map((project) => (
            <div
              key={project.id}
              ref={(el: HTMLDivElement | null) => { projectRefs.current[project.id] = el; }}
              className="md:p-6 p-4 bg-backgroundColor-card-day dark:bg-backgroundColor-card-night w-full rounded-md opacity-0 translate-y-[5%] transition-all duration-500 ease-linear"
            >
              <div className="w-full h-[200px] sm:h-[240px] rounded-md relative mb-4 overflow-hidden">
                <Image alt={project.name} src={project.imgURL} fill />
              </div>
              <div className="flex flex-col gap-3 justify-start">
                <div className="flex gap-2 justify-between align-center">
                <AppText textTag="h3" extraMedium bold defaultColor>
                  {project.name}
                </AppText>
                  <div className="flex gap-2 align-center justify-end">
                  <a href={project.githubLink} target="_blank">
                    <GithubLogo className="h-9 w-9" />
                  </a>
                  
                </div>
                  </div>
                <AppText textTag="p" default secondary>
                  {project.description}
                </AppText>
                <div className="flex flex-wrap gap-2">
                  {project.techStack.map((stack, index) => {
                    return (
                      <p
                        key={stack}
                        className={`text-sm ${index < randomColors.length ? randomColors[index] : randomColors[Math.floor(Math.random() * (13))]}`}
                      >{`#${stack}`}</p>
                    );
                  })}
                </div>
              </div>
            </div>
          ))}
        </div>
        {selectedProjects.length > PER_PAGE_PROJECTS && (
          <AppButton
            buttonType="secondary"
            buttonText={`${
              displayedProjects < selectedProjects.length
                ? "Show More"
                : "Show Less"
            } `}
            ariaLabel={`click to ${
              displayedProjects < selectedProjects.length
                ? "Show More"
                : "Show Less"
            } projects`}
            onClick={handleOnClickBtn}
          />
        )}
      </div>
    </AppSection>
  );
}

export default ProjectsSection;
