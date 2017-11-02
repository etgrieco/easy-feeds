import React from 'react';
import StoriesShow from './story_show';
import PopOut from '../pop_out';

export default props => {

  const newProps = {
    component: StoriesShow,
    isOpen: true,
    closePopOut: () => props.history.goBack(),
  };

  return <PopOut {...props} {...newProps}/>;
};
