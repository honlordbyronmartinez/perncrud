import React, { Component } from 'react';
import { useState } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import modules from '../modules'; // All the parent knows is that it has modules ...

function Navapp() {
  const [currentTab, setCurrentTab] = useState('dashboard');

  return (
      <Router>
        <div className="App">
          <header className="App-header">
            <ul className="App-nav" display="inline" >
              {modules.map(module => ( // with a name, and routes
                  <li key={module.name} className={currentTab === module.name ? 'active' : ''}>
                    <Link to={module.routeProps.path} onClick={() => setCurrentTab(module.name)}>{module.name}</Link>
                  </li>
              ))}
            </ul>
          </header>
          <div className="App-content">
            {modules.map(module => (
              <Route {...module.routeProps} key={module.name} />
            ))}
          </div>
        </div>
      </Router>
  );
}

export default Navapp