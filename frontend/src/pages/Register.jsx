import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

export default function Register() {
  const { register, loading } = useAuth();
  const nav = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', password: '', role: 'member' });
  const [err, setErr] = useState('');
  const submit = async (e) => {
    e.preventDefault(); setErr('');
    try { await register(form); nav('/'); }
    catch (e) { setErr(e.response?.data?.message || 'Register failed'); }
  };
  return (
    <div className="card narrow">
      <h2>Register</h2>
      <form onSubmit={submit} className="form">
        <input placeholder="Name" value={form.name} onChange={e => setForm({...form, name: e.target.value})} />
        <input placeholder="Email" value={form.email} onChange={e => setForm({...form, email: e.target.value})} />
        <input type="password" placeholder="Password" value={form.password} onChange={e => setForm({...form, password: e.target.value})} />
        <select value={form.role} onChange={e => setForm({...form, role: e.target.value})}>
          <option value="member">Member</option>
          <option value="manager">Manager</option>
          <option value="admin">Admin</option>
        </select>
        {err && <p className="error">{err}</p>}
        <button disabled={loading} className="btn">{loading ? '...' : 'Create account'}</button>
      </form>
      <p className="muted">Have an account? <Link to="/login">Login</Link></p>
    </div>
  );
}
