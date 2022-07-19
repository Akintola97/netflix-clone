import React from 'react'
import SavedTitles from './SavedTitles'

const Account = () => {
  return (
    <>
      <div className='w-full text-white'>
        <img className= 'object-cover w-full h-[40vmin]' 
        src = 'https://assets.nflxext.com/ffe/siteui/vlv3/1ef84595-1fdb-4404-adac-15215ceeb3ae/9b7e4892-200e-4740-909b-cdd33763fe9f/US-en-20220711-popsignuptwoweeks-perspective_alpha_website_large.jpg' 
        alt = '/' />
        <div className='bg-black/60 fixed top-0 left-0 w-full h-full'></div>
          <div className='text-center p-4 text-white font-bold'>
            <h1>Favorites</h1>
         
        </div>

      </div>
      <SavedTitles />
    </>
  )
}

export default Account