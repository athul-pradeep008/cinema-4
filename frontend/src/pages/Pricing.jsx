import { useNavigate } from 'react-router-dom'
import { Check } from 'lucide-react'
import './Pages.css'

export default function Pricing() {
  const navigate = useNavigate()
  
  return (
    <div className="marketing-layout">
      <nav className="marketing-nav">
        <div className="brand-logo" onClick={() => navigate('/')}>CINE·AI</div>
        <div className="marketing-nav-links">
          <span onClick={() => navigate('/')}>Home</span>
          <span onClick={() => navigate('/login')}>Login</span>
        </div>
      </nav>

      <section className="pricing-section">
        <div className="pricing-header">
          <h1>Simple, Transparent Pricing</h1>
          <p>Built for solo writers and massive studios alike.</p>
        </div>

        <div className="pricing-grid">
          <div className="price-card">
            <h3>Creator</h3>
            <div className="price">$19<span>/mo</span></div>
            <ul className="features">
              <li><Check size={16}/> 10 Scripts / month</li>
              <li><Check size={16}/> Basic Regex Parsing</li>
              <li><Check size={16}/> Email Support</li>
            </ul>
            <button className="btn-outline" onClick={() => navigate('/login')}>Choose Creator</button>
          </div>
          
          <div className="price-card popular">
            <div className="popular-badge">Most Popular</div>
            <h3>Pro</h3>
            <div className="price">$49<span>/mo</span></div>
            <ul className="features">
              <li><Check size={16}/> Unlimited Scripts</li>
              <li><Check size={16}/> Advanced Scene AI</li>
              <li><Check size={16}/> Priority Support</li>
            </ul>
            <button className="btn-primary" onClick={() => navigate('/login')}>Choose Pro</button>
          </div>

          <div className="price-card">
            <h3>Studio</h3>
            <div className="price">$199<span>/mo</span></div>
            <ul className="features">
              <li><Check size={16}/> Unlimited API Access</li>
              <li><Check size={16}/> Custom NLP Models</li>
              <li><Check size={16}/> 24/7 Phone Support</li>
            </ul>
            <button className="btn-outline" onClick={() => navigate('/login')}>Contact Us</button>
          </div>
        </div>
      </section>
    </div>
  )
}
