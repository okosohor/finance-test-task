import React, { useEffect, useState } from 'react';
import { Ticker } from '../Ticker';
import './TickerList.scss';
import { io, Socket } from 'socket.io-client';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { setTicker } from '../../store/slices/tickersSlice';
import { setVisibleTickers } from '../../store/slices/visibleTickersSlice';
import { Loading } from '../Loading';

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
    console.log(visibleTickers);
    if(visibleTickers.length === 0 && !isLoaded) {
      dispatch(setVisibleTickers(tickers.map(tickers => tickers.ticker)));
    }
  }, [visibleTickers, tickers, dispatch]);


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
      <div className="ticker-list">
        {filteredTickers.map(ticker => (
          <Ticker key={ticker.ticker} singleTicker={ticker}/>
        ))}
      </div>
    ) : (
      <Loading />
    )
  );
};



