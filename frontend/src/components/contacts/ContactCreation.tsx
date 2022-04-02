import React, { FC } from 'react'
import { useAppDispatch, useAppSelector } from '../../redux/hooks/redux';
import Button from '../commons/Button'
import Input from '../commons/Input'
import { setContactFetch } from '../../redux/store/reducers/contactFetch';
import IMask from 'imask';

interface ContactType {
  name: string,
  phone: string
}

const ContactCreation: FC = () => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector(state => state.userReducer);

  const [contact, setContact] = React.useState<ContactType>({name: '', phone: ''});
  const input = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    const maskOptions = {
      mask: '+{7}(000)000-00-00'
    };
    IMask(input.current!, maskOptions);
  }, [])

  const createContactHandler = () => {
    const { name, phone } = contact;
    const userId = user._id;
    dispatch(setContactFetch({ name, phone, userId })); 
  }

  const changeNameHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setContact({
      ...contact,
      name: e.target.value
    })
  }

  const changePhoneHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setContact({
      ...contact,
      phone: e.target.value
    })
  }
  
  return (
    <div className='contact-creation'>
      <Input
        type='text'
        placeholder='Введите имя..'
        onChange={changeNameHandler}/>   
      <Input
        type='text'
        placeholder='Введите номер телефона..'
        onChange={changePhoneHandler}
        refInput={input}/>     
      <Button
        style='outline'
        text='Создать'
        onClick={createContactHandler}/>
    </div>
  )
}

export default ContactCreation