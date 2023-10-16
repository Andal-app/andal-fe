import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  child: null,
  error: false,
  success: false,
  loading: false,
  message: ''
};

export const loginChild = createAsyncThunk('child/login', async (child, thunkAPI) => {
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_linkNgrok}/child/childlogin`,
      {
        username: child.username,
        password: child.password
      },
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
    localStorage.setItem('username', child.username);
    return response.data;
  } catch (error) {
    if (error.response) {
      const message = error.response.data.msg;
      return thunkAPI.rejectWithValue(message);
    }
  }
});

export const getMeChild = createAsyncThunk('child/getMeChild', async (_, thunkAPI) => {
  try {
    return localStorage.getItem('username');
  } catch (error) {
    if (error.response) {
      const message = error.response.data.msg;
      return thunkAPI.rejectWithValue(message);
    }
  }
});

export const logoutChild = createAsyncThunk('child/logout', async () => {
  localStorage.removeItem('username');
});

export const childSlice = createSlice({
  name: 'child',
  initialState,
  reducers: {
    resetChild: (state) => initialState
  },
  extraReducers: (builder) => {
    builder.addCase(loginChild.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(loginChild.fulfilled, (state, action) => {
      state.loading = false;
      state.success = true;
      state.child = action.payload;
    });
    builder.addCase(loginChild.rejected, (state, action) => {
      state.loading = false;
      state.error = true;
      state.message = action.payload;
    });

    // Get child login
    builder
      .addCase(getMeChild.pending, (state) => {
        state.loading = true;
      })
      .addCase(getMeChild.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.child = action.payload;
      })
      .addCase(getMeChild.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
        state.message = action.payload;
      });
  }
});

export const { resetChild } = childSlice.actions;
export default childSlice.reducer;
