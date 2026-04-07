import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Mail, Lock, User, ArrowRight } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import './Pages.css'

export default function Register() {
  const navigate = useNavigate()
  const { register } = useAuth()
  const [form, setForm] = useState({ username: '', email: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      await register(form.username, form.email, form.password)
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
        <h2>Create Account</h2>
        <p>Join the AI-powered script analysis platform</p>

        {error && <div style={{ color: '#ef4444', background: 'rgba(239,68,68,0.1)', padding: '0.8rem', borderRadius: '8px', marginBottom: '1rem', fontSize: '0.9rem' }}>{error}</div>}

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="input-group">
            <User size={18} className="input-icon" />
            <input type="text" placeholder="Username" required value={form.username} onChange={e => setForm({ ...form, username: e.target.value })} />
          </div>
          <div className="input-group">
            <Mail size={18} className="input-icon" />
            <input type="email" placeholder="Email Address" required value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
          </div>
          <div className="input-group">
            <Lock size={18} className="input-icon" />
            <input type="password" placeholder="Password (min 6 chars)" required minLength={6} value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} />
          </div>
          <button type="submit" className="btn-primary auth-btn" disabled={loading}>
            {loading ? 'Creating Account...' : <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>Sign Up <ArrowRight size={18} /></span>}
          </button>
        </form>
        <div className="auth-footer">
          Already have an account? <span onClick={() => navigate('/login')}>Sign in here</span>
        </div>
      </div>
    </div>
  )
}
