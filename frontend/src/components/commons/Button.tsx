import React, { FC } from 'react'

interface ButtonType {
  style: 'outline' | 'filled',
  text: string,
  onSubmit?: React.FormEventHandler<HTMLButtonElement>,
  onClick?: React.MouseEventHandler<HTMLButtonElement>
}

const Button: FC<ButtonType> = ({ style, text, onSubmit, onClick }: ButtonType) => {
  return (
    <button className={style} onSubmit={onSubmit} onClick={onClick}>{text}</button>
  )
}

export default Button