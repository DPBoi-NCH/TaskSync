// Home.js
import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom for navigation

const Home = () => {
  return (
    <div>
      <h1>Welcome to TaskSync</h1>
      <div style={{ float: 'right' }}>
        <Link to="/signin">
          <button>Sign In</button>
        </Link>
        <Link to="/signup">
          <button>Sign Up</button>
        </Link>
      </div>
    </div>
  );
};

export default Home;
