import React from 'react';

const Landing = (props) => {
  return (
    <div className="landing-container">
      <h1>Welcome to EasyFeeds</h1>
      <p>An easy way to aggregate stories from across the web.</p>
      <button onClick={e => props.history.push("/signup")}>Get Started</button>
      <div className="landing-image-container">
      </div>
    </div>
  );
};

export default Landing;
