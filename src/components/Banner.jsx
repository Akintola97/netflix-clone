import React, { useEffect, useState } from 'react'
import axios from '../axios'
import requests from '../requests';
import YouTube from 'react-youtube';
import movieTrailer from 'movie-trailer';

const image_url= "https://image.tmdb.org/t/p/original/";

const Banner = () => {
    const[movies, setMovie] = useState([]);
    const [trailerUrl, setTrailerUrl] =useState("");
    

    useEffect(() => {
        async function fetchData() {
            const request = await axios.get(requests.fetchNetflixOriginals)
            setMovie(request.data.results[Math.floor(Math.random() * request.data.results.length-1)]
            );
            return request;
        }
        fetchData()
    }, []);

    const opts = {
        height:"390",
        width:"100%",
        playerVars:{
          autoplay: 1, 
        }
      };


    const handleClick = (movies) => {
        if (trailerUrl){
          setTrailerUrl('');
        } else {
          movieTrailer (movies?.title || movies?.name || movies?.original_name)
          .then((url) =>{
            const urlParams = new URLSearchParams(new URL(url).search);
           setTrailerUrl(urlParams.get('v'));
          }).catch((error) => console.log(error))
        }
  
      }

      function refreshPage(){
          window.location.reload(true)
      }
  return (
   <header className='text-white text-left relative'>
       <div className=''>
           <div className='absolute h-full w-full bg-gradient-to-r from-black'></div>
       <img key={movies.id} className='object-cover w-[100vw] h-[100vh] block' src = {`${image_url}${movies?.backdrop_path}`} alt={`${image_url}${movies?.poster_path}`} />
    </div>
     <div className='absolute w-[100vw] h-[100vh] top-[30%] p-4 md:p-8'>
       <h1 className='text-white font-bold text-3xl'>
           {movies?.title || movies?.name || movies?.original_name}
       </h1>
      
           <p className='text-white text-md pt-5'>
               Released: {movies?.first_air_date}
           </p>
           <p className='w-full md:max-w-[70%] lg:max-w-[50%] xl:max-w-[35%] pt-5'>
               {movies?.overview}
           </p>
           <div className='pt-4'>
            <button onClick = {() => handleClick(movies)} className='border bg-gray-300 text-black border-gray 300 py-2  px-5' >Play</button>
            <button onClick ={refreshPage} className='border text-white border-gray 300 py-2  px-5'>Watch Later</button>
        </div>
       </div>
       {trailerUrl && <YouTube videoId={trailerUrl} opts = {opts} />}
   </header>
  )
}

export default Banner
