import React from 'react';
import StoriesContainer from './stories_container';
import PopOut from '../pop_out';

export default props => (
  <PopOut {...props} closePath={"/i/discover/"}>
    <StoriesContainer />
  </PopOut>
);
