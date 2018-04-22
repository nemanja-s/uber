import React, { Component } from 'react';
import classes from './UserProfile.css';

class UserProfile extends Component {
  state = {
    users: [],
    selectedUser: null
  };

  componentDidMount() {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(response => response.json())
      .then(json => this.setState({users: json}))
      .catch(error => console.log(error))
  }

  render() {
    return (
      <div className={classes.MainDiv}>
        <label><b>Task: </b></label>
        <input type='text' placeholder='TASK FROM REDUX' />
        <button>Change</button>
        <p>Asigned to: </p>
        <select
          ref={select => this.user = select}
          onChange={() => this.setState({selectedUser: Number(this.user.value)})}>
          <option value='' disabled selected>-- select user --</option>
          {this.state.users.map(user => (
            <option
              value={user.id}
              key={user.id}>{user.name}</option>
          ))}
        </select>
        <button onClick={() => this.props.history.push('/')}>Save</button>
        <button onClick={() => this.props.history.push('/')}>Cancel</button>
        {
          this.state.users.map(user => {
            if (this.state.selectedUser === user.id) {
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

export default UserProfile;