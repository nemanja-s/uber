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

  saveTaskHandler = () => {
    const selectedUser = this.props.users[this.props.selectedUserId - 1].name;
    const allTasks = [...this.props.tasks];
    const selectedTask = allTasks.find(task =>
      task.id === Number(this.props.selectedTaskId));
    selectedTask.assigned = selectedUser;
    this.props.setTasks(allTasks);
    this.props.selectUser(null);
    this.props.history.push('/')
  };

  cancelTaskHandler = () => {
    this.props.selectUser(null);
    this.props.history.push('/')
  };

  changeTaskHandler = () => {
    if (this.title.value !== '') {
      const allTasks = [...this.props.tasks];
      const selectedTask = allTasks.find(task =>
        task.id === Number(this.props.selectedTaskId));
      selectedTask.title = this.title.value;
      this.props.setTasks(allTasks);
      this.title.value = '';
    }
  };

  render() {
    const taskTitle = this.props.tasks.find(task =>
      task.id === Number(this.props.selectedTaskId)).title;
    return (
      <div className={classes.MainDiv}>
        <label><b>Task: </b></label>
        <input type='text' placeholder={taskTitle} ref={input => this.title = input}/>
        <button onClick={this.changeTaskHandler}>Change</button>
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
        <button onClick={this.saveTaskHandler}>Save</button>
        <button onClick={this.cancelTaskHandler}>Cancel</button>
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
    selectedUserId: state.selectedUserId,
    tasks: state.tasks
  }
};

const mapDispatchToProps = dispatch => {
  return {
    setUsers: (users) => dispatch({type: actionTypes.SET_USERS, value: users}),
    selectUser: (userId) => dispatch({type: actionTypes.SELECT_USER_ID, value: userId}),
    setTasks: (tasks) => dispatch({type: actionTypes.SET_TASKS, value: tasks})
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(EditTask);