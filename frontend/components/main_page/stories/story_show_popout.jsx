import React from 'react';
import StoriesShow from './stories_show';
import PopOut from '../pop_out';

export default props => {

  const newProps = {
    component: StoriesShow,
    isOpen: true,
    closePopOut: () => props.history.push("/i/latest/"),
  };

  return <PopOut {...props} {...newProps}/>;
};
