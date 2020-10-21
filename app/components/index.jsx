import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Link, browserHistory } from 'react-router';
import Home from './Home/index.jsx';


ReactDOM.render((
    <Router history={browserHistory}>
      <Route path="/" component={Home}></Route>
    
      
      
     
      
    </Router>
), document.getElementById('app'));

