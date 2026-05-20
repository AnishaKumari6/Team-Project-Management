import { useEffect, useState } from 'react';
import api from '../api/axios';

const STATUSES = ['todo', 'in_progress', 'done'];

export default function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [projects, setProjects] = useState([]);
  const [form, setForm] = useState({ title: '', project: '', status: 'todo', priority: 'medium' });
  const [err, setErr] = useState('');

  const load = async () => {
    try {
      const [t, p] = await Promise.all([api.get('/tasks'), api.get('/projects')]);
      setTasks(t.data); setProjects(p.data);
    } catch (e) { setErr(e.message); }
  };
  useEffect(() => { load(); }, []);

  const create = async (e) => {
    e.preventDefault();
    if (!form.project) return setErr('Pick a project');
    await api.post('/tasks', form);
    setForm({ title: '', project: '', status: 'todo', priority: 'medium' }); load();
  };
  const updateStatus = async (id, status) => { await api.put(`/tasks/${id}`, { status }); load(); };
  const remove = async (id) => { await api.delete(`/tasks/${id}`); load(); };

  return (
    <div>
      <h2>Tasks (Workflow)</h2>
      <form onSubmit={create} className="form row">
        <input placeholder="Title" value={form.title} onChange={e => setForm({...form, title: e.target.value})} required />
        <select value={form.project} onChange={e => setForm({...form, project: e.target.value})}>
          <option value="">Select project</option>
          {projects.map(p => <option key={p._id} value={p._id}>{p.name}</option>)}
        </select>
        <select value={form.priority} onChange={e => setForm({...form, priority: e.target.value})}>
          <option value="low">Low</option><option value="medium">Med</option><option value="high">High</option>
        </select>
        <button className="btn">Add task</button>
      </form>
      {err && <p className="error">{err}</p>}
      <div className="board">
        {STATUSES.map(s => (
          <div key={s} className="column">
            <h3>{s.replace('_', ' ')}</h3>
            {tasks.filter(t => t.status === s).map(t => (
              <div key={t._id} className="card">
                <strong>{t.title}</strong>
                <p className="muted">priority: {t.priority}</p>
                <div className="row">
                  <select value={t.status} onChange={e => updateStatus(t._id, e.target.value)}>
                    {STATUSES.map(x => <option key={x}>{x}</option>)}
                  </select>
                  <button className="btn-ghost" onClick={() => remove(t._id)}>✕</button>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
