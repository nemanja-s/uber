import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import Home from './components/Home/Home';
import Login from './components/Login/Login';
import EditTask from './components/EditTask/EditTask';
import NoMatch from './components/NoMatch/NoMatch';

class App extends Component {
  render() {
    return (
      <Switch>
        <Route path='/' exact component={Home} />
        <Route path='/login' exact component={Login} />
        <Route path='/edit-task' exact component={EditTask} />
        <Route component={NoMatch} />
      </Switch>
    );
  }
}

export default App;
