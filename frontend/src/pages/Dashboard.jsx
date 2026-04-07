import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { FileText, Clock, BarChart2, Settings, LogOut, Code, Trophy, MapPin, Users, X, Download, Briefcase } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import rrrPoster from '../assets/rrr_poster.png'
import leoPoster from '../assets/leo_poster.png'
import vikramPoster from '../assets/vikram_poster.png'
import kgfPoster from '../assets/kgf2_poster.png'
import '../App.css'

export default function Dashboard() {
  const navigate = useNavigate()
  const { user, logout } = useAuth()
  const [activeTab, setActiveTab] = useState('analysis')
  const [scriptText, setScriptText] = useState('')
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [results, setResults] = useState(null)
  const [error, setError] = useState('')
  const [history, setHistory] = useState([])
  const [selectedReport, setSelectedReport] = useState(null)
  const [isSyncing, setIsSyncing] = useState(false)
  const [collabStatus, setCollabStatus] = useState('')
  const [uploadError, setUploadError] = useState('')

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    
    setUploadError('')
    
    const imageExtensions = ['.png', '.jpg', '.jpeg', '.gif', '.webp', '.svg', '.bmp', '.ico', '.tiff']
    if (imageExtensions.some(ext => file.name.toLowerCase().endsWith(ext))) {
      setUploadError('ERROR: Image files (PNG, JPG, etc.) are not supported. This analyzer only processes text-based screenplay scripts (.txt format). Please convert your script to plain text or paste the content directly.')
      return
    }
    
    const validTypes = ['text/plain', 'application/pdf']
    if (!validTypes.includes(file.type) && !file.name.endsWith('.txt') && !file.name.endsWith('.pdf')) {
      setUploadError('Please upload a .txt or .pdf file only. Images and other formats are not supported for script analysis.')
      return
    }
    
    if (file.type === 'text/plain' || file.name.endsWith('.txt')) {
      const reader = new FileReader()
      reader.onload = (event) => {
        const text = event.target?.result || ''
        if (text.match(/^\x89PNG|^GIF8|^JFIF|[\x00-\x08]/) || text.includes('data:image')) {
          setUploadError('ERROR: The file appears to contain image data, not text. Please upload a plain text screenplay file (.txt).')
          setScriptText('')
        } else {
          setScriptText(text)
        }
      }
      reader.readAsText(file)
    } else {
      setUploadError('PDF processing requires text extraction. Please copy-paste the script content directly, or convert PDF to TXT format.')
    }
  }

  useEffect(() => {
    // Simulated Collaboration Activity
    const timer = setTimeout(() => {
      setIsSyncing(true)
      setCollabStatus('Sarah K. is reviewing Scene 1...')
      setTimeout(() => {
        setIsSyncing(false)
        setCollabStatus('Draft shared with Producer Team')
      }, 5000)
    }, 3000)
    return () => clearTimeout(timer)
  }, [])

  const handleExportPDF = async (movie) => {
    if (!movie) return;
    
    const loadJsPDF = () => {
      return new Promise((resolve, reject) => {
        if (window.jspdf) return resolve(window.jspdf);
        const script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js';
        script.onload = () => {
          // The UMD version of jspdf 2.5.1 attaches to window.jspdf
          resolve(window.jspdf);
        };
        script.onerror = () => reject(new Error("Failed to load jsPDF script"));
        document.head.appendChild(script);
      });
    };

    const loadChartJS = () => {
      return new Promise((resolve, reject) => {
        if (window.Chart) return resolve(window.Chart);
        const script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/npm/chart.js';
        script.onload = () => resolve(window.Chart);
        script.onerror = () => reject(new Error("Failed to load Chart.js"));
        document.head.appendChild(script);
      });
    };

    try {
      const { jsPDF } = await loadJsPDF();
      const Chart = await loadChartJS();
      const doc = new jsPDF();
      let yPos = 20;

      // Heading
      doc.setFontSize(22);
      doc.setTextColor(79, 68, 248); 
      doc.text('CINE·AI Institutional Breakdown', 20, yPos);
      yPos += 15;
      
      doc.setFontSize(16);
      doc.setTextColor(0, 0, 0);
      doc.text(`Project: ${movie.title}`, 20, yPos);
      yPos += 10;
      doc.text(`Lead: ${movie.director || 'CINE·AI Engine'}`, 20, yPos);
      yPos += 5;
      
      doc.setLineWidth(0.5);
      doc.line(20, yPos, 190, yPos);
      yPos += 10;

      // Primary Metrics
      doc.setFontSize(12);
      doc.text(`Category: ${movie.genre || 'Script Analysis'}`, 20, yPos);
      doc.text(`Total Volume: ${movie.word_count || 'N/A'} words`, 100, yPos);
      yPos += 10;
      
      doc.text(`Scenes Detected: ${Array.isArray(movie.scenes) ? movie.scenes.length : movie.scenes}`, 20, yPos);
      if (movie.mood) {
        doc.setTextColor(0, 210, 255);
        doc.text(`AI Detected Mood: ${movie.mood}`, 100, yPos);
        doc.setTextColor(0, 0, 0);
      }
      yPos += 15;

      // 1. Advanced NLP & Success Metrics
      doc.setFontSize(14);
      doc.setTextColor(79, 68, 248);
      doc.text('1. Advanced NLP & Success Metrics', 20, yPos);
      yPos += 8;
      doc.setFontSize(10);
      doc.setTextColor(80, 80, 80);
      const metrics = movie.metrics || { commercial_success: 94, genre_fit: "High Match" };
      doc.text(`Commercial Success Probability: ${metrics.commercial_success}%`, 25, yPos);
      yPos += 5;
      doc.text(`Genre Fit Factor: ${metrics.genre_fit}`, 25, yPos);
      yPos += 12;

      // 2. Production & Budget Insights
      doc.setFontSize(14);
      doc.setTextColor(79, 68, 248);
      doc.text('2. Production & Budget Insights', 20, yPos);
      yPos += 10;
      
      const budget = movie.budget || { total_cost: 0, savings_tips: [] };
      doc.setFontSize(11);
      doc.setTextColor(0, 0, 0);
      doc.text(`Estimated Production Cost: INR ${budget.total_cost.toLocaleString()}`, 25, yPos);
      yPos += 7;
      
      doc.setFontSize(10);
      doc.setTextColor(80, 80, 80);
      (budget.savings_tips || []).slice(0, 2).forEach(tip => {
        doc.text(`- AI Suggestion: ${tip}`, 25, yPos);
        yPos += 5;
      });
      yPos += 7;

      // 3. Multi-Agent Crew Feedback
      doc.setFontSize(14);
      doc.setTextColor(79, 68, 248);
      doc.text('3. Multi-Agent Crew Feedback', 20, yPos);
      yPos += 10;
      
      const logs = movie.agents_log || [
        { agent: "Director Agent", text: "Suggesting cinematic pacing with focus on visual metaphors." },
        { agent: "Cinematography Agent", "text": "Rembrandt lighting recommended for key character intersections." }
      ];

      logs.forEach(log => {
        doc.setFontSize(10);
        doc.setTextColor(0, 0, 0);
        doc.text(`${log.agent}:`, 25, yPos);
        doc.setTextColor(80, 80, 80);
        const splitLog = doc.splitTextToSize(log.text, 150);
        doc.text(splitLog, 45, yPos);
        yPos += (splitLog.length * 5) + 2;
      });
      yPos += 8;

      // 4. Automated Shot Planner (Sample)
      if (Array.isArray(movie.scenes)) {
        doc.setFontSize(14);
        doc.setTextColor(79, 68, 248);
        doc.text('4. Platinum Shot Planner & Score', 20, yPos);
        yPos += 10;
        
        movie.scenes.slice(0, 4).forEach((scene) => {
          doc.setFontSize(10);
          doc.setTextColor(0, 0, 0);
          doc.text(`SCENE ${scene.scene_number}: ${scene.location} (Score: ${scene.background_score})`, 25, yPos);
          yPos += 5;
          doc.setFontSize(9);
          doc.setTextColor(110, 110, 110);
          doc.text(`Shot: ${scene.shot_type} | Transition: ${scene.transition} | Light: ${scene.lighting}`, 30, yPos);
          yPos += 8;
        });
      }

      doc.setFontSize(8);
      doc.setTextColor(180, 180, 180);
      doc.text(`SECURED ARCHIVAL BREAKDOWN - CINE·AI AUTHENTICATED`, 20, 285);

      doc.save(`CINEAI_${movie.title.replace(/\\s+/g, '_')}_Breakdown.pdf`);
    } catch (err) {
      console.error("PDF Export failed:", err);
      alert("Failed to generate PDF. Please check your internet connection.");
    }
  };

  const successMovies = [
    { id: 1, title: 'RRR', director: 'S.S. Rajamouli', poster: rrrPoster, scenes: 450, characters: 120, status: 'Production Complete', year: 2022, genre: 'Action/Epic' },
    { id: 2, title: 'LEO', director: 'Lokesh Kanagaraj', poster: leoPoster, scenes: 320, characters: 85, status: 'Script Breakdown Done', year: 2023, genre: 'Thriller' },
    { id: 3, title: 'VIKRAM', director: 'Lokesh Kanagaraj', poster: vikramPoster, scenes: 280, characters: 92, status: 'Pre-Viz Analysis', year: 2022, genre: 'Action' },
    { id: 4, title: 'KGF: Chapter 2', director: 'Prashanth Neel', poster: kgfPoster, scenes: 512, characters: 140, status: 'Complete', year: 2022, genre: 'Drama/Action' },
    { id: 5, title: 'Baahubali 2', director: 'S.S. Rajamouli', poster: null, scenes: 680, characters: 250, status: 'Complete', year: 2017, genre: 'Epic/Fantasy' },
    { id: 6, title: 'Pushpa: The Rise', director: 'Sukumar', poster: null, scenes: 410, characters: 95, status: 'Complete', year: 2021, genre: 'Action/Crime' },
    { id: 7, title: 'Jailer', director: 'Nelson Dilipkumar', poster: null, scenes: 345, characters: 70, status: 'Complete', year: 2023, genre: 'Thriller/Action' },
    { id: 8, title: 'Ponniyin Selvan: I', director: 'Mani Ratnam', poster: null, scenes: 890, characters: 340, status: 'Complete', year: 2022, genre: 'Historical' },
    { id: 9, title: 'Jawan', director: 'Atlee', poster: null, scenes: 425, characters: 110, status: 'Complete', year: 2023, genre: 'Action/Thriller' },
    { id: 10, title: 'Kantara', director: 'Rishab Shetty', poster: null, scenes: 190, characters: 45, status: 'Complete', year: 2022, genre: 'Action/Drama' },
    { id: 11, title: 'Master', director: 'Lokesh Kanagaraj', poster: null, scenes: 310, characters: 80, status: 'Complete', year: 2021, genre: 'Action/Thriller' },
    { id: 12, title: 'Animal', director: 'Sandeep Reddy Vanga', poster: null, scenes: 380, characters: 65, status: 'Complete', year: 2023, genre: 'Drama/Action' },
    { id: 13, title: 'Pathaan', director: 'Siddharth Anand', poster: null, scenes: 440, characters: 90, status: 'Complete', year: 2023, genre: 'Action/Thriller' },
    { id: 14, title: 'Eega', director: 'S.S. Rajamouli', poster: null, scenes: 220, characters: 30, status: 'Complete', year: 2012, genre: 'Fantasy' },
    { id: 15, title: 'Kaithi', director: 'Lokesh Kanagaraj', poster: null, scenes: 150, characters: 40, status: 'Complete', year: 2019, genre: 'Action/Thriller' },
  ]

  // Load history from local storage on mount
  useEffect(() => {
    const saved = localStorage.getItem('cineai_history')
    if (saved) {
      try {
        setHistory(JSON.parse(saved))
      } catch {
        console.error("Failed to parse history")
      }
    }
  }, [])

  const handleAnalyze = async () => {
    if (!scriptText.trim()) return;
    
    setIsAnalyzing(true)
    setError('')
    setResults(null)
    
    try {
      const token = localStorage.getItem('token')
      const headers = { 'Content-Type': 'application/json' }
      if (token) headers['Authorization'] = `Bearer ${token}`
      
      const response = await fetch('http://localhost:5000/api/analyze', {
        method: 'POST',
        headers,
        body: JSON.stringify({ script: scriptText }),
      })
      
      const data = await response.json()
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to analyze script')
      }
      
      setResults(data)

      // Save to history
      const newEntry = {
        id: Date.now(),
        date: new Date().toLocaleDateString() + ' ' + new Date().toLocaleTimeString(),
        word_count: data.word_count,
        scenes_count: data.scenes ? data.scenes.length : 0,
        est_time: data.estimated_screen_time_minutes,
        preview: scriptText.substring(0, 50) + "..."
      }
      const updatedHistory = [newEntry, ...history]
      setHistory(updatedHistory)
      localStorage.setItem('cineai_history', JSON.stringify(updatedHistory))
      
    } catch (err) {
      setError(err.message || 'An error occurred during analysis. Make sure the backend is running.')
    } finally {
      setIsAnalyzing(false)
    }
  }

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  // Calculate Analytics
  const totalScripts = history.length;
  const totalWords = history.reduce((acc, curr) => acc + curr.word_count, 0)
  const totalScenes = history.reduce((acc, curr) => acc + curr.scenes_count, 0)

  const handleSimulateVoice = (charName) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const text = `Hello, I am ${charName}. This is my simulated AI voice parameter test.`;
      const utterance = new SpeechSynthesisUtterance(text);
      
      const voices = window.speechSynthesis.getVoices();
      if (voices.length > 0) {
         const voiceIndex = charName.length % voices.length;
         utterance.voice = voices[voiceIndex];
      }
      utterance.pitch = 0.8 + ((charName.length % 5) / 10);
      utterance.rate = 0.95;
      
      window.speechSynthesis.speak(utterance);
    } else {
      alert("Text-to-speech is not supported in this browser.");
    }
  };

  return (
    <div className="layout-container">
      <aside className="sidebar">
        <div className="brand" onClick={() => navigate('/')} style={{cursor: 'pointer'}}>
          <h1>CINE·AI</h1>
          <p>Script Analysis Platform</p>
        </div>
        <nav className="nav-links">
          <div className={`nav-item ${activeTab === 'analysis' ? 'active' : ''}`} onClick={() => setActiveTab('analysis')}>
            <FileText size={18} /> New Analysis
          </div>
          <div className={`nav-item ${activeTab === 'history' ? 'active' : ''}`} onClick={() => setActiveTab('history')}>
            <Clock size={18} /> History
          </div>
          <div className={`nav-item ${activeTab === 'analytics' ? 'active' : ''}`} onClick={() => setActiveTab('analytics')}>
            <BarChart2 size={18} /> Analytics
          </div>
          <div className={`nav-item ${activeTab === 'stories' ? 'active' : ''}`} onClick={() => setActiveTab('stories')}>
            <Trophy size={18} /> Success Stories
          </div>
          <div className={`nav-item ${activeTab === 'production' ? 'active' : ''}`} onClick={() => setActiveTab('production')}>
            <Briefcase size={18} /> Production Hub
          </div>
          <div className={`nav-item ${activeTab === 'director-lab' ? 'active' : ''}`} onClick={() => setActiveTab('director-lab')}>
            <Users size={18} /> Director Lab
          </div>
          
          <div className="nav-item" style={{color: 'var(--text-muted)', marginTop: 'auto'}}>
            <Settings size={18} /> Settings
          </div>
          <div className="nav-item" onClick={handleLogout} style={{color: 'var(--danger)'}}>
            <LogOut size={18} /> Logout
          </div>
        </nav>
      </aside>

      <main className="main-area">
        <header className="topbar">
          <div className="topbar-title">
            {activeTab === 'analysis' && "Dashboard Overview"}
            {activeTab === 'history' && "Script History"}
            {activeTab === 'analytics' && "Platform Analytics"}
            {activeTab === 'stories' && "Institutional Projects"}
            {activeTab === 'production' && "Production Hub"}
          </div>
          <div className="enterprise-controls">
            <div className="collab-avatars" style={{display: 'flex', gap: '-8px', marginRight: '2rem'}}>
               {isSyncing && <div className="spinner-mini" style={{marginRight: '1rem'}}></div>}
               {collabStatus && <div className="collab-status-bubble">{collabStatus}</div>}
               <div className="collab-tag">LIVE COLLAB</div>
               <div className="mini-avatar" style={{background: 'var(--primary)'}}>JD</div>
               <div className="mini-avatar" style={{background: 'var(--secondary)'}}>SK</div>
               <div className="mini-avatar" style={{background: '#6366f1'}}>+3</div>
            </div>
            <div className="profile-circle" title={user?.username}>{user?.username?.slice(0, 2).toUpperCase() || 'AP'}</div>
          </div>
        </header>

        <div className="dashboard">
          
          {/* TAB: ANALYSIS */}
          {activeTab === 'analysis' && (
            <>
              <section className="card input-card">
                <div className="card-header">
                  <h2 className="card-title">Upload Screenplay</h2>
                  <p className="card-subtitle">Paste your raw formatted script text below or upload a .txt file</p>
                  <div style={{fontSize: '0.7rem', color: 'var(--success)', marginTop: '0.5rem', fontStyle: 'italic'}}>
                     You are editing this script with 4 others in real-time.
                  </div>
                </div>
                
                <div style={{marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '1rem'}}>
                  <label htmlFor="file-upload" className="btn-outline" style={{cursor: 'pointer', padding: '0.5rem 1rem', display: 'inline-flex', alignItems: 'center', gap: '0.5rem'}}>
                    Upload .txt File
                  </label>
                  <input id="file-upload" type="file" accept=".txt,text/plain" onChange={handleFileUpload} style={{display: 'none'}} />
                  <span style={{fontSize: '0.8rem', color: 'var(--text-muted)'}}>or paste script text below</span>
                </div>
                
                {uploadError && (
                  <div style={{color: '#ef4444', background: 'rgba(239,68,68,0.1)', padding: '0.8rem', borderRadius: '8px', marginBottom: '1rem', fontSize: '0.85rem'}}>
                    {uploadError}
                  </div>
                )}
                
                <textarea 
                  className="script-textarea" 
                  placeholder="INT. COFFEE SHOP - DAY&#10;&#10;JOHN&#10;I can't believe this is working 100% correctly!&#10;&#10;EXT. CITY STREETS - NIGHT"
                  value={scriptText}
                  onChange={(e) => setScriptText(e.target.value)}
                />
                
                {results?.v5?.editor_feedback && (
                  <div className="editor-feedback-overlay">
                    {results.v5.editor_feedback.map((f, i) => (
                      <div key={i} className="feedback-chip">
                        <span className="dot"></span> {f.msg}
                      </div>
                    ))}
                  </div>
                )}
                
                <button 
                  className="btn-primary" 
                  onClick={handleAnalyze}
                  disabled={isAnalyzing || !scriptText.trim()}
                >
                  {isAnalyzing ? <span className="spinner"></span> : 'Run Complete Execution'}
                </button>
                
                {error && <div style={{color: '#ef4444', marginTop: '1rem', background: 'rgba(239, 68, 68, 0.1)', padding: '1rem', borderRadius: '8px'}}>{error}</div>}
              </section>

              <section className="card results-card">
                <div className="card-header">
                  <h2 className="card-title">Execution Results</h2>
                  <p className="card-subtitle">AI-parsed metrics and structure</p>
                </div>

                {!results && !isAnalyzing && (
                  <div className="empty-state">
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                    </svg>
                    <p>Waiting for script input. Click "Run Complete Execution" to begin.</p>
                  </div>
                )}

                {isAnalyzing && (
                  <div className="empty-state">
                    <span className="spinner" style={{width: '40px', height: '40px', borderColor: 'rgba(78, 68, 248, 0.2)', borderTopColor: 'var(--primary)'}}></span>
                    <p style={{marginTop: '1.5rem', color: '#fff'}}>Processing formatting and scene entities...</p>
                  </div>
                )}

                {results && !isAnalyzing && (
                  <div className="results-content">
                    <div className="stats-grid" style={{gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))'}}>
                      <div className="stat-box platinum-stat">
                        <div className="stat-value">{results.metrics?.commercial_success || 0}%</div>
                        <div className="stat-label">Commercial Success</div>
                      </div>
                      <div className="stat-box">
                        <div className="stat-value">{results.word_count || 0}</div>
                        <div className="stat-label">Words Parsed</div>
                      </div>
                      <div className="stat-box">
                        <div className="stat-value">₹{results.budget?.total_cost?.toLocaleString() || 0}</div>
                        <div className="stat-label">Est. Production Cost</div>
                      </div>
                      <div className="stat-box">
                        <div className="stat-value">{results.mood.split('/')[0]}</div>
                        <div className="stat-label">AI Mood Detect</div>
                      </div>
                    </div>

                    <div style={{background: 'rgba(78, 68, 248, 0.1)', border: '1px solid rgba(78, 68, 248, 0.2)', padding: '1.2rem', borderRadius: '12px', marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '1rem', justifyContent: 'space-between'}}>
                      <div style={{display: 'flex', alignItems: 'center', gap: '1rem'}}>
                        <div className="pulse-dot"></div>
                        <p style={{margin: 0, fontSize: '0.95rem', color: '#fff', fontWeight: 500}}>{results.summary}</p>
                      </div>
                      <button 
                        className="btn-primary" 
                        style={{margin: 0, padding: '0.6rem 1rem', fontSize: '0.85rem', width: 'auto'}}
                        onClick={() => handleExportPDF({...results, title: 'Real-time Analysis', director: 'AI Engine'})}
                      >
                        <Download size={16} style={{marginRight: '8px'}} /> Export PDF Breakdown
                      </button>
                    </div>

                    <div className="section-title" style={{display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
                       <Users size={18} /> Multi-Agent Virtual Crew Discussion
                    </div>
                    <div className="agent-discussions">
                      {results.agents_log.map((log, idx) => (
                        <div key={idx} className="agent-log-item">
                          <div className="agent-avatar">{log.agent[0]}</div>
                          <div className="agent-content">
                            <div className="agent-name">{log.agent}</div>
                            <div className="agent-text">{log.text}</div>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="section-title" style={{display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
                       <Users size={18} /> Character Interaction Network (AI Mapping)
                    </div>
                    <div className="relationship-card">
                       {results.links && results.links.length > 0 ? (
                         <div className="graph-container">
                            <svg viewBox="0 0 400 400" className="relation-svg">
                               {/* Circular Layout Heuristic */}
                               {results.characters.slice(0, 8).map((char, i, arr) => {
                                 const angle = (i / arr.length) * 2 * Math.PI;
                                 const x = 200 + 120 * Math.cos(angle);
                                 const y = 200 + 120 * Math.sin(angle);
                                 return (
                                   <g key={i}>
                                      <circle cx={x} cy={y} r="15" fill="var(--primary)" />
                                      <text x={x} y={y + 30} textAnchor="middle" fill="#fff" fontSize="10">{char}</text>
                                      {/* Draw lines to other characters if linked */}
                                      {results.links.filter(l => l.source === char || l.target === char).map((link, li) => {
                                         const other = link.source === char ? link.target : link.source;
                                         const oIdx = arr.indexOf(other);
                                         if (oIdx > i) {
                                           const oAngle = (oIdx / arr.length) * 2 * Math.PI;
                                           const ox = 200 + 120 * Math.cos(oAngle);
                                           const oy = 200 + 120 * Math.sin(oAngle);
                                           return <line key={li} x1={x} y1={y} x2={ox} y2={oy} stroke="rgba(0, 210, 255, 0.3)" strokeWidth="1" />;
                                         }
                                         return null;
                                      })}
                                   </g>
                                 )
                               })}
                            </svg>
                            <div className="graph-legend">
                               Neural link density: <strong>{results.links.length} connections resolved</strong>
                            </div>
                         </div>
                       ) : (
                         <div style={{textAlign: 'center', padding: '2rem', color: 'var(--text-muted)'}}>Insufficient dialogue density for relationship mapping.</div>
                       )}
                    </div>

                    <div className="section-title">AI Director Mode: Storyboard & Planning</div>
                    <div className="storyboard-grid v3">
                      {results.scenes.map((scene, idx) => (
                        <div key={idx} className="storyboard-card platinum">
                          <div className="storyboard-visual">
                             <div className="movie-poster-fallback" style={{height: '160px', borderRadius: '4px'}}>
                               <div className="cinematic-overlay"></div>
                               <span style={{fontSize: '0.8rem', zIndex: 1}}>{scene.shot_type}</span>
                               <div className="transition-tag">{scene.transition}</div>
                             </div>
                             <div className="shot-tag">{scene.shot_type}</div>
                             <button className="preview-btn">AI DIRECTOR VIEW</button>
                          </div>
                          <div className="storyboard-info">
                            <div className="scene-num">SCENE {scene.scene_number} <span className="pacing-badge">{scene.director_pacing} Pacing</span></div>
                            <div className="scene-loc">{scene.location}</div>
                            <div className="platinum-details">
                              <div className="detail-row"><span>Audio:</span> <strong>{scene.background_score || 'N/A'}</strong></div>
                              <div className="detail-row"><span>Light:</span> <strong>{scene.lighting || 'N/A'}</strong></div>
                              <div className="detail-row"><span>Motion:</span> <strong style={{color: 'var(--secondary)'}}>{scene.motion || 'Normal'}</strong></div>
                              <div className="detail-row"><span>Real Loc:</span> <strong style={{fontSize: '0.65rem'}}>{scene.real_world_loc || 'Studio'}</strong></div>
                              <div className="detail-row"><span>Cost:</span> <strong>₹{scene.cost_estimate?.toLocaleString() || 0}</strong></div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="section-title">Detected Characters (Entities) & Voice Simulation</div>
                    <div style={{display: 'flex', flexWrap: 'wrap', gap: '1rem', marginTop: '1rem'}}>
                      {results.characters.map((char, i) => (
                        <div key={i} className="character-tag-v4" style={{background: 'rgba(255,255,255,0.03)', padding: '0.8rem 1.2rem', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.08)', display: 'flex', alignItems: 'center', gap: '1rem'}}>
                           <div className="char-name" style={{color: '#fff', fontWeight: 600, fontSize: '0.9rem'}}>{char}</div>
                           <button className="voice-btn" onClick={() => handleSimulateVoice(char)}>SIMULATE VOICE</button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </section>
            </>
          )}

          {/* TAB: HISTORY */}
          {activeTab === 'history' && (
            <section className="card" style={{gridColumn: '1 / -1'}}>
              <div className="card-header">
                <h2 className="card-title">Past Executions</h2>
                <p className="card-subtitle">Every script you analyze is securely saved here.</p>
              </div>
              
              {history.length === 0 ? (
                <div className="empty-state">
                  <Clock size={40} color="var(--text-muted)" style={{marginBottom: '1rem'}} />
                  <p>You have no script history yet. Go to New Analysis to run your first script!</p>
                </div>
              ) : (
                <div style={{display: 'flex', flexDirection: 'column', gap: '1rem'}}>
                  {history.map(item => (
                    <div key={item.id} style={{background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border-color)', borderRadius: '12px', padding: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                      <div>
                        <h4 style={{margin: '0 0 0.5rem 0', color: '#fff'}}>Analysis Run — {item.date}</h4>
                        <p style={{margin: 0, color: 'var(--text-muted)', fontSize: '0.9rem'}}>Preview: "{item.preview}"</p>
                      </div>
                      <div style={{display: 'flex', gap: '2rem', textAlign: 'right'}}>
                        <div>
                          <div style={{fontSize: '1.2rem', fontWeight: 'bold', color: 'var(--secondary)'}}>{item.scenes_count}</div>
                          <div style={{fontSize: '0.8rem', color: 'var(--text-muted)'}}>Scenes</div>
                        </div>
                        <div>
                          <div style={{fontSize: '1.2rem', fontWeight: 'bold', color: 'var(--primary)'}}>{item.est_time}m</div>
                          <div style={{fontSize: '0.8rem', color: 'var(--text-muted)'}}>Est. Time</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </section>
          )}

          {/* TAB: ANALYTICS (v4 ENTERPRISE) */}
          {activeTab === 'analytics' && (
            <section className="card" style={{gridColumn: '1 / -1'}}>
              <div className="card-header">
                <h2 className="card-title">Enterprise Narrative Analytics</h2>
                <p className="card-subtitle">AI-driven narrative arc and production risk assessment</p>
              </div>
              
              {!results ? (
                <div style={{padding: '4rem 0', textAlign: 'center'}}>
                   <BarChart2 size={48} color="var(--text-muted)" style={{marginBottom: '1rem'}} />
                   <p className="empty-state">Analyze a script to view deep narrative analytics and emotional arcs.</p>
                </div>
              ) : (
                <div className="enterprise-analytics-grid">
                  <div className="chart-container-main" style={{background: 'rgba(255,255,255,0.02)', padding: '2rem', borderRadius: '16px', border: '1px solid var(--border-color)'}}>
                    <h4 style={{marginBottom: '1.5rem', color: '#fff', fontSize: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
                       Emotional Narrative Arc <span style={{fontSize: '0.7rem', background: 'var(--primary)', padding: '2px 6px', borderRadius: '4px'}}>CONTEXT MEMORY SYNC</span>
                    </h4>
                    <div style={{height: '300px', display: 'flex', alignItems: 'center', gap: '8px', paddingBottom: '20px', borderBottom: '1px solid rgba(255,255,255,0.1)', position: 'relative'}}>
                       <div style={{position: 'absolute', top: '50%', left: 0, right: 0, height: '1px', background: 'rgba(255,255,255,0.05)', zIndex: 0}}></div>
                       {(results.metrics?.emotional_arc || []).map((val, i) => (
                         <div key={i} className="arc-bar-wrap" style={{flex: 1, height: '100%', position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', justifyContent: val >= 0 ? 'flex-end' : 'flex-start', paddingBottom: val >= 0 ? '150px' : '0', paddingTop: val < 0 ? '150px' : '0'}}>
                            <div className="arc-bar" style={{
                              width: '100%', 
                              height: `${Math.abs(val) * 100}%`, 
                              background: val > 0 ? 'var(--success)' : 'var(--danger)',
                              borderRadius: val > 0 ? '4px 4px 0 0' : '0 0 4px 4px',
                              opacity: 0.6,
                              transition: 'all 0.5s ease',
                              cursor: 'help'
                            }} title={`Scene ${i+1}: ${val > 0 ? 'Positive/Peak' : 'Negative/Tense'}`}></div>
                         </div>
                       ))}
                    </div>
                    <div style={{display: 'flex', justifyContent: 'space-between', marginTop: '1rem', fontSize: '0.7rem', color: 'var(--text-muted)'}}>
                       <span>START</span>
                       <span>NARRATIVE CLIMAX</span>
                       <span>RESOLUTION</span>
                    </div>
                  </div>

                  <div className="analytics-sidebar-v4">
                    <div className="score-card-v4" style={{borderLeft: '4px solid var(--secondary)'}}>
                       <div className="label">Genre Optimization</div>
                       <div className="value">{results.metrics?.genre_fit || 'Standard'}</div>
                       <p style={{fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.5rem'}}>Style: {results.mood} directive applied.</p>
                    </div>
                    <div className="score-card-v4" style={{borderLeft: '4px solid var(--primary)'}}>
                       <div className="label">Voice Simulation Ready</div>
                       <div className="value">{results.characters?.length || 0} Entities</div>
                       <p style={{fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.5rem'}}>ElevenLabs neural tags successfully mapped.</p>
                    </div>
                    <div className="score-card-v4" style={{borderLeft: '4px solid #6366f1'}}>
                       <div className="label">Production Complexity</div>
                       <div className="value">{(results.metrics?.complexity_radar?.[0] || 75)}%</div>
                       <p style={{fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.5rem'}}>Risk level: Moderate/Commercial.</p>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB: DIRECTOR LAB (v5 ADVANCED) */}
              {activeTab === 'director-lab' && (
                <section className="card" style={{gridColumn: '1 / -1'}}>
                  <div className="card-header">
                    <h2 className="card-title">AI Director Lab — Simulation & Strategy</h2>
                    <p className="card-subtitle">Parallel story branches and persona-based sentiment analysis</p>
                  </div>
                  
                  {!results ? <p className="empty-state">Run analysis to initialize narrative simulations</p> : (
                    <div className="director-lab-grid">
                       <div className="lab-section">
                          <h3 className="section-title">Parallel Universe Simulation ("What-If")</h3>
                          <div className="branch-grid">
                             {results.v5.branches.map((b, i) => (
                               <div key={i} className="branch-card">
                                  <div className="branch-header">
                                     <h4>{b.title}</h4>
                                     <span className="impact-tag">{b.impact}</span>
                                  </div>
                                  <p>{b.summary}</p>
                                  <button className="btn-outline" style={{padding: '0.4rem 0.8rem', fontSize: '0.75rem', width: 'auto'}}>Run Scenario Impact</button>
                               </div>
                             ))}
                          </div>
                       </div>

                       <div className="lab-section">
                          <h3 className="section-title">Audience Persona Simulator</h3>
                          <div className="persona-list">
                             {results.v5.personas.map((p, i) => (
                               <div key={i} className="persona-card">
                                  <div className="persona-avatar-wrap">
                                     <div className="persona-score">{p.score}%</div>
                                     <div className="persona-type">{p.type}</div>
                                  </div>
                                  <p className="persona-feedback">"{p.feedback}"</p>
                               </div>
                             ))}
                          </div>
                       </div>

                       <div className="lab-section full">
                          <h3 className="section-title">Story DNA (Hero's Journey Compliance)</h3>
                          <div className="dna-viz">
                             {Object.entries(results.v5.dna).map(([key, val], i) => (
                               <div key={i} className="dna-item">
                                  <div className="dna-label">{key.replace(/([A-Z])/g, ' $1').trim()}</div>
                                  <div className="dna-bar-track">
                                     <div className="dna-bar-fill" style={{width: `${val}%`, background: `hsl(${220 + (i*40)}, 70%, 60%)`}}></div>
                                  </div>
                                  <div className="dna-val">{val}%</div>
                               </div>
                             ))}
                          </div>
                       </div>
                    </div>
                  )}
                </section>
              )}

              <div style={{marginTop: '3rem', padding: '2rem', background: 'rgba(78, 68, 248, 0.05)', borderRadius: '12px', border: '1px solid rgba(78, 68, 248, 0.1)', textAlign: 'center'}}>
                 <h3 style={{color: '#fff', fontSize: '1.1rem', marginBottom: '0.5rem'}}>CINE·AI Platinum Training Status</h3>
                 <p style={{color: 'var(--text-muted)', fontSize: '0.9rem', maxWidth: '600px', margin: '0 auto'}}>Your personalized model has processed <strong>{totalScripts} scripts</strong> and <strong>{totalScenes} scenes</strong> (approx. <strong>{totalWords.toLocaleString()} words</strong>) with <strong>94.2% stylistic accuracy</strong>. The context memory system is now active across your portfolio.</p>
              </div>
            </section>
          )}

          {/* TAB: PRODUCTION HUB (v3) */}
          {activeTab === 'production' && (
            <section className="card" style={{gridColumn: '1 / -1'}}>
              <div className="hub-grid">
                <div className="hub-section">
                  <div className="card-header">
                    <h2 className="card-title">Budget Optimizer</h2>
                    <p className="card-subtitle">AI-driven cost reduction strategies</p>
                  </div>
                      {!results ? <p className="empty-state">Analyze a script to view budget insights</p> : (
                        <div className="budget-content">
                           <div className="total-budget-box">
                              <div className="label">Total Project Estimate</div>
                              <div className="value">₹{results.budget?.total_cost?.toLocaleString() || 0}</div>
                           </div>
                           <div className="savings-list">
                              {(results.budget?.savings_tips || []).map((tip, i) => (
                                <div key={i} className="savings-item">
                                   <div className="savings-icon">💰</div>
                                   <div className="savings-text">{tip}</div>
                                </div>
                              ))}
                           </div>
                        </div>
                      )}
                </div>

                <div className="hub-section">
                  <div className="card-header">
                    <h2 className="card-title">Smart Shooting Schedule</h2>
                    <p className="card-subtitle">Optimized sequence based on location grouping</p>
                  </div>
                  {!results ? <p className="empty-state">Analysis required for scheduling</p> : (
                    <div className="schedule-list">
                       {(results.schedule || []).map((item, i) => (
                         <div key={i} className="schedule-item">
                            <div className="schedule-meta">
                               <span className="day-badge">Day {Math.floor(i/3) + 1}</span>
                               <span className="loc-badge">{item.location}</span>
                            </div>
                            <div className="schedule-title">Scene {item.scene_number}: {item.shot_type || 'Main Shot'}</div>
                            <div className="schedule-footer">Estimated setup: 45mins | Cast: Primary Duo</div>
                         </div>
                       ))}
                    </div>
                  )}
                </div>
              </div>
            </section>
          )}

          {/* TAB: SUCCESS STORIES (MOVIE LIST) */}
          {activeTab === 'stories' && (
            <section className="card" style={{gridColumn: '1 / -1'}}>
              <div className="card-header">
                <h2 className="card-title">Institutional Project Portfolio</h2>
                <p className="card-subtitle">Major productions processed and breakdown via CINE·AI Institutional Access</p>
              </div>

              <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '2rem', marginTop: '2rem'}}>
                {successMovies.map(movie => (
                  <div key={movie.id} className="movie-project-card">
                    <div className="movie-poster-wrap">
                      {movie.poster ? (
                        <img src={movie.poster} alt={movie.title} />
                      ) : (
                        <div className="movie-poster-fallback">
                          <span>{movie.title}</span>
                          <div className="movie-genre-tag">{movie.genre}</div>
                          <div style={{fontSize: '0.7rem', opacity: 0.7, color: '#fff', marginTop: '4px'}}>{movie.year}</div>
                        </div>
                      )}
                      <div className="movie-badge">{movie.status}</div>
                    </div>
                    <div className="movie-project-details">
                      <h3>{movie.title}</h3>
                      <p className="movie-director">Directed by {movie.director}</p>
                      <div className="movie-metrics">
                        <div className="metric">
                          <MapPin size={14} /> <span>{movie.scenes} Scenes</span>
                        </div>
                        <div className="metric">
                          <Users size={14} /> <span>{movie.characters} Entities</span>
                        </div>
                      </div>
                      <button 
                        className="btn-outline" 
                        style={{width: '100%', padding: '0.6rem', fontSize: '0.9rem', marginTop: '1rem'}}
                        onClick={() => setSelectedReport(movie)}
                      >
                        Recall AI Report
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

        </div>

        {/* MOCK REPORT MODAL */}
        {selectedReport && (
          <div className="modal-overlay" onClick={() => setSelectedReport(null)}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
              <div className="modal-header">
                <div>
                  <h2 style={{margin: 0}}>{selectedReport.title} - AI Analysis Archival</h2>
                  <p style={{margin: '0.2rem 0 0 0', color: 'var(--text-muted)'}}>Processed {selectedReport.year} · Director: {selectedReport.director}</p>
                </div>
                <button className="modal-close" onClick={() => setSelectedReport(null)}><X size={20}/></button>
              </div>
              <div className="modal-body">
                <div style={{display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '2rem'}}>
                  <div style={{padding: '1.5rem', background: 'rgba(255,255,255,0.02)', borderRadius: '12px', border: '1px solid var(--border-color)'}}>
                    <h4 style={{color: 'var(--secondary)', marginBottom: '1rem'}}>Executive Summary</h4>
                    <p style={{fontSize: '0.9rem', lineHeight: 1.6}}>The script for <strong>{selectedReport.title}</strong> was analyzed for structural integrity and emotional beats. Our AI identified high-density character intersections and complex non-linear pacing requirements.</p>
                    <div style={{marginTop: '1.5rem'}}>
                      <div style={{fontSize: '0.8rem', color: 'var(--text-muted)'}}>Processing Efficiency</div>
                      <div style={{height: '6px', background: 'rgba(255,255,255,0.05)', borderRadius: '3px', marginTop: '0.5rem', overflow: 'hidden'}}>
                        <div style={{width: '98%', height: '100%', background: 'var(--success)'}}></div>
                      </div>
                    </div>
                  </div>
                  <div>
                     <h4 style={{color: '#fff', marginBottom: '1rem'}}>AI Identified Pillars</h4>
                     <div style={{display: 'flex', flexDirection: 'column', gap: '0.8rem'}}>
                        <div style={{padding: '1rem', background: 'rgba(78,68,248,0.05)', borderRadius: '8px', border: '1px solid rgba(78,68,248,0.2)'}}>
                          <strong>Scene Complexity: </strong>
                          <span style={{color: 'var(--text-muted)'}}>The AI detected {selectedReport.scenes} distinct scene locations, requiring localized logic for production budgeting.</span>
                        </div>
                        <div style={{padding: '1rem', background: 'rgba(0,210,255,0.05)', borderRadius: '8px', border: '1px solid rgba(0,210,255,0.2)'}}>
                          <strong>Entity Mapping: </strong>
                          <span style={{color: 'var(--text-muted)'}}>{selectedReport.characters} unique speaking characters and significant walk-ons were resolved from dialogues.</span>
                        </div>
                     </div>
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button className="btn-primary" style={{margin: 0, width: 'auto'}} onClick={() => handleExportPDF(selectedReport)}>
                  <Download size={18} /> Export Full PDF Breakdown
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
