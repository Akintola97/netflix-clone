import React, { useState, useEffect } from 'react'
import axios from '../axios'
import {MdChevronLeft, MdChevronRight} from 'react-icons/md'
import Titles from './Titles';





const Row = ({title, fetchUrl, carouselID}) => {
    const [movies, setMovies] = useState([]);
   

    useEffect(()=>{
        async function fetchData(){
            const request = await axios.get(fetchUrl);
            setMovies(request.data.results);
            return(request)
        }
        fetchData()
    }, [fetchUrl]);

    console.log(movies)


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
    <div className='relative item-center p-4 group'>
    <MdChevronLeft onClick={slideLeft} className='bg-white absolute bottom-[50%] left-0 opacity-50 hover:opacity-100 group-hover:block hidden rounded-full'
    />
      <div id = {'carousel' + carouselID} 
      className='w-full h-full overflow-x-scroll whitespace-nowrap scroll-smooth scrollbar-hide relative'>
 
      {movies.map((movie, id) => (
          <Titles key = {id} movie = {movie} />
      ))}
      </div>
      <MdChevronRight onClick={slideRight} className='bg-white absolute right-4 bottom-[50%] opacity-50 hover:opacity-100 group-hover:block hidden   rounded-full' />
    </div>
    
 </>
  )
}

export default Row