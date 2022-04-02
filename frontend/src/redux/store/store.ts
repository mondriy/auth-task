import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from './reducers/userSlice';
import contactReducer from './reducers/contactSlice';

const rootReducer = combineReducers({
  userReducer,
  contactReducer
})

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer
  })
}

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];