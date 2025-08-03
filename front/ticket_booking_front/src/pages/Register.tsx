import {type FormEvent, useState} from "react";
import api from "../services/api.ts";
import type {AxiosError} from "axios";


function Register() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleRegister = async (e: FormEvent) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        if (password != confirmPassword) {
            setError("Password doesn't match");
            return;
        }

        try {
            await api.post('/register/', { username, email, password});
            setSuccess('Registration successful! You can now log in');
        } catch (error) {
            const err = error as AxiosError<{ detail?: string; email?: string[]; username?: string[] }>;
            const data = err.response?.data;
            setError(data?.detail || data?.email?.[0] || data?.username?.[0] || 'Registration failed');
        }
    }

    return (
        <div className="flex items-center justify-center min-h-screen rounded-lg">
            <form onSubmit={handleRegister} className="flex flex-col gap-5 items-center justify-center
                                                 bg-white rounded-2xl w-full max-w-md p-10">

                <h2 className="text-4xl font-bold text-amber-950 text-center">Register</h2>

                {error && <p className="text-red-800 text-center text-lg">{error}</p>}
                {success && <p className="text-green-700 text-center text-lg">{success}</p>}

                <input
                    className={"w-full rounded-lg p-3 border-amber-800 border-2 mt-5"}
                    type="text"
                    name="username"
                    placeholder="Enter your username"
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                    required
                />

                <input
                    className={"w-full rounded-lg p-3 border-amber-800 border-2"}
                    type="email"
                    name="email"
                    placeholder="Enter your email address"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required
                />

                <input
                    className={"w-full rounded-lg p-3 border-amber-800 border-2"}
                    type="password"
                    name="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    required
                />

                <input
                    className={"w-full rounded-lg p-3 border-amber-800 border-2"}
                    type="password"
                    name="confirm-password"
                    placeholder="Enter your password (again)"
                    value={confirmPassword}
                    onChange={e => setConfirmPassword(e.target.value)}
                    required
                />

                <button
                    type="submit"
                    className={"w-full rounded-lg p-3 border-amber-800 border-2 " +
                        "bg-white hover:bg-orange-200 cursor-pointer focus:outline-none " +
                        "focus:shadow-outline mt-5"}>
                    Register
                </button>

                <a  href="/login"
                    className="text-base mt-10 text-center
                    hover:text-blue-800">
                    I've already had an account.
                </a>

            </form>
        </div>
    );
}

export default Register;