import {useEffect, useState} from "react";
import type {TransportType} from "./Transport.tsx";
import axios, {type AxiosError} from "axios";
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


    const payFor = (booking: BookingType) => {

        const token = localStorage.getItem("token");

        return async () => {
            try {
                await axios.post('http://localhost:8000/api/payment/', {
                    booking: booking.id,
                    payment_method: 'wallet',
                    amount: booking.transport.price

                }, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                });

                window.location.reload();

            } catch (error) {
                const err = error as AxiosError<{ detail?: string; email?: string[]; username?: string[] }>;
                const data = err.response?.data;
                setError(data?.detail || data?.email?.[0] || data?.username?.[0] || 'Payment failed.');
            }
        }
    }

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
                  {
                      !booking.is_paid
                      &&
                      <button
                          className="rounded-xl p-4 border-2 border-amber-800  bg-white
                                     hover:bg-green-400 cursor-pointer focus:outline-none
                                     focus:shadow-outline mt-5"
                          onClick={payFor(booking)}>
                          Pay
                      </button>
                  }
              </div>
          )}
      </div>
    );
}

export default BookingList;