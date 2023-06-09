import React from 'react'
import { Container } from '@material-ui/core';

import Navbar from './components/Navbar/navbar';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Home from './components/Home/Home';
import Auth from './components/Auth/Auth';

const App = () => {

    return (
        <>
        <BrowserRouter>
        <Container maxWidth="lg">
                <Navbar />
                <Routes>
                    <Route path='/' Component={Home}/>
                    <Route path='/auth' Component={Auth}></Route>
                </Routes>
            </Container>
        </BrowserRouter>
      
        </>
    )
}

export default App;