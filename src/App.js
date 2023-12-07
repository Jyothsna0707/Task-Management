// App.js
import React, { useState } from 'react';
import Board from './Board';
import './App.css';

const App = () => {

  return (
    <div className="app">
      <h2>Task Management</h2>
      <Board />
    </div>
  );
};

export default App;
