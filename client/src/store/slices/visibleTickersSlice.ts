import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store';


// interface VisibleTickers {
//   visibleTickers: string[],
// }

// Define the initial state using that type
const initialState: {visibleTickers: string[]} = {
  visibleTickers: [],
};

export const visibleTickersSlice = createSlice({
  name: 'visibleTickers',
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

    setVisibleTickers: (state, action: PayloadAction<string[]>) => {
      state.visibleTickers = action.payload;
    },

    addVisibleTicker: (state, action: PayloadAction<string>) => {
      state.visibleTickers.push(action.payload);
    },

    removeVisibleTicker: (state, action: PayloadAction<string>) => {
      state.visibleTickers = state.visibleTickers.filter(name => name !== action.payload);
    },
  },
});

export const { setVisibleTickers, addVisibleTicker, removeVisibleTicker } = visibleTickersSlice.actions;

// Other code such as selectors can use the imported `RootState` type
// export const selectCount = (state: RootState) => state.counter.value

export default visibleTickersSlice.reducer;
