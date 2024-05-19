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
        email: parent.email,
        password: parent.password
      },
      {
        headers: {
          'Content-Type': 'application/json'
          // 'ngrok-skip-browser-warning': true
        }
      }
    );
    const newToken = response.data.token;

    // Simpan token di state atau localStorage
    // Misalnya, simpan di dalam state
    // atau simpan di localStorage
    localStorage.setItem('token', newToken);
    localStorage.setItem('role', 'Parent');

    return response.data;
  } catch (error) {
    if (error.response) {
      const message = error.response.data.msg;
      return thunkAPI.rejectWithValue(message);
    }
    return thunkAPI.rejectWithValue('Login failed');
  }
});

export const getMeParent = createAsyncThunk('parent/getMeParent', async (_, thunkAPI) => {
  try {
    if (localStorage.getItem('role') === 'Parent') return localStorage.getItem('username');
  } catch (error) {
    if (error.response) {
      const message = error.response.data.msg;
      return thunkAPI.rejectWithValue(message);
    }
  }
});

export const logoutParent = createAsyncThunk('parent/logoutParent', async () => {
  localStorage.removeItem('username');
  localStorage.removeItem('token');
  localStorage.removeItem('role');
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
      localStorage.setItem('username', action.payload.username);
    });
    builder.addCase(loginParent.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
      alert('Email atau password salah');
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
