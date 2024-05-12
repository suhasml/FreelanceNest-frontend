import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../Navbar';
import { useAuth } from '../../contexts/authContext';

const DevHome = () => {
    const [projects, setProjects] = useState([]);
    const [error, setError] = useState(null);
    const [selectedProject, setSelectedProject] = useState(null);
    const [githubRepo, setGithubRepo] = useState('');
    const [youtubeLink, setYoutubeLink] = useState('');
    const [submissionSuccess, setSubmissionSuccess] = useState(false); // State to track submission success
    const [showSubmissionForm, setShowSubmissionForm] = useState(false); // State to track whether to show submission form
    const { currentUser } = useAuth();

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const response = await axios.get(`https://freelancenest-backend.onrender.com/PM/allprojects`);
                setProjects(response.data);
            } catch (error) {
                console.error('Error fetching projects:', error);
                setError(error.message);
            }
        };

        fetchProjects();
    }, []);

    // Function to handle card click and set selected project
    const handleCardClick = (project) => {
        setSelectedProject(project);
    };

    // Function to close the modal
    const closeModal = () => {
        setSelectedProject(null);
        setSubmissionSuccess(false); // Reset submission success state
    };

    const handleApply = async () => {
        try {
            if (selectedProject) {
                const email = currentUser.email;
                await axios.post(`https://freelancenest-backend.onrender.com/freelancer/projects/${selectedProject._id}/add-email`, { email });
                console.log('Email added to project:', selectedProject._id);
                setShowSubmissionForm(true); // Show submission form after successful registration
            }
        } catch (error) {
            console.error('Error adding email to project:', error);
        }
    };

    const handleSubmit = async (event) => {
        try {
            event.preventDefault();
            if (selectedProject && githubRepo && youtubeLink) {
                const email = currentUser.email;
                const projectId = selectedProject._id;
                const problemStatement = selectedProject.question;

                console.log('Submitting project:', projectId, email, githubRepo, youtubeLink);

                // Send a POST request to the GitHub analyzer API with project submission data
                const githubResponse = await axios.post('https://github-analyser-1.onrender.com/generate_questions', {
                    problem_statement: problemStatement,
                    github_url: githubRepo
                });

                // Extract grade and justification from the GitHub analyzer API response
                const { grade, justification } = githubResponse.data.response;

                // Send a POST request to the server with the project submission data
                await axios.post(`https://freelancenest-backend.onrender.com/freelancer/projects/${projectId}/submit`, {
                    developerEmail: email,
                    githubLink: githubRepo,
                    youtubeLink: youtubeLink
                });

                console.log('Submission successful!');
                const feedback = { grade, justification };
                await axios.put(`https://freelancenest-backend.onrender.com/PM/projects/${projectId}/feedback/${email}`, feedback);

                // setSubmissionSuccess(true); // Update submission success state

                // Add any further action after successful submission, such as closing the modal
                // closeModal();
            } else {
                console.error('Please fill out all fields.');
            }
        } catch (error) {
            console.error('Error submitting project:', error);
        }
    };

    return (
        <div>
            <div>
                <Navbar />
            </div>
            <div className="container mx-auto p-4">
                <h1 className='bg-blue py-3 px-4 mx-3 text-center'>Explore Projects</h1>
                {error && <div className="error-message">{error}</div>}
                <div className="grid grid-cols-3 gap-4">
                    {projects.map(project => (
                        <div
                            key={project._id}
                            className={`bg-white shadow-md p-4`}
                        >
                            <div onClick={() => handleCardClick(project)}>
                                <h2 className="text-xl font-semibold">{project.projectName}</h2>
                                <p className="text-600">Description: {project.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
                {/* Modal for displaying project details */}
                {selectedProject && (
                    <div className="fixed z-10 inset-0 overflow-y-auto">
                        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                                <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                            </div>
                            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
                            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                    <div className="sm:flex sm:items-start">
                                        <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                            <h3 className="text-lg font-medium text-gray-900"><span className='font-bold text-2xl'>{selectedProject.projectName}</span></h3>
                                            <div className="mt-2">
                                                <p className="text-sm text-500"><span className='font-bold'>Description:</span>: {selectedProject.description}</p>
                                                <p className="text-sm text-500"><span className='font-bold'>Skills Required:</span> {selectedProject.technologies.join(', ')}</p>
                                                <p className="text-sm text-500"><span className='font-bold'>Budget:</span> ${selectedProject.money}</p>
                                                <p className="text-sm text-500"><span className='font-bold'>Duration:</span>: {selectedProject.duration} Hrs</p>
                                                <p className="text-md text-500 "><span className='font-bold'>Assessment Question:</span> {selectedProject.question}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Conditionally render submission form or grades */}
                                {showSubmissionForm && !submissionSuccess && (
                                    <div className="mt-8">
                                        <h2 className="text-xl text-center font-semibold">Submit Your Work</h2>
                                        <form onSubmit={handleSubmit} className="mt-4">
                                            <div className="mb-4 text-center">
                                                <label htmlFor="githubRepo" className="block text-gray-700 text-sm font-bold mb-2">GitHub Repository:</label>
                                                <input type="text" id="githubRepo" value={githubRepo} onChange={(e) => setGithubRepo(e.target.value)} className="shadow appearance-none border rounded w-3/4 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                                            </div>
                                            <div className="mb-4 text-center">
                                                <label htmlFor="youtubeLink" className="block text-gray-700 text-sm font-bold mb-2">YouTube Video Link:</label>
                                                <input type="text" id="youtubeLink" value={youtubeLink} onChange={(e) => setYoutubeLink(e.target.value)} className="shadow appearance-none border rounded w-3/4 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                                            </div>
                                            <div className='text-center mb-4'>
                                                <button type="submit" className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Submit</button>
                                            </div>
                                        </form>
                                    </div>
                                )}

                                {submissionSuccess && (
                                    <div className="mt-8">
                                        <h2 className="text-xl text-center font-semibold">Grades</h2>
                                        <div className="mt-4">
                                            <p><span className="font-bold">Grade:</span> {grade}</p>
                                            <p><span className="font-bold">Justification:</span> {justification}</p>
                                        </div>
                                    </div>
                                )}

                                <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                                    <button onClick={handleApply} type="button" className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm">
                                        Apply
                                    </button>
                                    <button onClick={closeModal} type="button" className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm">
                                        Close
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default DevHome;
