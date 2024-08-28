import React from 'react'
import CategoryList from '../Product/CategoryList'
import  VerticalCardProduct  from '../Product/VerticalCardProduct';
import Home2 from '../Product/Home2';
function Home() {
  return (
    <div className='flex flex-col gap-5'>
      <CategoryList/>

      <div className='w-full flex flex-col gap-5'>
        <Home2/>
      </div>
    </div>
  )
}

export default Home