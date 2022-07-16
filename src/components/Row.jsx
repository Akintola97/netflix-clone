import movieTrailer from 'movie-trailer';
import React, { useState, useEffect } from 'react'
import YouTube from 'react-youtube';
import axios from '../axios'
import {MdChevronLeft, MdChevronRight} from 'react-icons/md'
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { UserAuth } from '../context/AuthContext';
import { db } from '../firebase';
import {arrayUnion, doc, updateDoc} from 'firebase/firestore'




const image_url= "https://image.tmdb.org/t/p/original/";

const Row = ({title, fetchUrl, carouselID}) => {
    const [movies, setMovies] = useState([]);
    const [trailerUrl, setTrailerUrl] =useState("");
    const [like, setLike] = useState(false);
    const {user} = UserAuth();
    const [saved, setSaved] = useState(false)

    const titleId = doc(db, 'users', `${user?.email}`)
   

    const saveTitle = async () => {
      if (user?.email) {
        setLike(!like)
        setSaved(true)
        await updateDoc(titleId,{
          savedTitles : arrayUnion({
            id: title.id,
            title: title.title || title.name || title.original_name,
            img: title.backdrop_bath || title.poster_path
          }),
        });
      } else {
        alert('Log In to save a title to your account')
      }
      }
    



    useEffect(()=>{
        async function fetchData(){
            const request = await axios.get(fetchUrl);
            setMovies(request.data.results);
            return(request)
        }
        fetchData()
    }, [fetchUrl]);

    console.log(movies)

    const opts = {
      height:"390",
      width:"100%",
      playerVars:{
        autoplay: 1, 
      }
    };
  
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


    const slideLeft = () => {
      var slider = document.getElementById('carousel' + carouselID);
      slider.scrollLeft = slider.scrollLeft - 500;
    };
    const slideRight = () => {
      var slider = document.getElementById('carousel' + carouselID);
      slider.scrollLeft = slider.scrollLeft + 500;
    };

    
  return (
    <>
    <h1 className='text-white p-5'>{title}</h1>
    <div className='relative flex item-center p-4 group'>
   
    <MdChevronLeft onClick={slideLeft} className='bg-white absolute bottom-[50%] left-0 opacity-50 hover:opacity-100 group-hover:block hidden rounded-full'/>
      <div id = {'carousel' + carouselID} className='w-full h-full overflow-x-scroll whitespace-nowrap scroll-smooth scrollbar-hide relative'>
      
      {movies.map(movie => (
        
        
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
      ))}
      </div>
      <MdChevronRight onClick={slideRight} className='bg-white absolute right-4 bottom-[50%] opacity-50 hover:opacity-100 group-hover:block hidden   rounded-full' />
    </div>
    {trailerUrl && <YouTube videoId={trailerUrl} opts = {opts} />}
 </>
  )
}

export default Row