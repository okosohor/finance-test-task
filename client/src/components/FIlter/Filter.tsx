import React from 'react';
import './Filter.scss';
import { useAppSelector } from '../../hooks';



export const Filter: React.FC = () => {
  const tickers = useAppSelector(state => state.tickers.tickers);
  const visibleTikers = useAppSelector(state => state.visibleTickers.visibleTickers);
  return (
    <div className="filter">
      {tickers.map(ticker => (
        <button key={ticker.ticker}>{ticker.ticker}</button>
      ))}
    </div>
  );
};
