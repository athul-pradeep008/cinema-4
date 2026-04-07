import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Mail, Lock, ArrowRight } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import './Pages.css'

export default function Login() {
  const navigate = useNavigate()
  const { login } = useAuth()
  const [form, setForm] = useState({ username: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      await login(form.username, form.password)
      navigate('/dashboard')
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="marketing-layout center-content">
      <div className="auth-card">
        <div className="brand-logo login-logo" onClick={() => navigate('/')}>CINE·AI</div>
        <h2>Welcome Back</h2>
        <p>Sign in to access your script dashboard</p>

        {error && <div style={{ color: '#ef4444', background: 'rgba(239,68,68,0.1)', padding: '0.8rem', borderRadius: '8px', marginBottom: '1rem', fontSize: '0.9rem' }}>{error}</div>}

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="input-group">
            <Mail size={18} className="input-icon" />
            <input type="text" placeholder="Username" required value={form.username} onChange={e => setForm({ ...form, username: e.target.value })} />
          </div>
          <div className="input-group">
            <Lock size={18} className="input-icon" />
            <input type="password" placeholder="Password" required value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} />
          </div>
          <button type="submit" className="btn-primary auth-btn" disabled={loading}>
            {loading ? 'Authenticating...' : <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>Sign In <ArrowRight size={18} /></span>}
          </button>
        </form>
        <div className="auth-footer">
          Don't have an account? <span onClick={() => navigate('/register')}>Sign up here</span>
        </div>
      </div>
    </div>
  )
}
