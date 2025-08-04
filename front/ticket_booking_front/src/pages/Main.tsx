import {useNavigate} from "react-router";
import {useEffect} from "react";
import axios from "axios";

function Main() {

    const navigate = useNavigate();

    useEffect(() => {
       const token = localStorage.getItem('token');

       if (!token) {
           navigate('login/');
       }

       axios.get('http://localhost:8000/api/token/validate/', {
           headers: {
               Authorization: `Bearer ${token}`,
           }
       })
       .then(() => {

       })
       .catch(() => {
           localStorage.removeItem('token');
           navigate('login/');
       });
    });

    return (
      <div className="flex flex-col gap-5 justify-center items-center w-full min-h-screen
                      bg-white rounded-4xl">
          <button
              className="border-2 border-amber-900 rounded-xl bg-white p-4 cursor-pointer
                        hover:bg-orange-200 focus:outline-none focus:shadow-outline w-50"
              onClick={() => { navigate('transport/'); }}>
              Transports
          </button>
          <button
              className="border-2 border-amber-900 rounded-xl bg-white p-4 cursor-pointer
                        hover:bg-orange-200 focus:outline-none focus:shadow-outline w-50"
              onClick={() => { navigate('booking/list/') }}>
              Bookings
          </button>
          <button
              className="border-2 border-amber-900 rounded-xl bg-white p-4 mt-5 cursor-pointer
                        hover:bg-orange-200 focus:outline-none focus:shadow-outline w-50"
              onClick={() => {
                  localStorage.removeItem('token');
                  window.location.href = '/login/';
                }
              }>
              Logout
          </button>
      </div>
    );
}

export default Main;