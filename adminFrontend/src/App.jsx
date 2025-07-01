import React from 'react'
import Navbar from './components/Navbar/Navbar'
import Sidebar from './components/Sidebar/Sidebar'
import {Routes,Route, Router} from 'react-router-dom'
import Add from './screens/Add/Add'
import List from './screens/List/List'
import Orders from './screens/Orders/Orders'
import './App.css'
import { ToastContainer } from 'react-toastify';

const url = 'https://foodprepadmin-3tzf.onrender.com'

const App = () => {
  return (
    <div className='app'>
      <ToastContainer/>
      <>
      <Navbar />
      <hr />
      <div className='app-content'>
          <Sidebar />
          <Routes>
            <Route path="/" element={<Add url={url}/>} />
            <Route path="/add" element={<Add url={url}/>} />
            <Route path="/list" element={<List url={url}/>} />
            <Route path="/orders" element={<Orders url={url}/>} />
          </Routes>
      </div>
      
      </>
    </div>
  )
}

export default App