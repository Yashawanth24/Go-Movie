import React from 'react'

const VideoTitle = ({title,overview}) => {
  return (
    <div>
         <div className='w-screen aspect-video pt-[28%] px-36 absolute' >
    <h1 className='text-5xl font-bold'>{title}</h1>
    <p className=' py-6 text-lg w-1/3'>{overview}</p>
    <div className=''>
        <button className='bg-white hover:opacity-70 text-black font-bold text-xl py-3 px-12 justify-center'>
           ▶Play
        </button>
    </div>
    </div>
    </div>
  )
}

export default VideoTitle