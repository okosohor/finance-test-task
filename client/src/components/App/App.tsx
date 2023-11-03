import React from 'react';
import './App.css';
import { TickerList } from '../TickerList';
import { Filter } from '../Filter';
import { useAppSelector } from '../../hooks';

export const App = () => {
  const tickers = useAppSelector(state => state.tickers.tickers);
  return (
    <>
      {tickers.length !== 0 && (
        <Filter />
      )}
      <TickerList />
    </>
  );
};

