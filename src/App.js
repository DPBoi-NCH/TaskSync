import React from 'react';
import { Routes, Route, Navigate} from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import HomePage from './components/HomePage';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import Logout from './components/Logout';
import CreateChecklist from './components/CreateChecklist';
import SharedChecklist from './components/SharedChecklist';

function App() {
  // Retrieve the current user and loading status from the authentication context
  const { currentUser, loading } = useAuth();

  // Display a loading indicator while the authentication status is being determined
  if (loading) {
    return <div>Loading...</div>; 
  }
  
  return (
    <div>
      <Routes>
          {/* Route configurations ensuring protected routes and proper redirections based on authentication status */}
          {/* Home Page: Redirect to sign-in if no user is authenticated */}
          <Route path="/" element={currentUser ? <HomePage /> : <Navigate to="/signin" />} />

          {/* Sign Up Page: Redirect to Home if the user is already signed in */}
          <Route path="/signup" element={!currentUser ? <SignUp /> : <Navigate to="/" />} />

          {/* Logout Page: Always accessible, handles user sign-out */}
          <Route path="/logout" element={<Logout />} />

          {/* Sign In Page: Redirect to Home if the user is already signed in */}
          <Route path="/signin" element={!currentUser ? <SignIn /> : <Navigate to="/" />} />

          {/* Create Checklist: Only accessible if the user is authenticated */}
          <Route path="/create-checklist" element={currentUser ? <CreateChecklist /> : <Navigate to="/signin" />} />

          {/* Shared Checklist: Only accessible if the user is authenticated */}
          <Route path="/shared-checklist/:checklistId" element={currentUser ? <SharedChecklist /> : <Navigate to="/signin" />} />
      </Routes>
    </div>
  );
}

export default App;
