import React, {useEffect, useRef} from "react";
import classNames from "classnames";
import AppSection from "../AppSection";
import { EXPERIENCE } from "@/constants/menu";
import AppText from "../AppText";
import Image from "next/image";

const experienceArr = [
  
  {
    id: "Job1",
    role: "Data Science Research Analyst ",
    company: "Oak Ridge National Laboratory, Tennessee, USA ",
    companyUrl: "https://www.ornl.gov/",
    companyLogoUrl: "/images/lab.jpeg",
    workingPeriod: "July 2024 – Sept 2024",
    highlights: [
      `Supervised a team of 10 to design an Augmented Reality airpods featuring a U-Net architecture for audio-filtering, achieving a
       35% improvement in speech clarity and conducted speech testing through Natural Language Processing libraries such as spaCy`,
      `Integrated a hearing test application with the EvE framework to boost user engagement from 150 to 2500 individual`,
      `By utilizing Tesseract, Open-CV, and a Text-to-Speech system(Deep Voice 3), constructed an algorithm to produce human speech
       by extracting information from written papers. Additionally, the model gave a Mean Opinion Score of 3.78/5.0`
    ]
  },
  {
    id: "Job2",
    role: "Research Project Associate ",
    company: "Ramaiah Institute of Technology ",
    companyUrl: "https://www.msrit.edu/",
    companyLogoUrl: "/images/ram.png",
    workingPeriod: "June 2023 – July 2024",
    highlights: [
      `Developed a mobile application using React Native for front-end and Django REST framework for back-end`,
      `Designed Machine Learning models like Multiple Regression algorithm for environmental feature extraction from sensor data and
       a Random Forest algorithm to predict nostril dominance and achieved a precision of 92%`,
      `Collaborated with the product team to design over 150 UI components on Figma and engineered data pipelines in AWS Cloud
       services, which resulted in handling peak traffic of 800 users and cost savings of $3000`
    ]
  },
  {
    id: "Job3",
    role: "Associate Consultant",
    company: "IQVIA",
    companyUrl: "https://www.iqvia.com/",
    companyLogoUrl: "/images/iqvia.jpg",
    workingPeriod: "Sept 2022 – May 2023",
    highlights: [
      `Deployed installation and operational scripts to set up the web app on servers and handled 3-4 relational databases for the clients`,
      `Performed data migration of 1 million records and implemented ETL pipelines by leveraging Oracle Data Integrator(ODI) and
       loaded into Snowflake for pre-processing the healthcare data, extracted features and modeled using SQL and Python`,
      `Scheduled tasks to run automated services in the backend which led to a 20% reduction in the server load(performance tested on
       Apache Jmeter tool) and validated profile analysis, unit testing, impact assessment with each code update for 12 clients`
    ],
  },
  {
    id: "Job4",
    role: "Associate Consultant Intern",
    company: "IQVIA",
    companyUrl: "https://www.iqvia.com/",
    companyLogoUrl: "/images/iqvia.jpg",
    workingPeriod: "Feb 2022 – Sept 2022",
    highlights: [
      'Executed CRUD operations and maintained PL/SQL packages, functions, and stored procedures for the clinical trial data to ensure compliance with GCP Guidelines which improved data accuracy by 25%' , 
      'Generated about 20 project reports/deliverables per client by utilizing IBM Cognos BI tool and streamlined data visualizations such as treemaps, bullet graphs in Tableau, leading to a 15% increase in analytical depth for product performance metrics'
    ],
  },
  
];

function ExperienceSection() {

  const timeLineRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});
  const observerRefs = useRef<{ [key: string]: IntersectionObserver }>({});

  useEffect(() => {
    experienceArr.forEach(experience => {
      const timeLineRef = timeLineRefs.current[experience.id];

      if(!timeLineRef) return;

      const obsCallBack = function (entries: IntersectionObserverEntry[]) {
        const [entry] = entries;

        if (!entry.intersectionRatio && !entry.isIntersecting) {
          timeLineRef.classList.remove(`show-timeline-content`);
          timeLineRef.classList.add(`hide-timeline-content`);
        }

        if (entry.intersectionRatio > 0.2 && entry.isIntersecting) {
          timeLineRef.classList.remove(`hide-timeline-content`);
          timeLineRef.classList.add(`show-timeline-content`);
        }
      };
      const obsOptions = {
        root: null,
        threshold: [0, 0.2],
      };
      const timelineObserver = new IntersectionObserver(
        obsCallBack,
        obsOptions,
      );
      timelineObserver.observe(timeLineRef);
      observerRefs.current[experience.id] = timelineObserver;
    });

    return () => {
      experienceArr.forEach(experience => {
        observerRefs.current[experience.id].disconnect();
      });
    };
  }, []);


  return (
    <AppSection headerTxt={EXPERIENCE}>
      <div
        className={`section-content-padding w-full relative flex flex-col gap-8 before:content-[''] before:absolute before:h-full before:w-1 before:rounded-full before:bg-borderColor lg:before:left-1/2 before:left-[30px]`}
      >
        {experienceArr.map((experience, index) => {
          return (
            <div
              className="py-4 lg:px-16 px-8 relative"
              key={experience.id}
              ref={(el) => (timeLineRefs.current[experience.id] = el)}
            >
              <div
                className={classNames(
                  `bg-backgroundColor-card-day dark:bg-backgroundColor-card-night h-full rounded-md relative p-4 border-b-4 border-borderColor hover:border-primaryColor-light lg:w-[45%] w-[calc(100%-24px)] left-[44px] transition-all duration-500 ease-in-out`,
                  index % 2 === 0 &&
                    `lg:left-0 after:content-[''] after:absolute after:h-2 after:w-2 after:rotate-45 after:bg-backgroundColor-card-day dark:after:bg-backgroundColor-card-night lg:after:left-[calc(100%-4px)] after:-left-[4px] after:top-6`,
                  index % 2 !== 0 &&
                    `lg:left-[55%] after:content-[''] after:absolute after:h-2 after:w-2 after:rotate-45 after:bg-backgroundColor-card-day dark:after:bg-backgroundColor-card-night after:-left-[4px] after:top-6`
                )}
              >
                <AppText textTag="h3" extraMedium bold defaultColor>
                  {experience.role}
                </AppText>
                <AppText textTag="p" default secondary semiBold>
                  {experience.company}
                </AppText>
                <ul className="list-disc p-4 marker:text-textColor-primary-day dark:marker:text-textColor-primary-night">
                  {experience.highlights.map((highlight, index) => {
                    return (
                        <li key={index}>
                          <AppText textTag="p" default defaultColor>
                            {highlight}
                          </AppText>
                        </li>
                    );
                  })}
                </ul>
                <AppText textTag={"p"} semiBold default defaultColor customClass="lg:hidden mt-2">
                  {experience.workingPeriod}
                </AppText>
              </div>
              <div
                className={`bg-backgroundColor-day p-2 dark:bg-backgroundColor-night border-4 border-borderColor absolute h-16 w-16 rounded-full top-3 lg:left-[calc(50%-30px)] left-0 transition-transform duration-500 ease-in-out`}
              >
                <a href={experience.companyUrl} target={"_blank"}>
                  <Image
                    alt={experience.company}
                    src={experience.companyLogoUrl}
                    fill
                  />
                </a>
              </div>
              <div
                className={classNames(
                  `w-[45%] h-16 rounded-md absolute top-2 lg:flex lg:items-center hidden transition-all duration-500 ease-in-out`,
                  index % 2 === 0 && `left-[55%]`,
                  index % 2 !== 0 && `left-0 justify-end`
                )}
              >
                <AppText textTag={"p"} semiBold default defaultColor>
                  {experience.workingPeriod}
                </AppText>
              </div>
            </div>
          );
        })}
      </div>
    </AppSection>
  );
}

export default ExperienceSection;
