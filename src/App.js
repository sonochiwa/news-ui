import './App.css';
import MainPage from "./pages/MainPage";
import {BrowserRouter, Routes, Route} from 'react-router-dom';

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<MainPage/>}/>
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;