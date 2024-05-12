import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../../contexts/authContext';
import { doCreateUserWithEmailAndPassword, doSignInWithGoogle } from '../../../firebase/auth';
import Navbar from '../../Navbar';

const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isRegistering, setIsRegistering] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const { userLoggedIn, isDeveloper, isProjectManager } = useAuth(); // Access isDeveloper and isProjectManager from the context

    const onSubmit = async (e) => {
        e.preventDefault();
        if (!isRegistering) {
            setIsRegistering(true);
            try {
                // Attempt to create user with provided email and password
                await doCreateUserWithEmailAndPassword(email, password);
                if (isProjectManager) {
                    // Make a request to your backend API to add the project manager to the database
                    const response = await fetch('https://freelancenest-backend.onrender.com/PM/users', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ email, isProjectManager: true }),
                    });
                    if (!response.ok) {
                        throw new Error('Failed to add project manager to the database');
                    }
                }

                if (isDeveloper) {
                    // Make a request to your backend API to add the developer to the database
                    const response = await fetch('https://freelancenest-backend.onrender.com/freelancer/developers', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ email }),
                    });
                    if (!response.ok) {
                        throw new Error('Failed to add developer to the database');
                    }
                }
            } catch (error) {
                // Handle different types of errors
                if (error.code === 'auth/email-already-in-use') {
                    setErrorMessage('Email address is already in use.'); // Update error message for email already in use
                } else if (error.code === 'auth/weak-password') {
                    setErrorMessage('Password is too weak. Please choose a stronger password.'); // Update error message for weak password
                } else {
                    setErrorMessage('An error occurred. Please try again later.'); // Generic error message for other errors
                }
                setIsRegistering(false); // Reset registering state
            }
        }
    };

    const onGoogleSignIn = async (e) => {
        e.preventDefault();
        if (!isRegistering) {
            setIsRegistering(true);
            try {
                const googleUser = await doSignInWithGoogle();
                console.log('Google user:', googleUser);

                // Check if the user signing in with Google is a project manager
                if (isProjectManager) {
                    // Make a request to your backend API to add the project manager to the database
                    const response = await fetch('https://freelancenest-backend.onrender.com/PM/users', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ email: googleUser.email, isProjectManager: true }),
                    });
                    if (!response.ok) {
                        throw new Error('Failed to add project manager to the database');
                    }
                }

                if (isDeveloper) {
                    // Make a request to your backend API to add the developer to the database
                    const response = await fetch('https://freelancenest-backend.onrender.com/freelancer/developers', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ email: googleUser.email }),
                    });
                    if (!response.ok) {
                        throw new Error('Failed to add developer to the database');
                    }
                }

                // Redirect the user
                // redirectUser();
            } catch (error) {
                console.error('Error during Google sign-in:', error);
                setErrorMessage('An error occurred. Please try again later.'); // Generic error message for other errors
            } finally {
                setIsRegistering(false); // Reset registering state
            }
        }
    };


    if (userLoggedIn) {
        // Redirect to appropriate page based on user role
        if (isDeveloper) {
            return <Navigate to="/home" replace={true} />;
        } else if (isProjectManager) {
            return <Navigate to="/dashboard" replace={true} />;
        }
    }

    return (
        <div>
            <div>
                <Navbar />
            </div>
            <main className="w-full h-screen flex self-center place-content-center place-items-center">
                <div className="w-96 text-gray-600 space-y-5 p-4 shadow-xl border rounded-xl">
                    <div className="text-center mb-6">
                        <div className="mt-2">
                            <h3 className="text-gray-800 text-xl font-semibold sm:text-2xl">Create a New Account</h3>
                        </div>
                    </div>
                    <form onSubmit={onSubmit} className="space-y-4">
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg transition duration-300"
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg transition duration-300"
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">Confirm Password</label>
                            <input
                                type="password"
                                id="confirmPassword"
                                name="confirmPassword"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg transition duration-300"
                                required
                            />
                        </div>
                        {errorMessage && (
                            <span className='text-red-600 font-bold'>{errorMessage}</span>
                        )}
                        <button
                            type="submit"
                            className="w-full px-4 py-2 text-white font-medium rounded-lg bg-indigo-600 hover:bg-indigo-700 hover:shadow-xl transition duration-300"
                        >
                            {isRegistering ? 'Registering...' : 'Register'}
                        </button>
                    </form>

                    <button
                        disabled={isRegistering}
                        onClick={(e) => {
                            onGoogleSignIn(e);
                        }}
                        className={`w-full flex items-center justify-center gap-x-3 py-2.5 border rounded-lg text-sm font-medium  ${isRegistering ? 'cursor-not-allowed' : 'hover:bg-gray-100 transition duration-300 active:bg-gray-100'
                            }`}
                    >
                        <svg className="w-5 h-5" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g clipPath="url(#clip0_17_40)">
                                <path
                                    d="M47.532 24.5528C47.532 22.9214 47.3997 21.2811 47.1175 19.6761H24.48V28.9181H37.4434C36.9055 31.8988 35.177 34.5356 32.6461 36.2111V42.2078H40.3801C44.9217 38.0278 47.532 31.8547 47.532 24.5528Z"
                                    fill="#4285F4"
                                />
                                <path
                                    d="M24.48 48.0016C30.9529 48.0016 36.4116 45.8764 40.3888 42.2078L32.6549 36.2111C30.5031 37.675 27.7252 38.5039 24.4888 38.5039C18.2275 38.5039 12.9187 34.2798 11.0139 28.6006H3.03296V34.7825C7.10718 42.8868 15.4056 48.0016 24.48 48.0016Z"
                                    fill="#34A853"
                                />
                                <path
                                    d="M11.0051 28.6006C9.99973 25.6199 9.99973 22.3922 11.0051 19.4115V13.2296H3.03298C-0.371021 20.0112 -0.371021 28.0009 3.03298 34.7825L11.0051 28.6006Z"
                                    fill="#FBBC04"
                                />
                                <path
                                    d="M24.48 9.49932C27.9016 9.44641 31.2086 10.7339 33.6866 13.0973L40.5387 6.24523C36.2 2.17101 30.4414 -0.068932 24.48 0.00161733C15.4055 0.00161733 7.10718 5.11644 3.03296 13.2296L11.005 19.4115C12.901 13.7235 18.2187 9.49932 24.48 9.49932Z"
                                    fill="#EA4335"
                                />
                            </g>
                            <defs>
                                <clipPath id="clip0_17_40">
                                    <rect width="48" height="48" fill="white" />
                                </clipPath>
                            </defs>
                        </svg>
                        {isRegistering ? 'Signing In...' : 'Continue with Google'}
                    </button>

                </div>
            </main>
        </div>
    );
};

export default Register;