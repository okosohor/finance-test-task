import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';


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

// Define the initial state using that type
const initialState: {tickers: TickerData[]} = {
  tickers: [],
};

export const tickersSlice = createSlice({
  name: 'tickers',
  initialState,
  reducers: {
    // increment: (state) => {
    //   state.value += 1
    // },
    // decrement: (state) => {
    //   state.value -= 1
    // },
    // incrementByAmount: (state, action: PayloadAction<number>) => {
    //   state.value += action.payload
    // },

    setTicker: (state, action: PayloadAction<TickerData[]>) => {
      state.tickers = action.payload;
    },
  },
});

export const { setTicker } = tickersSlice.actions;

// Other code such as selectors can use the imported `RootState` type
// export const selectCount = (state: RootState) => state.counter.value

export default tickersSlice.reducer;
