import React, { FC } from 'react'
import { useAppDispatch, useAppSelector } from '../../redux/hooks/redux'
import { getContactFetch } from '../../redux/store/reducers/contactFetch'
import { logoutFetch } from '../../redux/store/reducers/userFetch'
import Button from '../commons/Button'
import Input from '../commons/Input'
import ContactCreation from './ContactCreation'
import ContactFilter from './ContactFilter'

const ContactList: FC = () => {
  const { isAuth } = useAppSelector(state => state.userReducer);
  const dispatch = useAppDispatch();

  const [ searchText, setSearchText ] = React.useState<string>('');

  React.useEffect(() => {
    dispatch(getContactFetch()); 
  }, [])

  const onSearchHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  }

  const onLogoutHandler = () => {
    dispatch(logoutFetch());
  }

  return (
    <div className='contacts-container'> 
      <ContactCreation/>   
      <Input
        type='search'
        placeholder='Для поиска введите имя..'
        onChange={onSearchHandler}/>      
      <ContactFilter
        request={searchText}/>
      {isAuth && <Button style='filled' text='Выйти' onClick={onLogoutHandler}/>}
    </div>
  )
}

export default ContactList