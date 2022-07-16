import Row from "../components/Row"
import Banner from '../components/Banner'
import requests from "../requests"

import React from 'react'

const Home = () => {
  return (
    <div>  
     <Banner />
    <Row title='NETFLIX ORIGINALS' fetchUrl={requests.fetchNetflixOriginals} carouselID ='1'/>
    <Row title='Trending Now' fetchUrl={requests.fetchTrending} carouselID ='2'/>
    <Row title='Top Rated' fetchUrl={requests.fetchTopRated} carouselID ='3'/>
    <Row title='Action' fetchUrl={requests.fetchActionMovies} carouselID ='4'/>
    <Row title='Comedy' fetchUrl={requests.fetchComedyMovies} carouselID ='5'/>
    <Row title='Horror' fetchUrl={requests.fetchHorrorMovies} carouselID ='6'/>
    <Row title='Romance' fetchUrl={requests.fetchRomanceMovies} carouselID ='7'/>
    </div>
  )
}

export default Home