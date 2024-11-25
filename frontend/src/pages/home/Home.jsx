import React from 'react'
import Banner from './Banner'
import Shop from './TopSellers'
import Recommened from './Recommened'
import News from './News'

const Home = () => {
  return (
    <>
        <Banner/>
        <Shop/>
        <Recommened/>
        <News/>
    </>
  )
}

export default Home