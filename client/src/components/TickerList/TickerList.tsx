import React, { useEffect, useState } from 'react';
import { Ticker } from '../Ticker';
import './TickerList.scss';
import { io, Socket } from 'socket.io-client';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { setTicker } from '../../store/slices/tickersSlice';
import { setVisibleTickers } from '../../store/slices/visibleTickersSlice';
import { Loading } from '../Loading';
import { TickersFilter } from '../TickersFilter';

// import cn from 'classnames';
// import '../Filter/Filter.scss';
// import { addVisibleTicker, removeVisibleTicker } from '../../store/slices/visibleTickersSlice';

interface TickerData {
  ticker: string;
  exchange: string;
  price: number;
  change: number;
  change_percent: number;
  dividend: number;
  yield: number;
  last_trade_time: string;
}

const socket: Socket = io('https://finance-server-qsji.onrender.com');

export const TickerList: React.FC = () => {
  
  const tickers = useAppSelector(state => state.tickers.tickers);
  const visibleTickers = useAppSelector(state => state.visibleTickers.visibleTickers);
  const dispatch = useAppDispatch();
  const filteredTickers = tickers.filter(ticker => visibleTickers.includes(ticker.ticker));

  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  useEffect(() => {
    if(visibleTickers.length === 0 && !isLoaded) {
      dispatch(setVisibleTickers(tickers.map(tickers => tickers.ticker)));
    }
  }, [visibleTickers, tickers, dispatch, isLoaded]);

  useEffect(() => {
    const updateTickers = (newTickers: TickerData[]) => {
      dispatch(setTicker(newTickers));
      setIsLoaded(true);
    };

    socket.emit('start');

    socket.on('ticker', updateTickers);

    return () => {
      socket.off('ticker', updateTickers);
    };
  }, [dispatch]);

  return (
    tickers.length !== 0 ? (
      <>
        <TickersFilter />
        <div className="ticker-list">
          {filteredTickers.map(ticker => (
            <Ticker key={ticker.ticker} singleTicker={ticker}/>
          ))}
        </div>
      </>
    ) : (
      <Loading />
    )
  );
};
