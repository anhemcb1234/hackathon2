import './App.css';
import Add from "./pages/todos/Add";
import Edit from "./pages/todos/Edit";
import Login from "./pages/Login";
import Signin from './pages/SignIn'
import {
    Route,
    Routes,
    BrowserRouter
} from "react-router-dom";
function App() {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Login/>}/>
                    <Route path="/signin" element={<Signin/>}/>
                    <Route path="/add" element={<Add/>}/>
                    <Route path="/edit" element={<Edit/>}/>
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;
