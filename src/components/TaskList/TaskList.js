import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import classes from './TaksList.css';

class TaskList extends Component {
  state = {
    tasks: [],
    id: 201
  };

  componentDidMount() {
    fetch('https://jsonplaceholder.typicode.com/todos')
      .then(response => response.json())
      .then(json => {
        const newJSON = json.map(task => {
          task.done = false;
          task.assigned = 'None';
          return task
        });
        this.setState({tasks: newJSON})
      })
      .catch(error => console.log(error))
  }

  addTask = () => {
    if (this.task.value === '') {
      return
    }
    const newTask = [{
      id: this.state.id,
      title: this.task.value,
      assigned: 'None'
    }];
    const newTasks = this.state.tasks.concat(newTask);
    this.setState({
      tasks: newTasks,
      id: this.state.id + 1
    });
    this.task.value = '';
  };

  deleteTask = id => {
    const newTasks = this.state.tasks.filter(task => (task.id !== id));
    this.setState({tasks: newTasks})
  };

  markTask = id => {
    const newTasks = this.state.tasks.map(task => {
      if (task.id === id) {
        task.done = true;
        return task
      }
      return task
    });
    this.setState({tasks: newTasks})
  };

  render() {
    let tasks = this.state.tasks.map(task => (
      <tr key={task.id} onClick={() => this.props.history.push('/edit')}>
        <td>{task.id}</td>
        { task.done ?
        <td><del>{task.title}</del></td> :
        <td>{task.title}</td> }
        <td>{task.assigned}</td>
        <td><button onClick={() => this.markTask(task.id)}>Done</button></td>
        <td><button onClick={() => this.deleteTask(task.id)}>Delete</button></td>
      </tr>
    ));

    return (
      <div className={classes.MainDiv}>
        <input type='text' placeholder='New Task' ref={input => this.task = input} />
        <button onClick={this.addTask}>Add new task</button>
        <table>
          <thead>
            <tr>
              <th>id</th>
              <th>description</th>
              <th>assigned to</th>
            </tr>
          </thead>
          <tbody>
            {tasks}
          </tbody>
        </table>
      </div>
    )
  }
}

export default withRouter(TaskList);