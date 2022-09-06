import './App.css';
import { Navbar } from './components/Navbar/Navbar';
import { Body } from './components/Body/Body';
import { ListCard } from './components/Card/ListCard';
import CardState from './context/card/cardState'
import { Browser } from './components/Browser/Browser';
import 'bootstrap/dist/css/bootstrap.min.css';
import UserState from './context/user/userState';
import CategoryState from './context/category/categoryState';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Home } from './pages/Home';
import { Login } from './components/User/Login';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="login" element={<Login />} />
      </Routes>
    </BrowserRouter>

  );
}

export default App;
