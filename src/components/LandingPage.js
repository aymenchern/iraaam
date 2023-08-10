// src/components/LandingPage.js
import React, { useState, useEffect } from 'react';
import './LandingPage.css';
import logo from '../assets/logo.png';
import { auth } from '../firebaseConfig'; // Make sure to provide the correct path to your firebaseConfig.js file

const LandingPage = ({ togglePage }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        // Simulate a loading delay
        const loadingTimeout = setTimeout(() => {
            setIsLoading(false);
        }, 5000); // Adjust the duration as needed

        // Clean up the timeout to avoid memory leaks
        return () => clearTimeout(loadingTimeout);
    }, []);

    // Function to handle login
    const handleLogin = async () => {
        try {
            // Perform the login using Firebase authentication
            // Replace 'auth' with your Firebase auth instance
            const userCredential = await auth.signInWithEmailAndPassword(email, password);
            console.log('Logged in user:', userCredential.user);

            // Add logic here to navigate to the Tables page upon successful login
            togglePage(); // Assuming togglePage function will handle the navigation to the Tables page
        } catch (error) {
            console.error('Error logging in:', error);
        }
    };

    return (
        <div className="landing-page">
            <div className="logo-container">
                <img src={logo} alt="Your Logo" className="logo" />
            </div>
            {isLoading ? (
                <div className="loading-animation">Loading...</div>
            ) : (
                <>
                    <div className="welcome-message">Welcome to Iram App!</div>
                    <div className="login-form">
                        <input
                            type="text"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <button onClick={handleLogin}>Login</button>
                    </div>
                </>
            )}
        </div>
    );
};

export default LandingPage;
