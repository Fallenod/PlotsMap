import { configureStore } from '@reduxjs/toolkit';
import plotReducer from '../feature/plot/plotSlice';

const store = configureStore({
  reducer: {
    plots: plotReducer,
  },
});

export default store;
