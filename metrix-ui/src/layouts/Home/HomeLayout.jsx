import React from 'react'
import { Route, BrowserRouter as Router, Routes, Outlet } from 'react-router-dom'
import AppNavBar from '../../components/AppBar/AppBar'
function Home(props) {

  return <div className='home-page'>
    <br /> <br /> <br /> <br />
    <AppNavBar />
    <div style={{padding:"2%"}}>
      <div>
        <Outlet />
      </div>
    </div>
    <div />
  </div>
}

export default Home