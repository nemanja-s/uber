import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import * as actionTypes from '../../store/actions';
import classes from './TasksList.css';


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
          this.props.setTasks(newJSON);
          console.log(newJSON)
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
    const allTasks = this.props.tasks.concat(newTask);
    this.props.setTasks(allTasks);
    this.props.setNextId(this.props.id + 1);
    this.task.value = '';
  };

  deleteTask = id => {
    const newTasks = this.props.tasks.filter(task => (task.id !== id));
    this.props.setTasks(newTasks);
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
  };

  unmarkTask = id => {
    const newTasks = this.props.tasks.map(task => {
      if (task.id === id) {
        task.done = false;
        return task
      }
      return task
    });
    this.props.setTasks(newTasks);
  };

  editTask = (id) => {
    this.props.selectTaskId(id);
    this.props.history.push('/edit-task');
  };

  render() {
    const previewTasks = this.props.tasks.map(task => (
      <tr key={task.id}>
        <td onClick={() => this.editTask(task.id)}>{task.id}</td>
        {
          task.done ?
          <td onClick={() => this.editTask(task.id)}><del>{task.title}</del></td> :
          <td onClick={() => this.editTask(task.id)}>{task.title}</td>
        }
        <td onClick={() => this.editTask(task.id)}>{task.assigned}</td>
        {
          task.done ?
          <td><button onClick={() => this.unmarkTask(task.id)}>Undone</button></td> :
          <td><button onClick={() => this.markTask(task.id)}>Done</button></td>
        }
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
        <input type='text'
               placeholder='Enter new task'
               ref={input => this.task = input} />
        <button onClick={this.addTask}>Add task</button>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    tasks: state.tasks,
    id: state.id
  }
};

const mapDispatchToProps = dispatch => {
  return {
    setTasks: (tasks) => dispatch({type: actionTypes.SET_TASKS, value: tasks}),
    setNextId: (id) => dispatch({type: actionTypes.SET_NEXT_ID, value: id}),
    selectTaskId: (id) => dispatch({type: actionTypes.SELECT_TASK_ID, value: id})
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(TaskList));