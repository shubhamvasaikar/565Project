import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Header from '../src/component/SideLinkHeaders'
import Main from '../src/component/SideLinkMain'

// The entire application is rendered within this component.
class App extends Component {
  render() {
    return (
      <div>
        <Header/>
        <Main/>
        
      </div>
    );
  }
}

export default App;
