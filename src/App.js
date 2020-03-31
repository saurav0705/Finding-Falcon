import React from 'react';
import './App.css';
import Main from './components/Main/Main';
import Header from './components/Header/Header';
import {BrowserRouter as Router,Route} from 'react-router-dom';
import Home from './components/Home/Home';
import Footer from './components/Footer/Footer';

function App() {
  return (
    <div className="">
      <Router>
      <div className="head">
      <Header/>
      </div>
      <div className="content">
      <Route exact path="/" component={Home}/>
      <Route exact path="/journey" component={Main}/>
      </div>
      <Footer/>
      </Router>
    </div>
  );
}

export default App;
