import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';

export default function Navbar() {
  const { user, logout } = useAuth();
  const { dark, toggle } = useTheme();
  const nav = useNavigate();
  return (
    <nav className="navbar">
      <Link to="/" className="brand">TPMS</Link>
      <div className="links">
        {user && <>
          <Link to="/">Dashboard</Link>
          <Link to="/projects">Projects</Link>
          <Link to="/tasks">Tasks</Link>
        </>}
      </div>
      <div className="actions">
        <button onClick={toggle} className="btn-ghost">{dark ? '☀️' : '🌙'}</button>
        {user ? (
          <>
            <span className="muted">{user.name} ({user.role})</span>
            <button className="btn" onClick={() => { logout(); nav('/login'); }}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login" className="btn-ghost">Login</Link>
            <Link to="/register" className="btn">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}
