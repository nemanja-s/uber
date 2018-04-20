import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

class App extends Component {
  state = {
    isAuthenticated: false
  };

  render() {
    return (
      <Switch>
        <Route path='/' component={Home} />
      </Switch>
    );
  }
}

export default App;
