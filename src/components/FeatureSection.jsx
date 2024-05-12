import { features } from "../constants";
import { useState,useEffect } from "react";
const FeatureSection = () => {
  const [work, setWork] = useState("Get Work");

  useEffect(() => {
    const interval = setInterval(() => {
      setWork((prevWork) =>
        prevWork === "Get Work" ? "Find Work" : "Get Work"
      );
    }, 2500); // Change every 2.5 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative mt-20 border-b border-neutral-800 min-h-[800px]">
      <div className="text-center">
        <h2 className="text-3xl sm:text-5xl lg:text-6xl mt-10 lg:mt-20 tracking-wide">
          Easy To{" "}
          <span className="bg-gradient-to-r from-blue-500 to-blue-800 text-transparent bg-clip-text">
            {work}
          </span>
        </h2>
      </div>
      <div className="flex flex-wrap mt-10 lg:mt-20">
        {features.map((feature, index) => (
          <div key={index} className="w-full sm:w-1/2 lg:w-1/3">
            <div className="flex">
              <div className="flex mx-6 h-10 w-10 p-2 bg-white-900 text-blue-700 justify-center items-center rounded-full">
                {feature.icon}
              </div>
              <div>
                <h5 className="mt-1 mb-6 text-xl">{feature.text}</h5>
                <p className="text-md p-2 mb-20 text-neutral-500">
                  {feature.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeatureSection;
