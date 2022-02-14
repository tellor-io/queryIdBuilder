import React, { useState, useEffect } from 'react'
import '../../styles/Button.css'

const Button = ({ children, props, onClick }) => {
  const [disabled, setDisabled] = useState(true)
  const [clickMethod, setClickMethod] = useState(null)

  useEffect(() => {
    if (props.asset && props.currency) {
      setDisabled(false)
    } else if (props.type) {
      setDisabled(false)
      setClickMethod(onClick)
    }

    return () => {
      setDisabled(true)
      setClickMethod(null)
    }
  }, [props])

  console.log(clickMethod)

  return (
    <button
      disabled={disabled}
      className={disabled ? 'ButtonDisabled' : 'Button'}
      onClick={onClick}
    >
      {children}
    </button>
  )
}

export default Button
