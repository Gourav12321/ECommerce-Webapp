import React from 'react'
import CategoryList from '../Product/CategoryList'
import  VerticalCardProduct  from '../Product/VerticalCardProduct';
function Home() {
  return (
    <div className='flex flex-col gap-5'>
      <CategoryList/>

      <div className='w-full flex flex-col gap-5'>
        <VerticalCardProduct heading="Women" categoryName="Women"/>
        <VerticalCardProduct heading="Men & Women" categoryName="Men & Women"/>
      </div>
    </div>
  )
}

export default Home