import React from 'react';
import SubscriptionStoriesContainer from './stories_container';
import PopOut from '../pop_out';

export default props => {

  const newProps = {
    component: SubscriptionStoriesContainer,
    isOpen: true,
    closePopOut: () => props.history.push("/i/discover/"),
  };

  return <PopOut {...props} {...newProps}/>;
};
