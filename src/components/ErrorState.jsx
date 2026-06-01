import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTriangleExclamation } from '@fortawesome/free-solid-svg-icons/faTriangleExclamation'

const ErrorState = ({message}) => {
  return (
    <div className='error'>
      <FontAwesomeIcon className='error-icon' icon={faTriangleExclamation} />
      <h1 className='error-msg'>{message}</h1>
    </div>
  )
}

export default ErrorState