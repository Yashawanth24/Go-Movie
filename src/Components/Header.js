import React from 'react'

const Header = () => {
  return (
    <div className='flex flex-row justify-between items-center p-6 shadow-md shadow-slate-400'>
      <div className='w-12'>
        <img alt='logo' src='Logo.png' />
      </div>
      <nav>
        <ul className='flex space-x-6'>
          <li>Home</li>
          <li>About</li>
          <li>Contact</li>
        </ul>
      </nav>
    </div>
  )
}

export default Header
