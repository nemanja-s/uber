import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actionTypes from '../../store/actions';

import classes from './TaksList.css';


class TaskList extends Component {
  componentDidMount() {
    if (this.props.tasks.length === 0) {
      fetch('https://jsonplaceholder.typicode.com/todos')
        .then(response => response.json())
        .then(json => {
          const newJSON = json.slice(0, 10).map(task => {
            task.done = false;
            task.assigned = 'None';
            return task
          });
          this.props.setTasks(newJSON)
        })
        .catch(error => console.log(error))
    }
  }

  addTask = () => {
    if (this.task.value === '') {
      return
    }
    const newTask = [{
      id: this.props.id,
      title: this.task.value,
      assigned: 'None'
    }];
    const allAddedTasks = this.props.addedTasks.concat(newTask);
    this.props.addingTask(allAddedTasks);
    this.props.setId(this.props.id + 1);
    this.task.value = '';
  };

  deleteTask = id => {
    const newTasks = this.props.tasks.filter(task => (task.id !== id));
    this.props.setTasks(newTasks);
    const newAddedTasks = this.props.addedTasks.filter(task => (task.id !==id));
    this.props.addingTask(newAddedTasks);
  };

  markTask = id => {
    const newTasks = this.props.tasks.map(task => {
      if (task.id === id) {
        task.done = true;
        return task
      }
      return task
    });
    this.props.setTasks(newTasks);
    const newAddedTasks = this.props.addedTasks.map(task => {
      if (task.id === id) {
        task.done = true;
        return task
      }
      return task
    });
    this.props.addingTask(newAddedTasks);
  };

  render() {
    const allTasks = this.props.tasks.concat(this.props.addedTasks);
    const previewTasks = allTasks.map(task => (
      <tr key={task.id}>
        <td onClick={() => this.props.history.push('/edit-task')}>{task.id}</td>
        { task.done ?
        <td onClick={() => this.props.history.push('/edit-task')}><del>{task.title}</del></td> :
        <td onClick={() => this.props.history.push('/edit-task')}>{task.title}</td> }
        <td onClick={() => this.props.history.push('/edit-task')}>{task.assigned}</td>
        <td><button onClick={() => this.markTask(task.id)}>Done</button></td>
        <td><button onClick={() => this.deleteTask(task.id)}>Delete</button></td>
      </tr>
    ));

    return (
      <div className={classes.MainDiv}>
        <h2>Task List</h2>
        <table>
          <thead>
            <tr>
              <th>id</th>
              <th>description</th>
              <th>assigned to</th>
            </tr>
          </thead>
          <tbody>
            {previewTasks}
          </tbody>
        </table>
        <input type='text' placeholder='New Task' ref={input => this.task = input} />
        <button onClick={this.addTask}>Add new task</button>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    tasks: state.tasks,
    addedTasks: state.addedTasks,
    id: state.id
  }
};

const mapDispatchToProps = dispatch => {
  return {
    setTasks: (tasks) => dispatch({type: actionTypes.SET_TASKS, value: tasks}),
    setId: (id) => dispatch({type: actionTypes.SET_ID, value: id}),
    addingTask: (task) => dispatch({type: actionTypes.ADDING_TASK, value: task})
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(TaskList));