import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from '../pages/Login';
import Register from "../pages/Register.tsx";
import Transport from "../pages/Transport.tsx";
import BookingWrapper from "../pages/BookingWrapper.tsx";
import BookingList from "../pages/BookingList.tsx";
import Main from "../pages/Main.tsx";


const AppRouter = () => {
    return (
      <Router>
          <Routes>
              <Route path="/" element={<Main />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/transport" element={<Transport />} />
              <Route path="/booking/:id" element={<BookingWrapper />} />
              <Route path="/booking/list" element={<BookingList />} />
          </Routes>
      </Router>
    );
};

export default AppRouter;