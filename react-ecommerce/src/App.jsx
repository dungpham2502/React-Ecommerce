import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Navbar from './components/Navbar';
import SignUp from './pages/Signup';
import Marketplace from './pages/Marketplace';
import About from './pages/About';
import Sell from './pages/Sell';

function App() {
    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path='/' element={<Marketplace />} />
                <Route path='/signup' element={<SignUp />} />
                <Route path='/marketplace' element={<Marketplace />} />
                <Route path='/sell' element={<Sell />} />
                <Route path='/about' element={<About />} />
            </Routes>
       </Router> 
    )
}
export default App
