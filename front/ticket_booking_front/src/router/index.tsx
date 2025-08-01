import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from '../pages/Login';
import Register from "../pages/Register.tsx";
import Transport from "../pages/Transport.tsx";
import BookingWrapper from "../pages/BookingWrapper.tsx";


const AppRouter = () => {
    return (
      <Router>
          <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/transport" element={<Transport />} />
              <Route path="/booking/:id" element={<BookingWrapper />} />
          </Routes>
      </Router>
    );
};

export default AppRouter;