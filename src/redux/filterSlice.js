import { createSlice } from '@reduxjs/toolkit';

export const filterSlice = createSlice({
  name: 'filter',
  initialState: '',
  reducers: {
    changeFilter(state, action) {
      return (state = action.payload);
      },
      resetFilter(state, action) { 
      return '';
      }
  },
});

export const filterReducer = filterSlice.reducer;

export const { changeFilter, resetFilter } = filterSlice.actions;

export const getFilter = state => state.filter;