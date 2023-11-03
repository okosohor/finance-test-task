import { configureStore } from '@reduxjs/toolkit';
import tickersReducer from './slices/tickersSlice';
import visibleTickers from './slices/visibleTickersSlice';
export const store = configureStore({
  reducer: {
    tickers: tickersReducer,
    visibleTickers: visibleTickers,
  },
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
