import { useState, useEffect } from "react";
import axios from "axios";
import dayjs from "dayjs";
import {useNavigate} from "react-router";

export type TransportType = {
    id: number;
    type: "flight" | "bus" | "train";
    origin: string;
    destination: string;
    departure_time: string;
    arrival_time: string;
    price: number;
}


function Transport() {
    const [transports, setTransports] = useState<TransportType[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const navigate = useNavigate();

    const bookTransport = (transport: TransportType) => {
        return () => {
            navigate(`/booking/${transport.id}`, { state: transport });
        }
    }

    useEffect(() => {
        axios.get("http://localhost:8000/api/transport/")
            .then((res => {
                setTransports(res.data.results);
                setLoading(false)
            }))
            .catch(err => {
                setError(err.response.data);
                setLoading(false);
            });
    }, []);

    if (loading) return <p className="text-center mt-10">Loading transports...</p>
    if (error) return <p className="text-center text-red-800 mt-10">{error}</p>

    return (
        <div className="p-6 grid grid-cols-1 gap-6">
            {transports.map((transport: TransportType) => (
                <div key={transport.id} className="bg-white shadow-lg rounded-xl p-4 space-y-2">
                    <h2 className="text-xl font-bold">
                        {transport.origin} - {transport.destination}
                    </h2>
                    <p className="text-center font-bold mt-10">Departure time: {dayjs(transport.departure_time).format("MMMM D, YYYY, HH:mm")}</p>
                    <p className="text-center font-bold">Arrival time: {dayjs(transport.arrival_time).format("MMMM D, YYYY, HH:mm")}</p>
                    <p className="text-center font-bold mt-10">Price: {transport.price}$</p>
                    <button
                        className="border-2 border-amber-900 rounded-xl bg-white p-4 mt-3 cursor-pointer hover:bg-yellowcd-100"
                        onClick={bookTransport(transport)}>
                        Book now!
                    </button>
                </div>
            ))}
        </div>
    )
}

export default Transport;