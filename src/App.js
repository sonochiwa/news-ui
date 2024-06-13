import './App.css';
import MainPage from "./pages/MainPage";
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import React from 'react';
import ProfilePage from "./pages/ProfilePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import styled from "styled-components";
import CreateNewPage from "./pages/CreateNewPage";

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <Routes>
                    <Route path="/*" element={<MainPage/>}/>
                    <Route path="/profile" element={<ProfilePage/>}/>
                    <Route path="/sign-in" element={<LoginPage/>}/>
                    <Route path="/sign-up" element={<RegisterPage/>}/>
                    <Route path="/create-new" element={<CreateNewPage/>}/>
                </Routes>
            </BrowserRouter>
            <div className="footer">
                <hr style={{backgroundColor: "#6c6c6c", height: 2, border: "none"}}/>
                <footer style={{color: "#d0d0d0"}}>Обратная связь: news4you@gmail.com</footer>
            </div>
            <Fix id={"fix"}/>
        </div>
    );
}

const Fix = styled.div`
    height: 24px;
`

export default App;


