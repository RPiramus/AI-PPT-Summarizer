import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

export default function Login() {
  const { login } = useAuth();
  const nav = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    setErr("");
    try {
      await login(email, password);
      nav("/");
    } catch (e) {
      setErr(e?.response?.data?.detail || "Login failed");
    }
  };

  return (
    <div className="max-w-sm mx-auto mt-10 bg-white dark:bg-zinc-900 p-6 rounded-2xl shadow">
      <h1 className="text-xl  text-zinc-900 dark:text-zinc-100 font-semibold mb-4">Log in</h1>
      <form onSubmit={onSubmit} className="space-y-3">
        <input className="w-full border p-2 rounded  text-zinc-900 dark:text-zinc-100 " placeholder="Email"
               value={email} onChange={e=>setEmail(e.target.value)} />
        <input className="w-full border p-2 rounded  text-zinc-900 dark:text-zinc-100 " placeholder="Password" type="password"
               value={password} onChange={e=>setPassword(e.target.value)} />
        {err && <p className="text-red-600 text-sm">{err}</p>}
        <button className="w-full rounded bg-black  text-zinc-900 dark:text-zinc-100 py-2">Log in</button>
      </form>
      <p className="text-sm mt-3  text-zinc-900 dark:text-zinc-100 ">No account? <Link to="/signup" className="underline">Sign up</Link></p>
    </div>
  );
}
