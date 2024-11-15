import { useState } from 'react';
import supabase from '../utils/supabaseClient';
import { toast } from 'react-toastify';

export default function LoginButton({ setUser }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      console.error("Login error:", error.message);
      alert("Login failed!");
    } else {
      console.log("Logged in as:", data.user);
      setUser(data.user);
      toast.success('Login successful!');
    }
  };

  return (
    <div>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button className="login-button" onClick={handleLogin}>Log In</button>
    </div>
  );
}
