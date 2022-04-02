import { getContactFetch, updContactFetch, setContactFetch, delContactFetch } from './contactFetch';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Contact } from './../../models/contact';

interface ContactState {
  contacts: Contact[]
}

const initialState: ContactState = {
  contacts: []
}

export const contactSlice = createSlice({
  name: 'contact',
  initialState,
  reducers: {},
  extraReducers: {
    [getContactFetch.fulfilled.type]: (state, action: PayloadAction<Contact[]>) => {
      state.contacts = action.payload;
    },
    [updContactFetch.fulfilled.type]: (state, action: PayloadAction<Contact>) => {
    },
    [setContactFetch.fulfilled.type]: (state, action: PayloadAction<Contact>) => {
      state.contacts.unshift(action.payload);
    },
    [delContactFetch.fulfilled.type]: (state, action: PayloadAction<Contact>) => {
      state.contacts = state.contacts.filter((contact) => contact._id !== action.payload._id);
    }
  }
})

export default contactSlice.reducer;