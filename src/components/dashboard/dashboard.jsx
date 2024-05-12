import React, { useState } from 'react'
import { useAuth } from '../../contexts/authContext'
import Select from 'react-select'
import axios from 'axios';
import { useEffect } from 'react';
import Navbar from '../Navbar'
import { FallingLines } from 'react-loader-spinner';

const Dashboard = () => {
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
    const [feedback, setFeedback] = useState([]);

    const fetchFeedback = async () => {
    try {
        const response = await axios.get(`https://freelancenest-backend.onrender.com/PM/projects/${selectedProject._id}/feedback`);
        setFeedback(response.data);
    } catch (error) {
        console.error('Error fetching feedback:', error);
    }
    };

    const { currentUser, userLoggedIn } = useAuth();
    console.log('IsLoggedIn:', userLoggedIn);
    const [showModal, setShowModal] = useState(false);
    const [formData, setFormData] = useState({
        projectName: '',
        problemStatement: '',
        description: '',
        technologies: '',
        level: '',
        duration: '',
        money: ''
    });

    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedProject, setSelectedProject] = useState(null);
    const [generatedQuestions, setGeneratedQuestions] = useState([]);
    const [questionModalOpen, setQuestionModalOpen] = useState(false);
    const [selectedQuestion, setSelectedQuestion] = useState(null);

    useEffect(() => {
        fetchProjects();
        if (selectedProject) {
            fetchFeedback();
        }
    }, [selectedProject]);

    const fetchProjects = async () => {
        try {
            const response = await axios.get(`https://freelancenest-backend.onrender.com/PM/projects/${currentUser.email}`);
            setProjects(response.data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching projects:', error);
            setLoading(false);
        }
    };

    const addProjectToDB = async (projectData) => {
        try {
            const response = await axios.post('https://freelancenest-backend.onrender.com/PM/projects', projectData);
            fetchProjects();
        } catch (error) {
            console.error('Error adding project:', error);
        }
    };

    const handleAddProject = () => {
        setShowModal(true);
    };
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleTechChange = (selectedOptions) => {
        setFormData({
            ...formData,
            technologies: selectedOptions.map(option => option.value)
        });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Form Data:', formData);
        setShowModal(false);
        formData.userEmail = currentUser.email;
        await addProjectToDB(formData);
        // Reset form data
        setFormData({
            projectName: '',
            problemStatement: '',
            description: '',
            technologies: '',
            level: '',
            duration: '',
            money: ''
        });
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const handleProjectClick = (project) => {
        setSelectedProject(project);
    };

    const handleCloseProjectDetails = () => {
        setSelectedProject(null);
    };

    const generateQuestions = async () => {
        try {
            // console.log('Selected Project:', selectedProject);
            const response = await axios.post('https://generate-questions.vercel.app/generate-problems', {
                "projectName": selectedProject.projectName,
                "problemStatement": selectedProject.problemStatement,
                "description": selectedProject.description,
                "technologies": selectedProject.technologies,
                "level": selectedProject.level,
                "duration": selectedProject.duration,
                "money": selectedProject.money
            });
            if (response.status === 200) {
                const questions = response.data.response[0];
                // console.log('Generated Questions:', questions);
                setGeneratedQuestions(questions);
                setQuestionModalOpen(true);
            } else {
                console.error('Error generating questions: Unexpected status code', response.status);
            }
        } catch (error) {
            console.error('Error generating questions:', error);
        }
    };



    useEffect(() => {
        // Check if the selected project doesn't have a question
        if (selectedProject && !selectedProject.question) {
            generateQuestions();
        }
    }, [selectedProject]);

    const handleQuestionSelection = async () => {
        try {
            const updatedProject = {
                ...selectedProject,
                question: selectedQuestion
            };
            await axios.put(`https://freelancenest-backend.onrender.com/PM/projects/${selectedProject._id}`, updatedProject);
            setQuestionModalOpen(false);
            fetchProjects();
        } catch (error) {
            console.error('Error updating project:', error);
        }
    };

    // const getQuestionForProject = async () => {
    //     try {
    //         // Make a GET request to the backend API to fetch the question for the project
    //         const response = await axios.get(`https://freelancenest-backend.onrender.com/PM/projects/questions/${selectedProject._id}`);

    //         if (response.status === 200) {
    //             return response.data.question; // Return the question if it exists
    //         } else {
    //             console.error('Error fetching question:', response.status);
    //             return null; // Return null if there's an error or if the project doesn't have a question
    //         }
    //     } catch (error) {
    //         console.error('Error fetching question:', error);
    //         return null; // Return null if there's an error
    //     }
    // };


    return (
        <div>
            <div>
                <Navbar />
            </div>
            <div className='text-2xl font-bold pt-14 mx-8'>
                Welcome {currentUser.displayName ? currentUser.displayName : currentUser.email}, View & upload your Projects
            </div>
            <div className='text-2xl font-bold mx-8'>
                <button
                    onClick={handleAddProject}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
                >
                    Create Project
                </button>
            </div>
            {/* handle Add Projects */}
            <div className='mt-4'>
                {showModal && (
                    <div className="fixed inset-0 items-center justify-center bg-black bg-opacity-50 p-20">
                        <div className="bg-white p-6 rounded-lg shadow-xl max-h-full overflow-y-auto">
                            <h2 className="text-lg font-bold mb-4">Add New Project</h2>
                            <form onSubmit={handleSubmit}>
                                <div className="mb-4">
                                    <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">Project Name</label>
                                    <input type="text" id="projectName" name="projectName" value={formData.projectName} onChange={handleChange} className="mt-1 p-2 border border-gray-300 rounded-md w-full text-sm" required />
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="problemStatement" className="block text-sm font-medium text-gray-700">Problem Statement</label>
                                    <textarea id="problemStatement" name="problemStatement" value={formData.problemStatement} onChange={handleChange} rows="4" className="mt-1 p-2 border border-gray-300 rounded-md w-full text-sm" required></textarea>
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="description" className="block text-sm font-medium text-gray-700">Project Description</label>
                                    <textarea id="description" name="description" value={formData.description} onChange={handleChange} rows="4" className="mt-1 p-2 border border-gray-300 rounded-md w-full text-sm" required></textarea>
                                </div>
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700" htmlFor='technologies'>Technologies</label>
                                    <Select
                                        isMulti
                                        options={techOptions}
                                        value={techOptions.filter(option => formData.technologies.includes(option.value))}
                                        onChange={handleTechChange}
                                        className="basic-multi-select"
                                        classNamePrefix="select"
                                        name='technologies'
                                        id='technologies'
                                    />
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="level" className="block text-sm font-medium text-gray-700">Level of Project</label>
                                    <select id="level" name="level" value={formData.level} onChange={handleChange} className="mt-1 p-2 border border-gray-300 rounded-md w-full text-sm" required>
                                        <option value="">Select Level</option>
                                        <option value="beginner">Beginner</option>
                                        <option value="intermediate">Intermediate</option>
                                        <option value="advanced">Advanced</option>
                                    </select>
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="duration" className="block text-sm font-medium text-gray-700">Time required to complete</label>
                                    <input type="text" id="duration" name="duration" value={formData.duration} onChange={handleChange} className="mt-1 p-2 border border-gray-300 rounded-md w-full text-sm" required />
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="money" className="block text-sm font-medium text-gray-700">Budget</label>
                                    <input type="text" id="money" name="money" value={formData.money} onChange={handleChange} className="mt-1 p-2 border border-gray-300 rounded-md w-full text-sm" required />
                                </div>
                                <div className="flex flex-col items-center  sm:flex-row sm:justify-center sm:space-x-4">
                                    <div className="p-2 mx-1 sm:mx-0.5">
                                        <button type="submit" className="bg-gradient-to-r from-blue-800 hover:bg-blue-500 text-white font-bold py-2 px-3 rounded" onClick={handleSubmit}>
                                            Submit
                                        </button>
                                    </div>
                                    <div className="p-2 mx-1 sm:mx-0.5">
                                        <button type="button" onClick={handleCloseModal} className="bg-gradient-to-r from-red-800 hover:bg-red-500 text-white font-bold py-2 px-3 rounded">
                                            Cancel
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </div>
            <hr className='my-5' />
            <div className='bg-gray-100 p-6 rounded-lg shadow-md mx-8'>
                <h2 className="text-lg font-semibold text-center mb-4">Ongoing Projects</h2>
                {loading ? (
                    <div className="flex justify-center items-center h-96">
                        <FallingLines
                            height={100}
                            width={100}
                            color="blue"
                        />
                    </div>

                ) : (
                    projects.length === 0 ? (
                        <p className="text-center text-black text-lg">No projects found</p>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                            {projects.map((project, index) => (
                                <div key={index} className="bg-white rounded-lg shadow-md p-4 cursor-pointer" onClick={() => handleProjectClick(project)}>
                                    <h3 className="text-lg font-semibold mb-2">{project.projectName}</h3>
                                    <p className="text-gray-600">{project.description}</p>
                                </div>
                            ))}
                        </div>
                    )
                )}
            </div>

            {/* {selectedProject && (
                <div className="fixed inset-0 items-center justify-center bg-black bg-opacity-50 p-20">
                    <div className="bg-white p-6 rounded-lg shadow-xl max-h-full overflow-y-auto">
                        <h2 className="text-lg font-bold mb-4">Project Details</h2>
                        <p><strong>Project Name:</strong> {selectedProject.projectName}</p>
                        <p><strong>Problem Statement:</strong> {selectedProject.problemStatement}</p>
                        <p><strong>Description:</strong> {selectedProject.description}</p>
                        <p><strong>Technologies:</strong> {selectedProject.technologies.join(', ')}</p>
                        <p><strong>Level:</strong> {selectedProject.level}</p>
                        <p><strong>Duration:</strong> {selectedProject.duration} hrs</p>
                        <p><strong>Budget:</strong> ${selectedProject.money}</p>
                        {selectedProject.question === null ? (
                                    
                                    <button
                                        onClick={generateQuestions}
                                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                    >
                                        Choose a Problem Statement
                                    </button>
                                    
                                ) : (
                                    <p><strong>Question:</strong> {selectedProject.question}</p>
                                )}
                        <div className="flex justify-end mt-4">
                            <div className="p-2 mx-1">
                                <button
                                    onClick={handleCloseProjectDetails}
                                    className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
                                >
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )} */}
            {selectedProject && (
  <div className="fixed inset-0 items-center justify-center bg-black bg-opacity-50 p-20">
    <div className="bg-white p-6 rounded-lg shadow-xl max-h-full overflow-y-auto">
      <h2 className="text-lg font-bold mb-4">Project Details</h2>
      <p><strong>Project Name:</strong> {selectedProject.projectName}</p>
      <p><strong>Problem Statement:</strong> {selectedProject.problemStatement}</p>
      <p><strong>Description:</strong> {selectedProject.description}</p>
      <p><strong>Technologies:</strong> {selectedProject.technologies.join(', ')}</p>
      <p><strong>Level:</strong> {selectedProject.level}</p>
      <p><strong>Duration:</strong> {selectedProject.duration} hrs</p>
      <p><strong>Budget:</strong> ${selectedProject.money}</p>
      {selectedProject.question === null ? (
        <button
          onClick={generateQuestions}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Choose a Problem Statement
        </button>
      ) : (
        <p><strong>Question:</strong> {selectedProject.question}</p>
      )}

      {/* Display Feedback */}
      <div>
        <h3 className="text-lg font-bold mt-4 mb-2">Feedback</h3>
        {feedback.map((item, index) => (
          <div key={index} className="border p-3 my-2">
            <p>User: {item.userId}</p>
            <p>Grade: {item.grade}</p>
            <p>Justification: {item.justification}</p>
          </div>
        ))}
      </div>

      <div className="flex justify-end mt-4">
        <div className="p-2 mx-1">
          <button
            onClick={handleCloseProjectDetails}
            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  </div>
)}


            <div className='mt-4'>
                {showModal && (
                    <div className="fixed inset-0 items-center justify-center bg-black bg-opacity-50 p-20">
                        <div className="bg-white p-6 rounded-lg shadow-xl max-h-full overflow-y-auto">
                            <h2 className="text-lg font-bold mb-4">Add New Project</h2>
                            <form onSubmit={handleSubmit}>
                                <div className="mb-4">
                                    <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">Project Name</label>
                                    <input type="text" id="projectName" name="projectName" value={formData.projectName} onChange={handleChange} className="mt-1 p-2 border border-gray-300 rounded-md w-full text-sm" required />
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="problemStatement" className="block text-sm font-medium text-gray-700">Problem Statement</label>
                                    <textarea id="problemStatement" name="problemStatement" value={formData.problemStatement} onChange={handleChange} rows="4" className="mt-1 p-2 border border-gray-300 rounded-md w-full text-sm" required></textarea>
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="description" className="block text-sm font-medium text-gray-700">Project Description</label>
                                    <textarea id="description" name="description" value={formData.description} onChange={handleChange} rows="4" className="mt-1 p-2 border border-gray-300 rounded-md w-full text-sm" required></textarea>
                                </div>
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700" htmlFor='technologies'>Technologies</label>
                                    <Select
                                        isMulti
                                        options={techOptions}
                                        value={techOptions.filter(option => formData.technologies.includes(option.value))}
                                        onChange={handleTechChange}
                                        className="basic-multi-select"
                                        classNamePrefix="select"
                                        name='technologies'
                                        id='technologies'
                                    />
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="level" className="block text-sm font-medium text-gray-700">Level of Project</label>
                                    <select id="level" name="level" value={formData.level} onChange={handleChange} className="mt-1 p-2 border border-gray-300 rounded-md w-full text-sm" required>
                                        <option value="">Select Level</option>
                                        <option value="beginner">Beginner</option>
                                        <option value="intermediate">Intermediate</option>
                                        <option value="advanced">Advanced</option>
                                    </select>
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="duration" className="block text-sm font-medium text-gray-700">Time required to complete</label>
                                    <input type="text" id="duration" name="duration" value={formData.duration} onChange={handleChange} className="mt-1 p-2 border border-gray-300 rounded-md w-full text-sm" required />
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="money" className="block text-sm font-medium text-gray-700">Budget</label>
                                    <input type="text" id="money" name="money" value={formData.money} onChange={handleChange} className="mt-1 p-2 border border-gray-300 rounded-md w-full text-sm" required />
                                </div>
                                <div className="flex flex-col items-center  sm:flex-row sm:justify-center sm:space-x-4">
                                    <div className="p-2 mx-1 sm:mx-0.5">
                                        <button type="submit" className="bg-gradient-to-r from-blue-800 hover:bg-blue-500 text-white font-bold py-2 px-3 rounded" onClick={handleSubmit}>
                                            Submit
                                        </button>
                                    </div>
                                    <div className="p-2 mx-1 sm:mx-0.5">
                                        <button type="button" onClick={handleCloseModal} className="bg-gradient-to-r from-red-800 hover:bg-red-500 text-white font-bold py-2 px-3 rounded">
                                            Cancel
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
                {/* Question modal */}
                {questionModalOpen && (
                    <div className="fixed inset-0 items-center justify-center bg-black bg-opacity-50 p-20">
                        <div className="bg-white p-6 rounded-lg shadow-xl max-h-full overflow-y-auto">
                            <h2 className="text-lg font-bold mb-4">Select a Problem Statement</h2>
                            <div className="space-y-4">
                                {Object.keys(generatedQuestions).map((questionKey, index) => (
                                    <div key={index} className="flex items-center space-x-2">
                                        <input
                                            type="radio"
                                            id={`question-${index}`}
                                            name="selectedQuestion"
                                            value={generatedQuestions[questionKey]}
                                            onChange={() => setSelectedQuestion(generatedQuestions[questionKey])}
                                            className="form-radio h-4 w-4 text-blue-500"
                                        />
                                        <label htmlFor={`question-${index}`} className="ml-2">{generatedQuestions[questionKey]}</label>
                                    </div>
                                ))}

                                <div className="flex justify-end mt-4">
                                    <button
                                        onClick={handleQuestionSelection}
                                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                    >
                                        Make this the Problem Statement
                                    </button>
                                    <button
                                        onClick={() => setQuestionModalOpen(false)}
                                        className="ml-4 bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
            <hr className='my-6' />
        </div>
    );
};

export default Dashboard;