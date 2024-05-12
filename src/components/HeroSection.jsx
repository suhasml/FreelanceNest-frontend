import React, { useState, useEffect } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/authContext';
import video1 from '../assets/video1.mp4';
import video2 from '../assets/video2.mp4';

const HeroSection = () => {
    const { userLoggedIn } = useAuth();
    // const [isDeveloper, setIsDeveloper] = useState(false);
    // const [isProjectManager, setIsProjectManager] = useState(false);
    const [redirectToLogin, setRedirectToLogin] = useState(false);
    const { isDeveloper, setIsDeveloper, isProjectManager, setIsProjectManager } = useAuth();
    const [profession, setProfession] = useState('Developers');

    useEffect(() => {
        console.log('isDeveloper:', isDeveloper);
        console.log('isProjectManager:', isProjectManager);
    }, [isDeveloper, isProjectManager]);

    const handleDeveloperClick = () => {
        setIsDeveloper(true);
        setRedirectToLogin(true);
    };

    const handleProjectManagerClick = () => {
        setIsProjectManager(true);
        setRedirectToLogin(true);
    };

    if (userLoggedIn) {
        // Redirect the user if already logged in
        if (isDeveloper) {
            return <Navigate to="/home" replace={true} />;
        }
        if (isProjectManager) {
            return <Navigate to="/dashboard" replace={true} />;
        }
    }

    useEffect(() => {
      const interval = setInterval(() => {
        setProfession((prevProfession) =>
          prevProfession === "Developers" ? "Project Managers" : "Developers"
        );
      }, 2500); // Change every 2.5 seconds
      return () => clearInterval(interval);
    }, []);


    if (redirectToLogin) {
        // Redirect to login with state if redirectToLogin is true
        return (
            <Navigate
                to={{
                    pathname: '/login',
                }}
                replace={true}
            />
        );
    }

  return (
    <div className="flex flex-col items-center mt-6 lg:mt-20">
      <h1 className="text-4xl sm:text-6xl lg:text-7xl text-center tracking-wide">
        Freelancing Made Easier
        <span className="bg-gradient-to-r from-blue-500 to-blue-800 text-transparent bg-clip-text">
          {" "}
          For {profession}
        </span>
      </h1>
      <p className="mt-10 text-lg text-center text-neutral-500 max-w-4xl">
      In the age of seamless connectivity, innovative platforms empower developers and project managers alike, streamlining freelance collaborations with intuitive interfaces and automated workflows. Harnessing AI-driven matchmaking and real-time feedback mechanisms, the future of freelancing redefines productivity and efficiency, transcending geographical barriers for dynamic, agile project execution. Welcome to a world where synergy between talent and task is effortless, revolutionizing the landscape of remote work.
      </p>
      <div class="flex justify-center my-10">
    <button 
      class="bg-gradient-to-r  text-white from-blue-500 to-blue-800 py-3 px-4 mx-3 rounded-md" 
      onClick={handleDeveloperClick}>
        I am a Freelancer
    </button>
    <button 
      class="bg-gradient-to-r text-white from-green-500 to-green-800 py-3 px-4 mx-3 rounded-md" 
      onClick={handleProjectManagerClick}>
        I am a Project Manager
    </button>
      </div>
      <div className="flex mt-10 justify-center">
        <video
          autoPlay
          loop
          muted
          className="rounded-lg w-1/2 border border-blue-700 shadow-sm shadow-blue-400 mx-2 my-4"
        >
          <source src={video1} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <video
          autoPlay
          loop
          muted
          className="rounded-lg w-1/2 border border-blue-700 shadow-sm shadow-blue-400 mx-2 my-4"
        >
          <source src={video2} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    </div>
  );
};

export default HeroSection;
