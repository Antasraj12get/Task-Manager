import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = ({ setToken }) => {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await axios.post('http://localhost:5000/api/auth/register', form);
    localStorage.setItem('token', res.data.token);
    setToken(res.data.token);
    navigate('/dashboard');
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 max-w-sm mx-auto space-y-4">
      <input className="border p-2 w-full" placeholder="Name" onChange={(e) => setForm({ ...form, name: e.target.value })} />
      <input className="border p-2 w-full" placeholder="Email" onChange={(e) => setForm({ ...form, email: e.target.value })} />
      <input className="border p-2 w-full" type="password" placeholder="Password" onChange={(e) => setForm({ ...form, password: e.target.value })} />
      <button className="bg-blue-500 text-white p-2 w-full">Register</button>
    </form>
  );
};

export default Register;
