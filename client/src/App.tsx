import React from 'react';
import './App.css';
import { TickerList } from './components/TickerList';
// import { Filter } from './components/Filter/';
import { useAppSelector } from './hooks';

function App() {
  const tickers = useAppSelector(state => state.tickers.tickers);
  return (
    <>
      {/* {tickers.length !== 0 && ( */}
      {/* <Filter /> */}
      {/* // )} */}
      <TickerList />
    </>
  );
};

export default App;


