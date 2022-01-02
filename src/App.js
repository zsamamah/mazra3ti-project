import Nav from './Components/NavBar/Nav';
import { Route, Routes } from 'react-router-dom';
import Home from './Components/Home/Home';
import Register from './Components/Register/Register';
import Login from './Components/Login/Login';
import Footer from './Components/Footer/Footer';
import Farm from './Components/Farm/Farm';
import './App.css';
import Farms from './Components/Farms/Farms';

function App() {
  // https://tillable.com/
  return (
    <>
    <Nav/>
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/register" element={<Register/>} />
      <Route path="/login" element={<Login/>} />
      <Route path="/farms" element={<Farms/>} />
      <Route path="/farm" element={<Farm/>} />
      <Route path="/checkout" element={null} />
    </Routes>
    <Footer/>
    </>
  );
}

export default App;
