import React from 'react';
import { useNavigate } from 'react-router-dom';

function LogoutPage() {
    const navigate = useNavigate();

    const handleSignIn = () => {
        navigate('/signin');
    };

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
