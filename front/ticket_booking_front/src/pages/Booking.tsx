import type {TransportType} from "./Transport.tsx";
import dayjs from "dayjs";
import axios, {type AxiosError} from "axios";
import { useState } from "react";

type Gender = "male" | "female" | "other";

function Booking({ transport }: { transport: TransportType }) {

    const [fullName, setFullName] = useState("");
    const [age, setAge] = useState<number | undefined>();
    const [gender, setGender] = useState<Gender | "">("other");

    const buyTransport = async () => {
        const token = localStorage.getItem("token");
        if (!token) {
            alert("You are not logged in!");
            return;
        }

        try {
            await axios.post(
                "http://localhost:8000/api/booking/",
                {
                    transport: transport,
                    passenger: {
                        fullName: fullName,
                        age: age,
                        gender: gender,
                    },
                    seatNumber: 10,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    }
                }
            );

            alert("Booking successful!");

        } catch (error) {
            const err = error as AxiosError<{ detail?: string }>
            if (err.response?.status === 401) {
                alert("Session expired. Please log in again.");
            } else {
                alert("Booking failed!");
            }
            console.log(error);
        }
    };

    return (
        <div className="rounded-xl bg-white p-2 flex gap-5">
            <div className="flex flex-col gap-3 justify-center items-start flex-1/2 w-full p-10">
                <h2 className="text-2xl ">{transport.origin} - {transport.destination}</h2>
                <p className="text-center font-bold mt-10">Departure time: {dayjs(transport.departure_time).format("MMMM D, YYYY, HH:mm")}</p>
                <p className="text-center font-bold">Arrival time: {dayjs(transport.arrival_time).format("MMMM D, YYYY, HH:mm")}</p>
                <p className="text-center font-bold">Price: {transport.price}$</p>
            </div>
            <div className="flex-1/2">
                <form className="flex flex-col gap-5 justify-center items-start w-full">
                    <div className="flex flex-col gap-2 justify-center items-start w-full">
                        <label className="text-lg" htmlFor="name">Enter passenger's name:</label>
                        <input
                            className="p-3 bg-white border-2 border-black rounded-lg"
                            name="name"
                            id="name"
                            type="text"
                            onChange={(e) => setFullName(e.target.value)}
                        />
                    </div>
                    <div className="flex flex-col gap-2 justify-center items-start w-full">
                        <label className="text-lg" htmlFor="age">Enter passenger's age:</label>
                        <input
                            className="p-3 bg-white border-2 border-black rounded-lg"
                            name="age"
                            id="age"
                            type="number"
                            onChange={(e) => {setAge(Number(e.target.value))}}
                        />
                    </div>
                    <div className="flex flex-col gap-2 justify-center items-start w-full">
                        <label className="text-lg" htmlFor="gender">Enter passenger's gender:</label>
                        <select
                            onChange={(e) => {setGender(e.target.value.toLowerCase() as Gender)}}
                            className="p-3 bg-white border-2 border-black rounded-lg w-full"
                            name="gender"
                            id="gender"
                        >
                            <option value="" disabled>Select</option>
                            <option value="MALE">Male</option>
                            <option value="FEMALE">Female</option>
                            <option value="OTHER">Other</option>
                        </select>
                    </div>
                    <button
                        type="submit"
                        className="border-2 border-amber-700 bg-white rounded-xl p-2 mt-10 w-50
                                hover:bg-yellow-100 cursor-pointer"
                        onClick={buyTransport}>
                        Buy
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Booking;