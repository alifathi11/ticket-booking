import { useLocation } from "react-router";
import type { TransportType } from "./Transport.tsx";
import Booking from "./Booking.tsx";

function BookingWrapper() {
    const location = useLocation();

    const transport = location.state as TransportType;

    if (!transport) {
        return <p className="text-red-800 text-center">No transport data provided!</p>
    }

    return <Booking transport={transport} />;
}

export default BookingWrapper;