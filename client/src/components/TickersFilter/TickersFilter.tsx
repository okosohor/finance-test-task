import cn from 'classnames';
import './TickersFilter.scss';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { addVisibleTicker, removeVisibleTicker } from '../../store/slices/visibleTickersSlice';



export const TickersFilter: React.FC = () => {
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
