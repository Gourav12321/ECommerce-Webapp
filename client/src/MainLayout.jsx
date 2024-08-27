import React from 'react'
import Navbar from './Component/Navbar'

function MainLayout({children}) {
  return (
    <div>
      <div className='fixed w-full z-50'>
        <Navbar/>
        </div>
    <div className=' h-full w-full pt-[4rem] lg:px-[3rem] px-4 z-0 bg-slate-100'>
        {children}
    </div>
    </div>
  )
}

export default MainLayout