import { Toolbar } from '@mui/material'
import type { NextPage } from 'next'
import Header from '../components/Header'
import StreamsGrid from '../components/StreamsGrid'

const Home: NextPage = () => {
  return (
    <>
      <Header />
      <Toolbar />
      <StreamsGrid />
    </>
  )
}

export default Home
