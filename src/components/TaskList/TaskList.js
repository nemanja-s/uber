import React, { Component } from 'react';
import classes from './TaksList.css';

class TaskList extends Component {
  state = {
    tasks: []
  };

  componentDidMount() {
    fetch('https://jsonplaceholder.typicode.com/todos')
      .then(response => response.json())
      .then(json => this.setState({tasks: json}))
      .catch(error => console.log(error))
  }

  deleteTask = id => {
    const newTasks = this.state.tasks.filter(task => (task.id !== id));
    this.setState({tasks: newTasks})
  };

  render() {
    let tasks = this.state.tasks.map(task =>(
      <tr key={task.id}>
        <td>{task.id}</td>
        <td>{task.title}</td>
        <td><button onClick={() => this.deleteTask(task.id)}>Delete</button></td>
      </tr>
    ));

    return (
      <div className={classes.MainDiv}>
        <table>
          <thead>
            <tr>
              <th>id</th>
              <th>description</th>
            </tr>
          </thead>
          <tbody>
            {tasks}
          </tbody>
        </table>
        <button onClick={() => console.log(this.state.tasks)}>JSON</button>
      </div>
    )
  }
}

export default TaskList;