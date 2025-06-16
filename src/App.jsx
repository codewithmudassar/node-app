import React from 'react'
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom'
import Home from './pages/Home'
import Not from './pages/Not'
import Blog from './pages/Blog'
import About from './pages/About'
import Navbar from './components/Navbar'
import Create from './pages/Create'
import SingleBlog from './pages/SingleBlog'
import Footer from './components/Footer'
import Update from './pages/Update'

const App = () => {
  return (
    <>
      <Router>
        <Navbar/>

        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/about' element={<About/>} />
          <Route path='/blog' element={<Blog/>} />
          <Route path='/blog/:id' element={<SingleBlog/>} />
          <Route path='/blog/update/:id' element={<Update/>} />
          <Route path='/createblog' element={<Create/>} />
          <Route path='*' element={<Not/>} />
        </Routes>
        <Footer/>
      </Router>
    </>
  )
}

export default App
