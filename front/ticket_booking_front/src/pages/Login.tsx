import {type FormEvent, useState} from 'react';
import api from "../services/api.ts";
import type {AxiosError} from "axios";

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = async (e:FormEvent) => {
        e.preventDefault();
        setError('');
        
        try {
            const response = await api.post('http://localhost:8000/api/token/', { username, password });
            const token = response.data.access;
            localStorage.setItem('token', token);

            window.location.href = '/transport';
        } catch (error) {
            const err = error as AxiosError<{ detail?: string }>
            const data = err.response?.data;
            setError(data?.detail || 'Login failed');
        }
    }

    return (
      <div className="flex items-center justify-center min-h-screen rounded-lg">
          <form onSubmit={handleLogin} className="flex flex-col gap-5 items-center justify-center
                                                 bg-white rounded-2xl w-full max-w-md p-10">

              <h2 className="text-4xl font-bold text-amber-950 text-center">Login</h2>

              {error && <p className="text-red-800 text-center text-lg">{error}</p>}

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
                  type="password"
                  name="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  required
              />

              <button
                  type="submit"
                  className={"w-full rounded-lg p-3 border-amber-800 border-2 " +
                             "bg-white hover:bg-orange-200 cursor-pointer focus:outline-none " +
                             "focus:shadow-outline mt-5"}>
                  Login
              </button>

              <a  href="/register"
                  className="text-base mt-10 text-center
                   hover:text-blue-800">
                  I don't have an account.
              </a>

          </form>
      </div>
    );
}


export default Login;