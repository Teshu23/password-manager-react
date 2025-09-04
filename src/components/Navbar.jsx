import React from 'react'

const Navbar = () => {
  return (
    <>
    <nav className='bg-slate-800'>
        <div className='mycontainer flex justify-between items-center px-4 py-5 h-14'>
            <div className='logo font-bold '>
                <span className='text-green-400'>&lt;</span>
                <span className='text-white'>PassOP</span>
                <span className='text-green-400'>/&gt;</span>
            </div>
        <ul>
            <li className='flex gap-4 text-white'>
                <a className='hover:font-bold' href="/">Home</a>
                <a className='hover:font-bold' href="/">About</a>
                <a className='hover:font-bold' href="/">Contact</a>
            </li>
        </ul>
        </div>
    </nav>
    </>
  )
}

export default Navbar
