import { useNavigate } from 'react-router-dom'
import { Play, Star, ArrowRight } from 'lucide-react'
import clapboardImg from '../assets/clapboard.png'
import rajamouliImg from '../assets/rajamouli.png'
import lokeshImg from '../assets/lokesh.png'
import './Pages.css'

export default function Landing() {
  const navigate = useNavigate()
  
  return (
    <div className="marketing-layout">
      {/* Navbar */}
      <nav className="marketing-nav">
        <div className="brand-logo" onClick={() => navigate('/')}>CINE·AI</div>
        <div className="marketing-nav-links">
          <span onClick={() => navigate('/pricing')}>Pricing</span>
          <span onClick={() => navigate('/login')}>Login</span>
          <button className="btn-secondary" onClick={() => navigate('/login')}>Get Started</button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-glow"></div>
        <div className="hero-content-wrapper" style={{display: 'flex', alignItems: 'center', gap: '3rem', maxWidth: '1200px', zIndex: 1, position: 'relative', width: '100%', padding: '0 2rem'}}>
          <div className="hero-content" style={{textAlign: 'left', flex: 1, maxWidth: '600px'}}>
            <div className="badge">Major Project Release v2.0</div>
            <h1 style={{fontSize: '3.5rem', marginBottom: '1.5rem', fontWeight: 900, lineHeight: 1.1, color: '#fff'}}>The Ultimate AI-Powered <br/><span style={{background: 'linear-gradient(135deg, var(--secondary), var(--primary))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text'}}>Script Analysis</span> Platform</h1>
            <p style={{fontSize: '1.2rem', color: 'var(--text-muted)', marginBottom: '2.5rem', lineHeight: 1.6}}>Transform your raw screenplays into actionable production data instantly. Over 10,000+ scenes parsed globally.</p>
            <div className="hero-actions" style={{justifyContent: 'flex-start'}}>
              <button className="btn-primary" onClick={() => navigate('/dashboard')}>Try Demo <ArrowRight size={18} /></button>
              <button className="btn-outline" onClick={() => navigate('/pricing')}><Play size={18} /> View Pricing</button>
            </div>
          </div>
          <div className="hero-image" style={{flex: 1, position: 'relative', display: 'flex', justifyContent: 'center'}}>
            <div style={{position: 'absolute', top: '10%', left: '10%', right: '10%', bottom: '10%', background: 'radial-gradient(circle, rgba(0, 210, 255, 0.4) 0%, transparent 60%)', filter: 'blur(40px)', zIndex: -1}}></div>
            <img src={clapboardImg} alt="AI Cinematic Clapboard" style={{width: '100%', maxWidth: '450px', transform: 'rotate(8deg) translateY(-10px)', filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.6))', animation: 'float 6s ease-in-out infinite'}} />
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section">
        <div className="stat-card">
          <h3>10M+</h3>
          <p>Words Parsed</p>
        </div>
        <div className="stat-card">
          <h3>~2s</h3>
          <p>Av. Processing Time</p>
        </div>
        <div className="stat-card">
          <h3>99.9%</h3>
          <p>Uptime</p>
        </div>
      </section>

      {/* Testimonials */}
      <section className="testimonials-section">
        <h2>What Visionary Directors Say</h2>
        <div className="testimonials-grid">
          <div className="testimonial-card">
            <div className="stars"><Star size={18}/><Star size={18}/><Star size={18}/><Star size={18}/><Star size={18}/></div>
            <p>"Building epic worlds requires intense planning. CINE·AI helps me visualize the scale and character distributions before a single frame is shot. It's the future of massive-scale storytelling."</p>
            <div className="testimonial-footer">
              <img src={rajamouliImg} alt="S.S. Rajamouli" className="testimonial-avatar" />
              <div className="customer-info">
                <strong>S.S. Rajamouli</strong>
                <span>Director/Screenwriter</span>
              </div>
            </div>
          </div>
          <div className="testimonial-card">
            <div className="stars"><Star size={18}/><Star size={18}/><Star size={18}/><Star size={18}/><Star size={18}/></div>
            <p>"My screenplays are fast-paced and character-dense. This platform's ability to track character arcs and scene transitions automatically is a lifesaver in the editing room's prep stage."</p>
            <div className="testimonial-footer">
              <img src={lokeshImg} alt="Lokesh Kanagaraj" className="testimonial-avatar" />
              <div className="customer-info">
                <strong>Lokesh Kanagaraj</strong>
                <span>Director/Writer</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
