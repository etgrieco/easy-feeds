import React from 'react';
import SubscriptionStoriesContainer from './subscription_stories_container';
import PopOut from '../pop_out';

export default props => {

  const newProps = {
    component: SubscriptionStoriesContainer,
    isOpen: true,
    closePopOut: () => props.history.push("/i/discover")
  };

  debugger

  return <PopOut {...props} {...newProps}/>;
};
