import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { UserAuth } from '../context/AuthContext'



const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // eslint-disable-next-line
  const { user, signUp } = UserAuth();
  const navigate = useNavigate()



  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signUp(email, password);
      navigate('/')
    } catch (error) {
      console.log(error);
    }
  };


 


  return (
    <>
    <div className='w-full h-screen'>
      <img className= 'object-cover hidden sm:block absolute w-full h-full' src = 'https://assets.nflxext.com/ffe/siteui/vlv3/1ef84595-1fdb-4404-adac-15215ceeb3ae/9b7e4892-200e-4740-909b-cdd33763fe9f/US-en-20220711-popsignuptwoweeks-perspective_alpha_website_large.jpg' alt = '/' />
<div className='bg-black/60 fixed top-0 w-full h-screen'></div>
  <div className='fixed w-full py-[10vmin] z-50'>
    <div className='max-w-[60vmin] h-[80vmin] mx-auto bg-black opacity-[.95] text-white'>
      <div className='max-w-[55vmin] mx-auto py-16'>
        <h2 className='text-3xl font-bold'>Sign Up</h2>
        <form onSubmit={handleSubmit}
         className='w-full flex flex-col py-4'>
          <input onChange={(e) => setEmail(e.target.value)}
           className='p-3 my-2 bg-gray-700 rounded' type='email' placeholder='Email...' autoComplete='email'/>
          <input onChange={(e) => setPassword(e.target.value)} 
          className='p-3 my-2 bg-gray-700 rounded' type='password' placeholder='Password' autoComplete='current-password' />
        <button className='bg-red-600 py-3 my-6 rounded font-bold'>Sign Up</button>
   <div className='flex justify-between items-center text-sm text-gray-600'>
     <p><input className='mr-2' type='checkbox'></input>Remember Me</p>
     <p>Need Help?</p>
   </div>
   <p className='py-8'><span className='text-gray-600'>Already a member?</span><Link to='/login'> Sign In</Link></p>
        </form>

      </div>

    </div>

  </div>
</div>
    </>
  )
}

export default SignUp