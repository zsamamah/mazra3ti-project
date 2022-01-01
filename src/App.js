import logo from './logo.png';
import './App.css';
import Nav from './Components/NavBar/Nav';
import { Route, Routes } from 'react-router-dom';
import Home from './Components/Home/Home';


function App() {
  // https://tillable.com/
  return (
    <>
    <Nav/>
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/register" element={null} />
      <Route path="/login" element={null} />
      <Route path="/farms" element={null} />
      <Route path="/singleFarm" element={null} />
      <Route path="/checkout" element={null} />
    </Routes>
    </>
  );
}

export default App;
