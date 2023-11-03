import React from 'react';
import './App.css';
import { TickerList } from './components/TickerList';
import { Filter } from './components/FIlter/Filter';

function App() {
  return (
    <>
      <Filter />
      <TickerList />
    </>
  );
}

export default App;
