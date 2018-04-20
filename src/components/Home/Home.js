import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux'

const home = (props) => (
  <div>
    {
      props.isAuthenticated ?
      <p>You are admin</p> :
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