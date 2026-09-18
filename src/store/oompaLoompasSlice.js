import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getOompaLoompas, getOompaLoompaDetail } from '../services/api';

const ONE_DAY_MS = 24 * 60 * 60 * 1000;

function isFresh(timestamp) {
  return typeof timestamp === 'number' && Date.now() - timestamp < ONE_DAY_MS;
}

const initialState = {
  list: {
    items: [],
    currentPage: 0,
    totalPages: null,
    lastFetched: null,
    status: 'idle',
    error: null,
  },
  details: {
    byId: {},
  },
};

export const fetchOompaLoompas = createAsyncThunk(
  'oompaLoompas/fetchList',
  (page) => getOompaLoompas(page),
  {
    // Returning false here cancels the thunk before it runs: no request is
    // made and no pending/fulfilled action is dispatched.
    condition: (page, { getState }) => {
      const { list } = getState().oompaLoompas;
      if (list.status === 'loading') return false;
      if (page === 1 && list.items.length > 0 && isFresh(list.lastFetched)) {
        return false;
      }
      return true;
    },
  },
);

export const fetchOompaLoompaDetail = createAsyncThunk(
  'oompaLoompas/fetchDetail',
  (id) => getOompaLoompaDetail(id),
  {
    condition: (id, { getState }) => {
      const entry = getState().oompaLoompas.details.byId[id];
      if (entry?.status === 'loading') return false;
      if (entry?.data && isFresh(entry.lastFetched)) return false;
      return true;
    },
  },
);

const oompaLoompasSlice = createSlice({
  name: 'oompaLoompas',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOompaLoompas.pending, (state) => {
        state.list.status = 'loading';
        state.list.error = null;
      })
      .addCase(fetchOompaLoompas.fulfilled, (state, action) => {
        const { current, total, results } = action.payload;
        // Page 1 of a fresh load replaces the list, any later page appends.
        state.list.items =
          current === 1 ? results : [...state.list.items, ...results];
        state.list.currentPage = current;
        state.list.totalPages = total;
        state.list.status = 'succeeded';
        if (current === 1) {
          state.list.lastFetched = Date.now();
        }
      })
      .addCase(fetchOompaLoompas.rejected, (state, action) => {
        state.list.status = 'failed';
        state.list.error = action.error.message;
      })
      .addCase(fetchOompaLoompaDetail.pending, (state, action) => {
        const id = action.meta.arg;
        state.details.byId[id] = {
          ...state.details.byId[id],
          status: 'loading',
          error: null,
        };
      })
      .addCase(fetchOompaLoompaDetail.fulfilled, (state, action) => {
        const id = action.meta.arg;
        state.details.byId[id] = {
          data: action.payload,
          lastFetched: Date.now(),
          status: 'succeeded',
          error: null,
        };
      })
      .addCase(fetchOompaLoompaDetail.rejected, (state, action) => {
        const id = action.meta.arg;
        state.details.byId[id] = {
          ...state.details.byId[id],
          status: 'failed',
          error: action.error.message,
        };
      });
  },
});

export default oompaLoompasSlice.reducer;

export const selectOompaLoompaList = (state) => state.oompaLoompas.list;
export const selectOompaLoompaDetail = (id) => (state) =>
  state.oompaLoompas.details.byId[id];
