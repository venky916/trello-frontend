import { createSlice } from '@reduxjs/toolkit';

const toastSlice = createSlice({
  name: 'toast',
  initialState: {
    toast: null,
  },
  reducers: {
    addToast: (state, action) => {
      state.toast = action.payload;
    },
    clearToast: (state) => {
      state.toast = null;
    },
  },
});

export const { addToast, clearToast } = toastSlice.actions;

export default toastSlice.reducer;
