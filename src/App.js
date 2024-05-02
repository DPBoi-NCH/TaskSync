import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import Logout from './components/Logout';
import CreateChecklist from './components/CreateChecklist';
import SharedChecklist from './components/SharedChecklist';

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/create-checklist" element={<CreateChecklist />} />
        <Route path="/shared-checklist/:checklistId" element={<SharedChecklist />} />
      </Routes>
    </div>
  );
}

export default App;
