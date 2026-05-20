import { useEffect, useState } from 'react';
import api from '../api/axios';

export default function Dashboard() {
  const [stats, setStats] = useState(null);
  const [err, setErr] = useState('');
  useEffect(() => {
    api.get('/dashboard/stats').then(r => setStats(r.data)).catch(e => setErr(e.message));
  }, []);
  if (err) return <p className="error">{err}</p>;
  if (!stats) return <p>Loading…</p>;
  return (
    <div>
      <h2>Dashboard</h2>
      <div className="grid">
        <div className="card"><h3>Projects</h3><p className="big">{stats.totalProjects}</p></div>
        <div className="card"><h3>Tasks</h3><p className="big">{stats.totalTasks}</p></div>
        <div className="card">
          <h3>By Status</h3>
          <ul>{stats.byStatus.map(s => <li key={s._id}>{s._id}: {s.count}</li>)}</ul>
        </div>
      </div>
    </div>
  );
}
