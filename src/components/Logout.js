import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth, signOut } from 'firebase/auth';

function LogoutPage() {
    const navigate = useNavigate();
    // Initialize Firebase auth object
    const auth = getAuth();

    // useEffect hook runs on component mount to handle the logout process
    useEffect(() => {
        // Perform the logout operation immediately when the component mounts
        signOut(auth).then(() => {
            // Log successful logout
            console.log("Logged out successfully");
            // Optionally redirect to the homepage or another route after logout
            // navigate('/'); Uncomment this to enable redirection post-logout
        }).catch((error) => {
            // Log any errors that occur during the logout process
            console.error("Error logging out:", error);
        });
    }, [auth, navigate]);  // Dependencies ensure the effect runs correctly with the latest instances

    // Handler for navigating to the sign-in page
    const handleSignIn = () => {
        navigate('/signin');
    };

    // Handler for navigating to the sign-up page
    const handleSignUp = () => {
        navigate('/signup');
    };

    return (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <h1>You have been logged out</h1>
            <button onClick={handleSignIn} style={{ margin: '10px', padding: '10px' }}>
                Sign In
            </button>
            <button onClick={handleSignUp} style={{ margin: '10px', padding: '10px' }}>
                Sign Up
            </button>
        </div>
    );
}

export default LogoutPage;
