import React, { useEffect, useState } from 'react';
import { Ticker } from '../Ticker';
import './TickerList.scss';
import { io, Socket } from 'socket.io-client';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { setTicker } from '../../store/slices/tickersSlice';
import { setVisibleTickers } from '../../store/slices/visibleTickersSlice';

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
  const [tickers, setTickers] = useState<TickerData[]>([]);
  
  const tickerss =   [{ticker:'GOOGL',exchange:'NASDAQ', price: 237.08, change:154.38,change_percent:0.10,dividend:0.46,yield:1.18,last_trade_time:'2021-04-30T11:53:21.000Z'},
    {ticker:'ASDS',exchange:'NASDAQ', price: 237.08, change:154.38,change_percent:0.10,dividend:0.46,yield:1.18,last_trade_time:'2021-04-30T11:53:21.000Z'},
  ];

  const reduxTickers = useAppSelector(state => state.tickers.tickers);
  const dispatch = useAppDispatch();


  useEffect(() => {
    const updateTickers = (newTickers: TickerData[]) => {
      dispatch(setTicker(newTickers));
      dispatch(setVisibleTickers(newTickers.map(ticker => ticker.ticker)));
    };



    socket.emit('start');

    socket.on('ticker', updateTickers);

    return () => {
      socket.off('ticker', updateTickers);
    };
  }, []);

  return (
    <div className="ticker-list">
      {reduxTickers.map(ticker => (
        <Ticker key={ticker.ticker} singleTicker={ticker}/>
      ))}
    </div>
  );
};



