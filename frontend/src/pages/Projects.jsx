import { useEffect, useState } from 'react';
import api from '../api/axios';

export default function Projects() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState({ name: '', description: '' });
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState('');

  const load = () => {
    setLoading(true);
    api.get('/projects').then(r => setItems(r.data)).catch(e => setErr(e.message)).finally(() => setLoading(false));
  };
  useEffect(load, []);

  const create = async (e) => {
    e.preventDefault();
    await api.post('/projects', form);
    setForm({ name: '', description: '' }); load();
  };
  const remove = async (id) => { await api.delete(`/projects/${id}`); load(); };

  return (
    <div>
      <h2>Projects</h2>
      <form onSubmit={create} className="form row">
        <input placeholder="Name" value={form.name} onChange={e => setForm({...form, name: e.target.value})} required />
        <input placeholder="Description" value={form.description} onChange={e => setForm({...form, description: e.target.value})} />
        <button className="btn">Add</button>
      </form>
      {err && <p className="error">{err}</p>}
      {loading ? <p>Loading…</p> : (
        <ul className="list">
          {items.map(p => (
            <li key={p._id} className="card">
              <div><strong>{p.name}</strong><p className="muted">{p.description}</p></div>
              <button className="btn-ghost" onClick={() => remove(p._id)}>Delete</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
