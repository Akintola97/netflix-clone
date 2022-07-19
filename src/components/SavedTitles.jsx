import React, { useEffect } from 'react'
import { MdChevronLeft } from 'react-icons/md'
import { MdChevronRight } from 'react-icons/md'
import { useState } from 'react'
import { UserAuth } from '../context/AuthContext'
import { db } from '../firebase'
import {updateDoc, doc, onSnapshot} from 'firebase/firestore'
import {AiOutlineClose} from 'react-icons/ai'

const SavedTitles = () => {
    const [movies, setMovies] = useState([]);
    const {user} = UserAuth()
 

    const slideLeft = () => {
        var slider = document.getElementById('slider');
        slider.scrollLeft = slider.scrollLeft - 500;
      };
      const slideRight = () => {
        var slider = document.getElementById('slider');
        slider.scrollLeft = slider.scrollLeft + 500;
      };

    const image_url= "https://image.tmdb.org/t/p/original/";


    useEffect(() =>{
        onSnapshot(doc(db, 'users', `${user?.email}`), (doc) => {
            setMovies(doc.data()?.savedTitles)
        })
}, [user?.email]);

const movieRef = doc(db, 'users', `${user?.email}`)
const deleteTitle = async (passedID) => {
    try {
      const result = movies.filter((movie) => movie.id !== passedID)
      await updateDoc(movieRef, {
          savedTitles: result
      })
    } catch (error) {
        console.log(error)
    }
}

  return (
    <div>
        <h1 className='text-white p-5'>Titles</h1>
    <div className='relative item-center p-4 group'>
    <MdChevronLeft onClick={slideLeft} className='bg-white absolute bottom-[50%] left-0 opacity-50 hover:opacity-100 group-hover:block hidden rounded-full'
    />
      <div id = {'carousel'} 
      className='w-full h-full flex overflow-x-scroll whitespace-nowrap scroll-smooth scrollbar-hide relative'>
 
      {movies.map((movie, id) => (
               <div key={id} className='w-[50vmin] h-auto inline-block cursor-pointer p-2 relative'>
            
               <img key={movie?.id}  className='w-full h-auto block mx-2 transition hover:scale-[1.08] ' src={`${image_url}${movie?.img}`}
            alt={movie?.title || movie?.name ||movie?.original_name}
            /> 
            
            <div className='absolute top-0 left-0 w-full h-full text-white hover:bg-black/80 opacity-0 hover:opacity-100 transition'> 
            
            <p  className='white-space-normal text-[1.5vmin] invisible lg:visible flex items-center w-full h-full justify-center text-center absolute top-0'>
               {movie?.title || movie?.name ||movie?.original_name}
               
             </p>
             <p onClick={()=> deleteTitle(movie.id)}>
                 <AiOutlineClose className='absolute text-gray-300 top-3 left-5 text-sm' />
             </p>
        
             
              </div>
             
               </div>
      ))}
      </div>
      <MdChevronRight onClick={slideRight} className='bg-white absolute right-4 bottom-[50%] opacity-50 hover:opacity-100 group-hover:block hidden   rounded-full' />
    </div>
    </div>
  )
}

export default SavedTitles