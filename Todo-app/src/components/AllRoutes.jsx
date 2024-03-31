import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from '../Pages/Home'
import AddTask from '../Pages/AddTask'
import EditTask from '../Pages/EditTask'
import SingleTask from '../Pages/SingleTask'

const AllRoutes = () => {
  return (
     <Routes>
        <Route path='/'  element={<Home/>}/>
        <Route path='/create'  element={<AddTask/>}/>
        <Route path='/edit/:id'  element={<EditTask/>}/>
        <Route path='/task/:id'  element={<SingleTask/>}/>
     </Routes>
  )
}

export default AllRoutes