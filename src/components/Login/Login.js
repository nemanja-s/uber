import React, { Component } from 'react';
import { connect } from 'react-redux';

import classes from './Login.css';
import * as actionTypes from '../../store/actions';

class Login extends Component {

  dataChecker = () => {
    if (this.username.value === 'admin' && this.password.value === 'admin') {
      this.props.isAuthenticated();
      this.props.history.push('/');
    }
  };

  render() {
    return (
      <div className={classes.MainDiv}>
        <label>Username</label>
        <input type='text' ref={input => this.username = input} autoFocus/>
        <label>Password</label>
        <input type='password' ref={input => this.password = input} />
        <button onClick={this.dataChecker}>Login</button>
        <p data-tooltip="user: admin, pass: admin">Pssst!</p>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    isAuthenticated: () => dispatch({type: actionTypes.IS_AUTHENTICATED, value: true})
  }
};

export default connect(null, mapDispatchToProps)(Login);