import { Routes, Route } from "react-router-dom";
import Login from './views/login/login';
import Register from './views/register/register';
import Home from './views/home/home';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/register" element={<Register/>}/>
      <Route path="/home" element={<Home/>}/>
    </Routes>
  );
}

export default App;
