import React, { useContext, useState, useEffect, createContext } from 'react';
import { auth } from '../firebase-config';
import { onAuthStateChanged } from 'firebase/auth';

// Create a context for authentication state with default values
const AuthContext = createContext({
    currentUser: null, // The current user object, null when no user is logged in
    loading: true, // Indicates whether the authentication status is being determined
    setUser: () => {}  // Function to manually set the current user, useful for testing or customized behavior
});

// Custom hook to use the auth context
export function useAuth() {
    return useContext(AuthContext);
}

// Provider component that manages and provides the authentication state to its children
export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState(null); // State to hold the current user
    const [loading, setLoading] = useState(true); // State to manage loading status of auth operations

    // Effect hook to subscribe to Firebase auth state changes
    useEffect(() => {
        // Subscribe to auth state changes and manage user state and loading state
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setCurrentUser(user); // Update state with the current user
            setLoading(false); // Set loading to false once the user is determined
            console.log("Auth state changed:", user);  // Log user state for debugging
        }, error => {
            // Log errors if there is an issue subscribing to auth changes
            console.error("Error listening to auth changes:", error);
        });

        // Cleanup function to unsubscribe from the auth listener when the component unmounts
        return () => {
            console.log("Cleaning up auth listener");  // Debugging log
            unsubscribe();
        };
    }, []); // Empty dependency array ensures this effect runs only once after initial render

    // Function to manually set the current user, exposing it for easy access and manipulation
    const setUser = user => {
        setCurrentUser(user);
    };

    // Provide the current user and loading state to the component tree
    return (
        <AuthContext.Provider value={{ currentUser, loading, setUser }}>
            {!loading && children} {/* Render children only when not loading to avoid flash of unauthorized content */}
        </AuthContext.Provider>
    );
}
