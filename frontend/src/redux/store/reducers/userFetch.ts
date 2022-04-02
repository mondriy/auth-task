import { API_URL } from './../../http/index';
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import api from '../../http';
import { User } from '../../models/user';

type AuthType = {
  login: string,
  password: string
}

export const loginFetch = createAsyncThunk(
  '/login',
  async(userData: AuthType, thunkAPI) => {
    const response = await api.post<User>('/login', userData);
    return response.data;
  }
)

export const logoutFetch = createAsyncThunk(
  '/logout',
  async(_, thunkAPI) => {
    const response = await api.post('/logout');
    return response.data;
  }
)

export const checkAuthFetch = createAsyncThunk(
  '/refresh',
  async(_, thunkAPI) => {
    const response = await axios.get<User>(`${API_URL}/refresh`, { withCredentials: true });
    return response.data;
  }
)