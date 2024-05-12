import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Import Axios
import { useAuth } from '../../contexts/authContext';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { FallingLines } from 'react-loader-spinner';
import Select from 'react-select';
import Navbar from '../Navbar';

const Profile = () => {
    const techOptions = [
        { value: 'React', label: 'React' },
        { value: 'Node.js', label: 'Node.js' },
        { value: 'JavaScript', label: 'JavaScript' },
        { value: 'Python', label: 'Python' },
        { value: 'Java', label: 'Java' },
        { value: 'Ruby', label: 'Ruby' },
        { value: 'Swift', label: 'Swift' },
        { value: 'HTML/CSS', label: 'HTML/CSS' },
        { value: 'SQL', label: 'SQL' },
        { value: 'MongoDB', label: 'MongoDB' },
        { value: 'Firebase', label: 'Firebase' },
        { value: 'AWS', label: 'AWS' },
        { value: 'Azure', label: 'Azure' },
        { value: 'GCP', label: 'GCP' },
        { value: 'Docker', label: 'Docker' },
        { value: 'Kubernetes', label: 'Kubernetes' },
        { value: 'TensorFlow', label: 'TensorFlow' },
        { value: 'PyTorch', label: 'PyTorch' },
        { value: 'Machine Learning', label: 'Machine Learning' },
        { value: 'Deep learning', label: 'Deep learning' },
        { value: 'Natural language processing', label: 'Natural Language processing' },
        { value: 'Computer Vision', label: 'Computer Vision' },
        { value: 'Image processing', label: 'Image processing' },
        { value: 'Speech Recognistion', label: 'Speech Recognistion' },
        { value: 'Blockchain', label: 'Blockchain' },
        { value: 'Ethereum', label: 'Ethereum' },
        { value: 'Bitcoin', label: 'Bitcoin' },
        { value: 'Cryptocurrency', label: 'Cryptocurrency' },
        { value: 'Web3', label: 'Web3' },
        { value: 'Decentralized Finance', label: 'Decentralized Finance' },
        { value: 'Smart Contracts', label: 'Smart Contracts' },
        { value: 'NFT', label: 'NFT' },
        { value: 'DeFi', label: 'DeFi' },
        { value: 'Web Development', label: 'Web Development' },
        { value: 'Mobile Development', label: 'Mobile Development' },
        { value: 'Game Development', label: 'Game Development' },
        { value: 'UI/UX Design', label: 'UI/UX Design' },
        { value: 'Cybersecurity', label: 'Cybersecurity' },
        { value: 'Ethical Hacking', label: 'Ethical Hacking' },
        { value: 'Penetration Testing', label: 'Penetration Testing' },
        { value: 'Networking', label: 'Networking' },
        { value: 'Cloud Computing', label: 'Cloud Computing' },
        { value: 'DevOps', label: 'DevOps' },
        { value: 'Artificial Intelligence', label: 'Artificial Intelligence' },
        { value: 'Data Science', label: 'Data Science' },
        { value: 'Big Data', label: 'Big Data' },
        { value: 'Data Analysis', label: 'Data Analysis' },
        { value: 'Data Engineering', label: 'Data Engineering' },
        { value: 'Data Visualization', label: 'Data Visualization' },
        { value: 'Business Intelligence', label: 'Business Intelligence' },
        { value: 'Business Analysis', label: 'Business Analysis' },
        { value: 'Project Management', label: 'Project Management' },
        { value: 'Agile', label: 'Agile' },
        { value: 'Scrum', label: 'Scrum' },
        { value: 'RAG', label: 'RAG' },
        { value: 'Langchain', label: 'Langchain' },
        { value: 'LLMs', label: 'LLMs' },
        { value: 'Others', label: 'Others' },

    ];

    const { currentUser, isDeveloper, isProjectManager } = useAuth();
    const [userData, setUserData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        github: '',
        linkedin: '',
        techStack: '',
        //profilePhoto: null,
    });
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate(); // Initialize useNavigate hook

    // Function to fetch user data from the backend
    const fetchUserData = async () => {
        try {
            const response = await axios.get(`https://freelancenest-backend.onrender.com/freelancer/developers/${currentUser.email}`);
            setUserData(response.data);
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    };

    // Function to fetch projects data from the backend based on user role
    const fetchProjects = async () => {
        try {
            let response;
            if (isDeveloper) {
                console.log(currentUser.email);
                console.log(isDeveloper);
                response = await axios.get(`https://freelancenest-backend.onrender.com/projects/assigned/${currentUser.email}`);
            } else if (isProjectManager) {
                console.log(currentUser.email);
                console.log(isProjectManager);
                response = await axios.get(`https://freelancenest-backend.onrender.com/projects/created/${currentUser.email}`);
            }
            setProjects(response.data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching projects:', error);
            setLoading(false);
        }
    };

    // Function to save changes to the backend
    const saveChanges = async () => {
        try {
            // Assuming you have an endpoint to update user data
            await axios.post(`https://freelancenest-backend.onrender.com/freelancer/developers/${currentUser.email}`, 
                {
                    firstName: userData.firstName,
                    lastName: userData.lastName,
                    github: userData.github,
                    linkedin: userData.linkedin,
                    techStack: userData.techStack,
                }
            );
            console.log('User data updated successfully');
        } catch (error) {
            console.error('Error updating user data: ', error);
        }
    };

    // Function to handle profile photo selection
    const handleProfilePhotoChange = (e) => {
        const file = e.target.files[0];
        setUserData({ ...userData, profilePhoto: file });
    };

    // Function to handle form input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserData({ ...userData, [name]: value });
    };

    // Function to handle tech stack selection
    // const handleTechStackChange = (e) => {
    //     const selectedOptions = Array.from(e.target.selectedOptions, (option) => option.value);
    //     setUserData({ ...userData, techStack: selectedOptions });
    // };
    const handleTechStackChange = (selectedOptions) => {
        setUserData({
            ...userData,
            //technologies: selectedOptions.map(option => option.value)
            techStack: selectedOptions.map(option => option.value)
        });
    };

    useEffect(() => {
        if (currentUser) {
            fetchUserData();
            fetchProjects();
        }
    }, [currentUser, isDeveloper, isProjectManager]);

    if (!currentUser) {
        navigate('/login'); // Use navigate instead of useHistory
        return null;
    }

    return (
        <div>
            <div>
                <Navbar />
            </div>
            <div className="container grid my-8 mx-auto mt-10 ">
                {/* Profile form */}
                <form className="mx-auto mb-8 grid grid-cols-2 gap-4 justify-center">
                    <div className="mb-4">
                        <label htmlFor="firstName" className="block text-700">First Name</label>
                        <input type="text" name="firstName" id="firstName" value={userData.firstName} onChange={handleInputChange} className="mt-1 block w-full rounded-md border " />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="lastName" className="block text-700">Last Name</label>
                        <input type="text" name="lastName" id="lastName" value={userData.lastName} onChange={handleInputChange} className="mt-1  w-full rounded-md border" />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-700">Email</label>
                        <input type="email" name="email" id="email" value={userData.email} onChange={handleInputChange} className="mt-1 block w-full rounded-md border" disabled />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="github" className="block text-700">Github</label>
                        <input type="text" name="github" id="github" value={userData.github} onChange={handleInputChange} className="mt-1 block w-full rounded-md border" />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="linkedin" className="block text-700">Linkedin</label>
                        <input type="text" name="linkedin" id="linkedin" value={userData.linkedin} onChange={handleInputChange} className="mt-1 block w-full rounded-md border" />
                    </div>

                    <div className="mb-4">
                        {isDeveloper ? (
                            <div className="mb-4">
                                <label htmlFor="techStack" className="block text-gray-700">Tech Stack</label>
                                <Select className='rounded-md border-gray-300 shadow-sm '
                                    isMulti
                                    name="techStack"
                                    options={techOptions}
                                    value={techOptions.filter(option => userData.techStack.includes(option.value))}
                                    onChange={handleTechStackChange}
                                />
                            </div>
                        ) : (
                            <div className="mb-4 grid grid-cols-2 gap-4">
                                <div className="mb-4">
                                    <label htmlFor="Age" className="block text-700">Age</label>
                                    <input type="number" name="age" id="age" value={userData.age} onChange={handleInputChange} className="mt-1 block w-full rounded-md border" />
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="Experience" className="block text-700">Experience</label>
                                    <input type="text" name="experience" id="experience" value={userData.experience} onChange={handleInputChange} className="mt-1 block w-full rounded-md border" />
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="Designation" className="block text-700">Designation</label>
                                    <input type="text" name="designation" id="designation" value={userData.designation} onChange={handleInputChange} className="mt-1 block w-full rounded-md border" />
                                </div>
                            </div>
                        )}

                    </div>
                    {/* <div className="mb-4">
                        <label htmlFor="profilePhoto" className="block text-700">Profile Photo</label>
                        <input type="file" name="profilePhoto" id="profilePhoto" onChange={handleProfilePhotoChange} className="mt-1 block w-full rounded-md border" />
                    </div> */}
                </form>
                {/* Project section */}
                <h1 className="text-4xl font-semibold  mb-4 text-center my-6">{!isDeveloper ? 'Created Projects' : 'Assigned Projects'}</h1>
                {loading ? (
                    <div className="flex justify-center">
                        <FallingLines
                            color="blue"
                            height={100}
                            width={100}
                        />
                    </div>
                ) : (
                    projects.length === 0 ? (
                        <p className="text-center p-8">No projects found</p>
                    ) : (
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                            {projects.map(project => (
                                <div key={project._id} className="bg-white shadow-md rounded-md p-4">
                                    <h4 className="text-lg font-semibold mb-2">{project.projectName}</h4>
                                    <p className="text-sm text-700 mb-2">{project.description}</p>
                                    <p className="text-sm text-700 mb-2">{project.technologies.join(', ')}</p>
                                    <p className="text-sm text-700 mb-2">{project.level}</p>
                                    <p className="text-sm text-700 mb-2">{project.duration}</p>
                                    <p className="text-sm text-700 mb-2">{project.money}</p>
                                </div>
                            ))}
                        </div>
                    )
                )}
                {/* Save button */}
                <div className="flex justify-center">
                    <button type="button" onClick={saveChanges} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                        Save Changes
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Profile;
