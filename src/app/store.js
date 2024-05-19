import { configureStore } from '@reduxjs/toolkit';
import parentReducer from '../features/parentSlice';
import childReducer from '../features/childSlice';

export const store = configureStore({
  reducer: {
    parent: parentReducer,
    child: childReducer
  }
});
