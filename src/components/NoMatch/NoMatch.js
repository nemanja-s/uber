import React from 'react';
import { Link } from 'react-router-dom';

import classes from './NoMatch.css';

const noMatch = () => (
  <div className={classes.MainDiv}>
    <Link to='/'>Back to home page</Link>
  </div>
);

export default noMatch;