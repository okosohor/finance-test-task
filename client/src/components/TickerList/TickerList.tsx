import React, { useEffect, useState } from 'react';
import { Ticker } from '../Ticker';
import './TickerList.scss';
import { io, Socket } from 'socket.io-client';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { setTicker } from '../../store/slices/tickersSlice';
import { setVisibleTickers } from '../../store/slices/visibleTickersSlice';
import { Loading } from '../Loading';

import cn from 'classnames';
import '../Filter/Filter.scss';
import { addVisibleTicker, removeVisibleTicker } from '../../store/slices/visibleTickersSlice';

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

// const socket: Socket = io('https://finance-test-task-server.vercel.app');
const socket: Socket = io('https://finance-server-qsji.onrender.com');
// const ws = new WebSocket('http://localhost:4000');

export const TickerList: React.FC = () => {
  // const [tickers, setTickers] = useState<TickerData[]>([]);
  
  // const tickerss =   [{ticker:'GOOGL',exchange:'NASDAQ', price: 237.08, change:154.38,change_percent:0.10,dividend:0.46,yield:1.18,last_trade_time:'2021-04-30T11:53:21.000Z'},
  //   {ticker:'ASDS',exchange:'NASDAQ', price: 237.08, change:154.38,change_percent:0.10,dividend:0.46,yield:1.18,last_trade_time:'2021-04-30T11:53:21.000Z'},
  // ];

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
        <Filter />
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




export const Filter: React.FC = () => {
  const tickers = useAppSelector(state => state.tickers.tickers);
  const visibleTiсkers = useAppSelector(state => state.visibleTickers.visibleTickers);
  const dispatch = useAppDispatch();

  const handleClick = (ticker: string) => {
    if(visibleTiсkers.includes(ticker)) {
      dispatch(removeVisibleTicker(ticker));
    } else {
      dispatch(addVisibleTicker(ticker));
    }
  };


  return (
    <div className="filter">
      {tickers.map(ticker => (
        <button 
          className={cn('filter__button', {
            'filter__button--unactive': !visibleTiсkers.includes(ticker.ticker),
          })}
          key={ticker.ticker}
          onClick={() => handleClick(ticker.ticker)}
        >
          {ticker.ticker}
        </button>
      ))}
    </div>
  );
};




