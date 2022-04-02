import React, { FC } from 'react';
import './App.scss';
import Form from './components/authorization/Form';
import ContactList from './components/contacts/ContactList';
import { useAppDispatch, useAppSelector } from './redux/hooks/redux';
import { checkAuthFetch } from './redux/store/reducers/userFetch';

const App: FC = () => {
  const { isAuth } = useAppSelector(state => state.userReducer);
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    if (localStorage.getItem('token')) {
      dispatch(checkAuthFetch()); 
    }
  }, [])
  
  return (
    <>
      {isAuth ? <ContactList /> : <Form />}
    </>
  );
}

export default App;
