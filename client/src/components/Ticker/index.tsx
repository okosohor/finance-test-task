import React, { useEffect, useRef} from 'react';
import './Ticker.scss';
import up from './images/up.svg';
import down from './images/down.svg';
import cn from 'classnames';

interface Props {
  singleTicker : {
    ticker:string,
    exchange:string, 
    price: number, 
    change: number,
    change_percent: number,
    dividend: number,
    yield: number,
    last_trade_time:string,
  }
}

export const Ticker: React.FC<Props> = ({ singleTicker }) => {
  const {
    ticker,
    exchange, 
    price, 
    change,
    change_percent,
    dividend,
    yield: income,
    last_trade_time,
  } = singleTicker;

  const prevPriceRef = useRef<number>(price);
  const prevChangePercentRef = useRef<number>(change_percent);

  const changePercentIsUp = change_percent  > prevChangePercentRef.current;
  const priceClass = price > prevPriceRef.current ? 'ticker__header-text--green' :  'ticker__header-text--red';
  const dateTime = new Date(last_trade_time);
  const options = { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric', 
    hour: '2-digit', 
    minute: '2-digit', 
    second: '2-digit' } as Intl.DateTimeFormatOptions;
  const formattedDateTime = dateTime.toLocaleDateString('en-US', options);


  useEffect(() => {
    return () => {
      prevPriceRef.current = price;
      prevChangePercentRef.current = change_percent;
    };
  });




  return (
    <div className="ticker">
      <div className="ticker__header">
        <p className="ticker__header-text">Ticker {ticker}</p>
        <p className="ticker__header-text" >Price <span className={priceClass} >{price}</span></p>
      </div>
      <div className="ticker__body">
        <div className="ticker__body-container">
          <p className="ticker__body-text">
            Change {change}
          </p>
          <p className="ticker__body-text">
            Change percent <span className={cn({'ticker__body-text--green': changePercentIsUp, 'ticker__body-text--red': !changePercentIsUp})}>{change_percent}</span>
            <img className={cn('ticker__img', {'ticker__img--hiden': !changePercentIsUp})} src={up} alt="" />
            <img className={cn('ticker__img', {'ticker__img--hiden': changePercentIsUp})} src={down} alt="" />
          </p>
        </div>
        <div className="ticker__body-container">
          <p className="ticker__body-text">Dividend {dividend}</p>
          <p className="ticker__body-text">Yield {income}</p>
        </div>
      </div>
      <div className="ticker__footer">
        <p className="ticker__footer-text">Exchange {exchange}</p>
        <p className="ticker__footer-text">Last trade time {formattedDateTime}</p>
      </div>
    </div>
  );
};
