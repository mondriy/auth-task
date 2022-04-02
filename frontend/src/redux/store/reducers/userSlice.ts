import { loginFetch, logoutFetch, checkAuthFetch } from './userFetch';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from './../../models/user';

interface UserState {
  user: User,
  isAuth: boolean,
  isLoading: boolean,
  error: string
}

const initialState: UserState = {
  user: {
    _id: '1',
    login: 'Гость',
    accessToken: '-',
    refreshToken: '-'
  },
  isAuth: false,
  isLoading: false,
  error: ''
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: {
    [loginFetch.fulfilled.type]: (state, action: PayloadAction<User>) => {
      state.isLoading = false;
      state.error = '';
      state.user = action.payload;
      state.isAuth = true;
      localStorage.setItem('token', action.payload.accessToken);
    },
    [loginFetch.pending.type]: (state) => {
      state.isLoading = true;
    },
    [loginFetch.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.isAuth = false;
      state.error = action.payload;
    },
    [logoutFetch.fulfilled.type]: () => {
      localStorage.removeItem('token');
      window.location.reload();
    },
    [checkAuthFetch.fulfilled.type]: (state, action: PayloadAction<User>) => {
      state.isLoading = false;
      state.error = '';
      state.user = action.payload;
      state.isAuth = true;
      localStorage.setItem('token', action.payload.accessToken);
    }
  }
})

export default userSlice.reducer;