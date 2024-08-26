import React from "react";
import HighlightText from "../HomePage/HighlightText";
import CTAButton from "../HomePage/Button";

const LearningGridArray = [
    {
        order: -1,
        heading: "World-Class Learning for",
        highlightText: "Anyone, Anywhere",
        description:
        "Studynotion partners with more than 275+ leading universities and companies to bring flexible, affordable, job-relevant online learning to individuals and organizations worldwide.",
        BtnText: "Learn More",
        BtnLink: "/",
    },
    {
        order: 1,
        heading: "Curriculum Based on Industry Needs",
        description:
        "Save time and money! The Belajar curriculum is made to be easier to understand and in line with industry needs.",
    },
    {
        order: 2,
        heading: "Our Learning Methods",
        description:
        "The learning process uses the namely online and offline.",
    },
    {
        order: 3,
        heading: "Certification",
        description:
        "You will get a certificate that can be used as a certification during job hunting.",
    },
    {
        order: 4,
        heading: `Rating "Auto-grading"`,
        description:
        "You will immediately get feedback during the learning process without having to wait for an answer or response from the mentor.",
    },
    {
        order: 5,
        heading: "Ready to Work",
        description:
        "Connected with over 150+ hiring partners, you will have the opportunity to find a job after graduating from our program.",
    },
];

const LearningGrid = () => {
    return (
        <section>
            <div className="learningGrid grid mx-auto grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mb-10 w-[90%] max-w-[1280px] py-20">
                {
                    LearningGridArray.map((item, index) => {
                        return (    
                            <div 
                            key={index}
                            className={`
                                ${index === 0 && "lg:col-span-2"}
                                ${item.order%2 === 1 ? "bg-richblack-700": "bg-richblack-800"}
                                ${item.order === -1 && "bg-richblack-900"}
                                ${item.order === 3 && "lg:col-start-2"}
                            `}
                            >
                                {
                                    item.order < 0
                                    ? (
                                        <div className="flex flex-col gap-4 px-4 pb-8">
                                            <div className="text-4xl font-bold">
                                                <p>{item.heading}</p>
                                                <HighlightText text={item.highlightText}/>
                                            </div>
                                            <p className="text-[#838894]">
                                                {item.description}
                                            </p>
                                            <div className="w-fit">
                                                <CTAButton active={true} linkto={item.BtnLink}>
                                                    {item.BtnText}
                                                </CTAButton>
                                            </div>
                                        </div>
                                    ) 
                                    : (
                                        <div className="p-8 flex flex-col gap-8 aspect-square">
                                            <p className="font-bold">{item.heading}</p>
                                            <p className="text-[#838894]">{item.description}</p>
                                        </div>
                                    )
                                }
                            </div>
                        )
                    })
                }
            </div>
        </section>
    );
};

export default LearningGrid;
