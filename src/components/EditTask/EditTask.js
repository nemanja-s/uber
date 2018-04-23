import React, { Component } from 'react';
import { connect } from 'react-redux';

import classes from './EditTask.css';
import * as actionTypes from '../../store/actions';


class EditTask extends Component {
  componentDidMount() {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(response => response.json())
      .then(json => this.props.setUsers(json))
      .catch(error => console.log(error))
  }

  saveButtonHandler = () => {
    console.log('User ID: ' + this.props.selectedUserId, 'Task ID: ' + this.props.selectedTaskId)
  };

  cancelButtonHandler = () => {
    this.props.history.push('/')
  };

  render() {
    return (
      <div className={classes.MainDiv}>
        <label><b>Task: </b></label>
        <input type='text' placeholder='TASK FROM REDUX' />
        <button>Change</button>
        <p>Asigned to: </p>
        <select
          ref={select => this.user = select}
          onChange={() => this.props.selectUser(Number(this.user.value))}>
          <option value=''>-- None --</option>
          {this.props.users.map(user => (
            <option
              value={user.id}
              key={user.id}>{user.name}</option>
          ))}
        </select>
        <button onClick={this.saveButtonHandler}>Save</button>
        <button onClick={this.cancelButtonHandler}>Cancel</button>
        {
          this.props.users.map(user => {
            if (this.props.selectedUserId === user.id) {
              return (
                <div>
                  <p><b>More details about user:</b></p>
                  <p>Full Name: <b>{user.name}</b></p>
                  <p>Username: <b>{user.username}</b></p>
                  <p>Email: <b>{user.email}</b></p>
                  <p>Address: <b>{user.address.street}, {user.address.suite}, {user.address.city}</b></p>
                  <p>Phone: <b>{user.phone}</b></p>
                  <p>Website: <b>{user.website}</b></p>
                  <p>Company Name: <b>{user.company.name}</b></p>
                </div>
              )
            }
            return null;
          })
        }
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    selectedTaskId: state.selectedTaskId,
    users: state.users,
    selectedUserId: state.selectedUserId
  }
};

const mapDispatchToProps = dispatch => {
  return {
    setUsers: (users) => dispatch({type: actionTypes.SET_USERS, value: users}),
    selectUser: (userId) => dispatch({type: actionTypes.SELECT_USER, value: userId})
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(EditTask);