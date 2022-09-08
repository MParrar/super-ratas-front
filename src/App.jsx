import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Home } from './pages/Home';
import { UserLogin } from './pages/UserLogin';
import UserState from './context/user/userState';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <UserState>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="login" element={<UserLogin />} />
        </Routes>
      </BrowserRouter>
    </UserState>


  );
}

export default App;
