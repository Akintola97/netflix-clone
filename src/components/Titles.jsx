import React from 'react'
import movieTrailer from 'movie-trailer';
import { useState } from 'react';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import {arrayUnion, doc, updateDoc} from 'firebase/firestore'
import { db } from '../firebase';
import YouTube from 'react-youtube';

import { UserAuth } from '../context/AuthContext';


const image_url= "https://image.tmdb.org/t/p/original/";

const Titles = ({movie}) => {
    const [like, setLike] = useState(false);
    const {user} = UserAuth();
    const [saved, setSaved] = useState(false)
    const [trailerUrl, setTrailerUrl] =useState("");

    const titleId = doc(db, 'users', `${user?.email}`)

    const saveTitle = async () => {
        if (user?.email) {
          setLike(!like)
          setSaved(true)
          await updateDoc(titleId,{
            savedTitles : arrayUnion({
              id: movie.id,
              title: movie.title || movie.name || movie.original_name,
              img: movie.backdrop_bath || movie.poster_path
            }),
          });
        } else {
          alert('Log In to save a title to your account')
        }
        }


        const handleClick = (movie) => {
            if (trailerUrl){
              setTrailerUrl('');
            } else {
              movieTrailer (movie?.title || movie?.name || movie?.original_name)
              .then((url) =>{
                const urlParams = new URLSearchParams(new URL(url).search);
               setTrailerUrl(urlParams.get('v'));
              }).catch((error) => console.log(error))
            }
      
          }       
          
         const opts = {
      height:"390",
      width:"100%",
      playerVars:{
        autoplay: 1, 
      }
    };

  return (
    <div>  
         <div className='w-[43vmin] h-full inline-block cursor-pointer p-2 relative'>
            
    <img key={movie?.id}  className='w-full h-full block mx-2 transition hover:scale-[1.08] ' src={`${image_url}${movie?.backdrop_path || movie?.poster_path}`}
 alt={movie?.title || movie?.name ||movie?.original_name}
 /> 
 
 <div className='absolute top-0 left-0 w-full h-full text-white hover:bg-black/80 opacity-0 hover:opacity-100 transition'> 
 
 <p onClick = {() => handleClick(movie)}  className='white-space-normal text-[1.5vmin] flex items-center w-full h-full justify-center text-center absolute top-0'>
    {movie?.title || movie?.name ||movie?.original_name}
  </p>
  <p onClick={saveTitle}>
    {like ? (
    <FaHeart className='absolute top-4 left-4 text-gray-300'/>
    ) : (
    <FaRegHeart className='absolute top-4 left-4 text-gray-300'/>
    )}
  </p>
   </div>
    </div>
    {trailerUrl && <YouTube videoId={trailerUrl} opts = {opts} />}
    </div>
  )
}

export default Titles