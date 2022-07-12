import React from 'react'

const Nav = () => {
  return (
    <div className='flex items-center justify-between p-4 z-[100] absolute w-full'>
        <h2 className='text-red-600 text-4xl font-bold cursor-pointer'>
            NETFLIX
        </h2>
        <img className='h-[7vmin]'
        src='https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png' alt='netlix-logo' />
    </div>
  )
}

export default Nav