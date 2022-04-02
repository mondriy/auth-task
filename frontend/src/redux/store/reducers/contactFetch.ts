import { API_URL } from './../../http/index';
import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../http';
import { Contact } from '../../models/contact';

export const getContactFetch = createAsyncThunk(
  '/contacts/get',
  async(_, thunkAPI) => {
    const response = await api.get<Contact>(`${API_URL}/contacts/get`);
    return response.data;
  }
)

type setContact = {
  name: string,
  phone: string,
  userId: string
}

export const setContactFetch = createAsyncThunk(
  '/contacts/set',
  async(contactData: setContact, thunkAPI) => {
    const response = await api.post<Contact>(`${API_URL}/contacts/set`, contactData);
    return response.data;
  }
)

type updContact = {
  name: string,
  phone: string,
  contactId: string
}

export const updContactFetch = createAsyncThunk(
  '/contacts/upd',
  async(contactData: updContact, thunkAPI) => {
    const response = await api.post<Contact>(`${API_URL}/contacts/upd`, contactData);
    return response.data;
  }
)

type delContact = {
  contactId: string
}

export const delContactFetch = createAsyncThunk(
  '/contacts/del',
  async(contactData: delContact, thunkAPI) => {
    const response = await api.post<Contact>(`${API_URL}/contacts/del`, contactData);
    return response.data;
  }
)