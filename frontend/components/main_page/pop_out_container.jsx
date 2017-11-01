import React from 'react';
import { connect } from 'react-redux';
import { closePopOut } from '../../actions/popout_actions';
import PopOut from './pop_out';

const PopOutContainer = connect(
  ({ ui: { component } }) =>
    ({ component: component, isOpen: Boolean(component) }),
  dispatch =>
    ({ closePopOut: () => dispatch(closePopOut()) })
)(PopOut);

export default PopOutContainer;
