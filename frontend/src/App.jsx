import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from 'react-router-dom'
import { AuthProvider, useAuth } from './context/AuthContext'
import Landing from './pages/Landing'
import Pricing from './pages/Pricing'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import AIAssistant from './AIAssistant'

import './pages/Pages.css'
import './App.css'

function ProtectedRoute() {
  const { user, loading } = useAuth()
  if (loading) return null
  return user ? <Outlet /> : <Navigate to="/login" replace />
}

function PublicRoute() {
  const { user, loading } = useAuth()
  if (loading) return null
  return user ? <Navigate to="/dashboard" replace /> : <Outlet />
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="app-root">
          <Routes>
            <Route element={<PublicRoute />}>
              <Route path="/" element={<Landing />} />
              <Route path="/pricing" element={<Pricing />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
            </Route>
            <Route element={<ProtectedRoute />}>
              <Route path="/dashboard" element={<Dashboard />} />
            </Route>
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
          <AIAssistant />
        </div>
      </Router>
    </AuthProvider>
  )
}

export default App
