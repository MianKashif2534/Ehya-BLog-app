import React from 'react'

function ErrorMessage({message}) {
  return (
    <div className='w-full rounded-lg bg-red-400 text-gray-900 mx-auto px-4 py-2 max-w-md'><p>{message}</p></div>
  )
}

export default ErrorMessage