import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import './App.css';
import Blogs from './components/Blogs/Blogs';
import Update from './components/Blogs/Update';

function App() {
  return (
    <div className="App">
     <Router>

     <Route exact path="/" component={Blogs} />
     <Route exact path="/Update/:id" component={Update} />
     </Router>
    </div>
  );
}

export default App;
