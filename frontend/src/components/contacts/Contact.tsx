import React, { FC } from 'react';
import { useAppDispatch } from '../../redux/hooks/redux';
import { delContactFetch, updContactFetch } from '../../redux/store/reducers/contactFetch';
import Button from '../commons/Button';
import IMask from 'imask';

interface ContactType {
  contactId: string,
  name: string,
  phone: string
}

const Contact: FC<ContactType> = ({ contactId, name, phone }: ContactType) => {
  const dispatch = useAppDispatch();

  const [ contact, setContact ] = React.useState<Omit<ContactType, 'contactId'>>({ name: '', phone: ''});
  const input = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    setContact({
      name: name,
      phone: phone
    })

    const maskOptions = {
      mask: '+{7}(000)000-00-00'
    };
    IMask(input.current!, maskOptions);
  }, [])

  const onDeleteHandler = () => {
    dispatch(delContactFetch({ contactId }));
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

  const blurInputHandler = () => {
    const { name, phone } = contact;
    dispatch(updContactFetch({ name, phone, contactId}));
  }

  return (
    <div className='contact'>
      <div className="contact-info">
        <input 
          className='contact-name' 
          title={name} 
          onBlur={blurInputHandler} 
          onChange={changeNameHandler} 
          value={contact?.name}/>
        <input 
          ref={input} 
          className='contact-phone' 
          title={phone} 
          onBlur={blurInputHandler}
          onChange={changePhoneHandler} 
          value={contact?.phone}/>
      </div>
      <Button
        style='filled'
        text='Удалить'
        onClick={onDeleteHandler}/>
    </div>
  )
}

export default Contact