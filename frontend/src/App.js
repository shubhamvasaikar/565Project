import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Header from '../src/component/SideLinkHeaders'
import Main from '../src/component/SideLinkMain'

class App extends Component {
  render() {
    return (
      <div> 
        <Main/>
        <Header/>
        
      </div>
    );
  }
}

export default App;