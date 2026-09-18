import { configureStore } from '@reduxjs/toolkit';
import oompaLoompasReducer from './oompaLoompasSlice';
import { loadPersistedState, savePersistedState } from './persist';

const persistedOompaLoompas = loadPersistedState();

export const store = configureStore({
  reducer: {
    oompaLoompas: oompaLoompasReducer,
  },
  preloadedState: persistedOompaLoompas
    ? { oompaLoompas: persistedOompaLoompas }
    : undefined,
});

// Keeps localStorage in sync with the store so the "don't refetch within a
// day" rule survives page reloads, not just the current tab session.
store.subscribe(() => {
  savePersistedState(store.getState().oompaLoompas);
});
