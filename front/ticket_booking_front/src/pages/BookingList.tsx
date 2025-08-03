import {useEffect, useState} from "react";
import type {TransportType} from "./Transport.tsx";
// import {useNavigate} from "react-router";
import axios from "axios";
import dayjs from "dayjs";

type PassengerType = {
    full_name: string;
    age: number;
    gender: "male" | "female" | "other";
}

export type BookingType = {
    id: number;
    transport: TransportType;
    passenger: PassengerType;
    seat_number: string;
    booking_date: string;
    is_paid: boolean;
}

function BookingList() {
    const [bookings, setBookings ] = useState<BookingType[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    // const navigate = useNavigate();

    useEffect(() => {

        const token = localStorage.getItem("token");

        axios.get("http://localhost:8000/api/booking/list/",
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                }
            }
            )
            .then((res) => {
                setBookings(res.data.results);
                setLoading(false);
            })
            .catch((err) => {
                setError(err.response.data);
                setLoading(false);
            })
    }, []);

    if (loading) return <p className="text-center mt-10">Loading booking data...</p>
    if (error) return <p className="text-center text-red-800 mt-10">{error}</p>

    return (
      <div className="p-6 grid grid-cols-1 gap-6">
          {bookings.map((booking) =>
              <div key={booking.id} className="bg-white shadow-lg rounded-xl p-4 space-y-2">
                  <h2 className="text-xl font-bold">
                      {booking.transport.origin} - {booking.transport.destination}
                  </h2>
                  <p className="text-center font-bold mt-10">Departure time: {dayjs(booking.transport.departure_time).format("MMMM D, YYYY, HH:mm")}</p>
                  <p className="text-center font-bold">Arrival time: {dayjs(booking.transport.arrival_time).format("MMMM D, YYYY, HH:mm")}</p>
                  <p className="text-center font-bold">Passenger: {booking.passenger.full_name}</p>
                  <p className="text-center font-bold">Seat: {booking.seat_number}</p>
                  <p className="text-center font-bold mt-10">Payment status: {booking.is_paid ? "Paid" : "Pending"}</p>
              </div>
          )}
      </div>
    );
}

export default BookingList;