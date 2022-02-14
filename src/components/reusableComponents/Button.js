import React from 'react'
import '../../styles/Button.css'

const Button = ({ children, props }) => {
  return (
    <button
      disabled={props.asset && props.currency ? false : true}
      className={props.asset && props.currency ? 'Button' : 'ButtonDisabled'}
    >
      {children}
    </button>
  )
}

export default Button
