import React, { FC } from 'react'
import Button from '../commons/Button'
import Input from '../commons/Input'
import { useAppDispatch } from '../../redux/hooks/redux';
import { loginFetch } from '../../redux/store/reducers/userFetch';

const Form: FC = () => {
  const [login, setLogin] = React.useState<string>('');
  const [password, setPassword] = React.useState<string>('');

  const dispatch = useAppDispatch();

  const onSubmitHandler = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(loginFetch({ login, password })); 
  }

  return (
    <form className='form' onSubmit={onSubmitHandler}>
      <div className="input-container">
        <Input
          type='text'
          placeholder='Введите логин'
          onChange={(e) => setLogin(e.target.value)} />
        <Input
          type='password'
          placeholder='Введите пароль'
          onChange={(e) => setPassword(e.target.value)} />
      </div>
      <Button
        style='filled'
        text='Войти'/>
    </form>
  )
}

export default Form