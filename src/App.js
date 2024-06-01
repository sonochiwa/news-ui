import './App.css';
import MainPage from "./pages/MainPage";
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import React from 'react';
import ProfilePage from "./pages/ProfilePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import styled from "styled-components";

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <Routes>
                    <Route path="/*" element={<MainPage/>}/>
                    <Route path="/profile" element={<ProfilePage/>}/>
                    <Route path="/sign-in" element={<LoginPage/>}/>
                    <Route path="/sign-up" element={<RegisterPage/>}/>
                </Routes>
            </BrowserRouter>
            <Fix/>
        </div>
    );
}

const Fix = styled.div`
    height: 24px;
`

export default App;


