import React from 'react';
import { useAppSelector } from '../../hooks';
import { Filter } from '../Filter';
import { TickerList } from '../TickerList';

export const Main: React.FC = () => {
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
