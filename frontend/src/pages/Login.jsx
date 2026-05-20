import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

export default function Login() {
  const { login, loading } = useAuth();
  const nav = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [err, setErr] = useState('');
  const submit = async (e) => {
    e.preventDefault(); setErr('');
    try { await login(form.email, form.password); nav('/'); }
    catch (e) { setErr(e.response?.data?.message || 'Login failed'); }
  };
  return (
    <div className="card narrow">
      <h2>Login</h2>
      <form onSubmit={submit} className="form">
        <input placeholder="Email" value={form.email} onChange={e => setForm({...form, email: e.target.value})} />
        <input type="password" placeholder="Password" value={form.password} onChange={e => setForm({...form, password: e.target.value})} />
        {err && <p className="error">{err}</p>}
        <button disabled={loading} className="btn">{loading ? '...' : 'Login'}</button>
      </form>
      <p className="muted">No account? <Link to="/register">Register</Link></p>
    </div>
  );
}
