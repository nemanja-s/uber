import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux'

import TaskList from '../TaskList/TaskList';


const home = (props) => (
  <div>
    {
      props.isAuthenticated ?
      <TaskList/> :
      <Redirect to='/login' />
    }
  </div>
);

const mapStateToProps = state => {
  return {
    isAuthenticated: state.isAuthenticated
  }
};

export default connect(mapStateToProps)(home);