import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  parent: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: ''
};

export const loginParent = createAsyncThunk('parent/login', async (parent, thunkAPI) => {
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_linkNgrok}/user/login`,
      {
        username: parent.username,
        password: parent.password
      },
      {
        headers: {
          'Content-Type': 'application/json'
          // 'ngrok-skip-browser-warning': true
        }
      }
    );
    localStorage.setItem('username', parent.username);
    return response.data;
  } catch (error) {
    if (error.response) {
      const message = error.response.data.msg;
      return thunkAPI.rejectWithValue(message);
    }
  }
});

export const getMeParent = createAsyncThunk('parent/getMeParent', async (_, thunkAPI) => {
  try {
    // const response = await axios.get(`${process.env.REACT_APP_linkNgrok}/user/login`);
    return localStorage.getItem('username');
  } catch (error) {
    if (error.response) {
      const message = error.response.data.msg;
      return thunkAPI.rejectWithValue(message);
    }
  }
});

export const logoutParent = createAsyncThunk('parent/logoutParent', async () => {
  localStorage.removeItem('username');
  // await axios.delete('http://localhost:5000/logout');
});

export const parentSlice = createSlice({
  name: 'parent',
  initialState,
  reducers: {
    reset: (state) => initialState
  },
  extraReducers: (builder) => {
    builder.addCase(loginParent.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(loginParent.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.parent = action.payload;
    });
    builder.addCase(loginParent.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
    });

    // Get parent login
    builder.addCase(getMeParent.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getMeParent.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.parent = action.payload;
    });
    builder.addCase(getMeParent.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
    });
  }
});

export const { reset } = parentSlice.actions;
export default parentSlice.reducer;
