import React from 'react'
import { IMG_CON_URL } from './Constants'

const MovieCard = ({posterPath}) => {
  return (
    <div className='w-48 pr-4'>
        <img alt='Poster' src={IMG_CON_URL+posterPath}/>
    </div>
  )
}

export default MovieCard