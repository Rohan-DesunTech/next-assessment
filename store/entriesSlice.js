// In your Redux slice (e.g., entriesSlice.js)
import { createSlice } from '@reduxjs/toolkit';

export const entriesSlice = createSlice({
  name: 'entries',
  initialState: {
    data: [],
    loading: false,
    error: null,
  },
  reducers: {
    setData: (state, action) => {
      state.data = action.payload;
      state.loading = false;
      state.error = null;
    },
    setLoading: (state) => {
      state.loading = true;
      state.error = null;
    },
    setError: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { setData, setLoading, setError } = entriesSlice.actions;

export const selectEntries = (state) => state.entries.data;
export const selectLoading = (state) => state.entries.loading;
export const selectError = (state) => state.entries.error;

export default entriesSlice.reducer;
