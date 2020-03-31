import React from 'react';
import './App.css';
import Main from './components/Main/Main';
import Header from './components/Header/Header';
import {BrowserRouter as Router,Route} from 'react-router-dom';
import Home from './components/Home/Home';

function App() {
  return (
    <div className="">
      <Router>
      <div className="head">
      <Header/>
      </div>
      <Route exact path="/" component={Home}/>
      <Route exact path="/journey" component={Main}/>
      </Router>
    </div>
  );
}

export default App;
