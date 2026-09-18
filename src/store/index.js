import { configureStore } from '@reduxjs/toolkit';

// configureStore rejects an empty reducer ({}); this placeholder keeps the
// state untouched while there are no real slices yet.
const placeholderReducer = (state = {}) => state;

export const store = configureStore({
  reducer: placeholderReducer,
});
