import React from 'react';
import SubscriptionStoriesContainer from './subscription_stories_container';
import PopOut from '../pop_out';

export default props => {

  const newProps = {
    component: SubscriptionStoriesContainer,
    isOpen: true,
    closePopOut: () => props.history.goBack(),
  };

  return <PopOut {...props} {...newProps}/>;
};
