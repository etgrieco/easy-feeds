import React from 'react';

const StoriesContainer = () => {

  const lis = [];
  for (var i = 0; i < 1000; i++) {
    lis.push(<li>Content</li>);
  }

  return <div className="stories-container">

  </div>;
};

export default StoriesContainer;
