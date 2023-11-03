import cn from 'classnames';
import './Filter.scss';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { addVisibleTicker, removeVisibleTicker } from '../../store/slices/visibleTickersSlice';



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

  // useEffect (() => {
  //   if(!visibleTikers) {
  //     dispatch(setVisibleTickers(tickers.map(ticker => ticker.ticker)));
  //   };
  // }, [tickers, visibleTikers, dispatch]);


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
