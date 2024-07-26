import React from 'react'
import { Link  } from 'react-scroll'

const Header = () => {
  return (
    <div className='flex flex-row justify-between items-center p-6 bg-blue-800 shadow-md shadow-slate-400'>
      <div className='w-12'>
        <img alt='logo' src='Logo.png' />
      </div>
      <nav>
        <ul className='flex space-x-6 text-white'>
          <li>Home</li>
          <Link
          to="NowPlaying"
          spy={true}
          smooth={true}
          offset={-80}
          duration={500}
        >
          <li className='cursor-pointer'>Now Playing</li>
          </Link>
          <Link
          to="Trending"
          spy={true}
          smooth={true}
          offset={-80}
          duration={500}
        >
          <li className='cursor-pointer'>
            Trending
          </li>

          </Link>
          <Link
          to="Popular"
          spy={true}
          smooth={true}
          offset={-80}
          duration={500}
        >
          <li className='cursor-pointer'>Popular</li>
</Link>
        </ul>
      </nav>
    </div>
  )
}

export default Header
