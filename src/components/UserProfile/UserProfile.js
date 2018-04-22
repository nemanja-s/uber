import React, { Component } from 'react';

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
      <div>
        <select
          ref={select => this.user = select}
          onChange={() => this.setState({selectedUser: Number(this.user.value)})}>
          {this.state.users.map(user => (
            <option
              value={user.id}
              key={user.id}>{user.name}</option>
          ))}
        </select>
        {
          this.state.users.map(user => {
            if (this.state.selectedUser === user.id) {
              return (
                <div>
                  <p><b>More details about user:</b></p>
                  <p><b>Full Name: {user.name}</b></p>
                  <p><b>Username:</b> {user.username}</p>
                  <p><b>Email:</b> {user.email}</p>
                  <p><b>Address:</b> {user.address.street}, {user.address.suite}, {user.address.city}</p>
                  <p><b>Phone:</b> {user.phone}</p>
                  <p><b>Website:</b> {user.website}</p>
                  <p><b>Company Name:</b> {user.company.name}</p>
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