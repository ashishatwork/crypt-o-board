import React from 'react'
import Carousel from './Carousel'

const Banner = () => {
  return (
    <div className=' banner'>
      <div className='container banner-content'>
        <div className='intro-text ' >
          <h1 className='display-4 font-weight-bold'>
            CRYPT-O-BOARD...
          </h1>
          <p className='lead '>
            The perfect place to keep track of all your favourite crypto exchanges.
          </p>
        </div>
        <Carousel/>
      </div>

    </div>
  )
}

export default Banner