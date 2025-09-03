import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

export default function Signup() {
  const { signup } = useAuth();
  const nav = useNavigate();
  const [name, setName] = useState("");       
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    setErr("");
    try {
      await signup(name, email, password);   
      nav("/");
    } catch (e) {
      setErr(e?.response?.data?.detail || "Sign up failed");
    }
  };

  return (
    <div className="max-w-sm mx-auto mt-10 bg-gray-50 dark:bg-zinc-900 p-6 rounded-2xl shadow">
      <h1 className="text-xl text-zinc-900 dark:text-zinc-100 font-semibold mb-4">Sign up</h1>
      <form onSubmit={onSubmit} className="space-y-3">
        <input
          className="w-full border p-2 rounded  text-zinc-900 dark:text-zinc-100 "
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          className="w-full border p-2 rounded  text-zinc-900 dark:text-zinc-100 "
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="w-full border p-2 rounded  text-zinc-900 dark:text-zinc-100 "
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {err && <p className="text-red-600 text-sm">{err}</p>}
        <button className="w-full rounded bg-black dark:text-white py-2">Create account</button>
      </form>
      <p className="text-sm mt-3  text-zinc-900 dark:text-zinc-100 ">
        Already have an account? <Link to="/login" className="underline">Log in</Link>
      </p>
    </div>
  );
}
