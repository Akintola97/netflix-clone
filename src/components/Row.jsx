import movieTrailer from 'movie-trailer';
import React, { useState, useEffect } from 'react'
import YouTube from 'react-youtube';
import axios from '../axios'
import {MdChevronLeft, MdChevronRight} from 'react-icons/md'

const image_url= "https://image.tmdb.org/t/p/original/";

const Row = ({title, fetchUrl}) => {
    const [movies, setMovies] = useState([]);
    const [trailerUrl, setTrailerUrl] =useState("");
   

    useEffect(()=>{
        async function fetchData(){
            const request = await axios.get(fetchUrl);
            setMovies(request.data.results);
            return(request)
        }
        fetchData()
    }, [fetchUrl]);

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
      var slider = document.getElementById('slider');
      slider.scrollLeft = slider.scrollLeft - 500;
    };
    const slideRight = () => {
      var slider = document.getElementById('slider');
      slider.scrollLeft = slider.scrollLeft + 500;
    };

    
  return (
    <>
        <h2 className='text-white p-5'>{title}</h2>
<div className='flex items-center p-5'>
<MdChevronLeft onClick={slideLeft} className='bg-white absolute left-4 rounded-full'/>
    <div className='w-ful h-full overflow-x-scroll whitespace-nowrap scroll-smooth scrollbar-hide'>
   
      {movies.map(movie => (
        <div id = {'slider'} className='w-[43vmin] inline-block cursor-pointer p-2'>
        <img key={movie?.id}
        onClick = {() => handleClick(movie)}
        className='w-full object-contain h-full mx-2 transition hover:scale-[1.08] ' src={`${image_url}${movie?.backdrop_path}`} alt={movie?.title} /> 
        </div>
      ) )}
      </div>
      <MdChevronRight onClick={slideRight} className='bg-white absolute right-1 rounded-full' />
    </div>
    {trailerUrl && <YouTube videoId={trailerUrl} opts = {opts} />}
    </>
  )
}

export default Row