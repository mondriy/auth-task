import React, { FC } from 'react'

interface InputType {
  type: 'text' | 'password' | 'search',
  placeholder?: string,
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void,
  onFocus?: (event: React.ChangeEvent<HTMLInputElement>) => void,
  onBlur?: (event: React.ChangeEvent<HTMLInputElement>) => void,
  refInput?: React.RefObject<HTMLInputElement>
}

const Input: FC<InputType> = ({ type, placeholder, onChange, onFocus, onBlur, refInput }: InputType) => {
  return (
    <input ref={refInput} type={type} placeholder={placeholder} onChange={onChange} onFocus={onFocus} onBlur={onBlur}/>
  )
}

export default Input