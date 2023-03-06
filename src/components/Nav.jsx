import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { UserAuth } from '../context/AuthContext'

const Nav = () => {
  const {user, logOut} = UserAuth()
  const navigate = useNavigate()
  
  const handleLogout = async () => {
    try {
      await logOut();
      navigate('/')
    } catch (error){
    console.log(error);
  }
};

  return (
    <div className='flex items-center justify-between p-4 z-[100] absolute w-full'>
    <Link to = '/netflix'>
        <h2 className='text-red-600 text-4xl font-bold cursor-pointer'>
            NETFLIX
        </h2>
        </Link>
       {user?.email ?<div>
<Link to = '/Account'>
<div>
<button className='text-white pr-4'>Account</button>
<Link to ='/signup'>
<button onClick={handleLogout} className='bg-red-600 py-2 px-2 rounded cursor-pointer text-white'>
Logout
</button>
</Link>
</div>
</Link>
</div>   :
      <div>
      <Link to = '/Login'>
    <div>
     <img className='h-[7vmin]'
     src='https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png' alt='netlix-logo' />
   </div>
   </Link>
    </div>}
    </div>
  )
}

export default Nav

