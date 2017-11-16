import React from 'react';
import { connect } from 'react-redux';
import { closePopOut } from '../../actions/popout_actions';
import PopOut from './pop_out';

const mapStateToProps = ({ ui: { component } }) =>
  ({ component: component, isOpen: Boolean(component) });

const mapDispatchToProps = dispatch =>
  ({ closePopOut: () => dispatch(closePopOut()) });

export default connect(
  mapStateToProps,
  mapDispatchToProps)(PopOut);
