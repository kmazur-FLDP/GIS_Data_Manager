

import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../services/supabaseClient'

function Login() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleLogin = async (e) => {
    e.preventDefault()
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })
    if (error) {
      setError('Login failed. Please check your email and password.')
    } else {
      setError('')
      navigate('/')
    }
  }

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      backgroundColor: '#121212',
      color: '#f0f0f0',
      padding: '2rem'
    }}>
      <form onSubmit={handleLogin} style={{
        backgroundColor: '#1c1c1c',
        padding: '2rem',
        borderRadius: '8px',
        boxShadow: '0 0 12px rgba(0,0,0,0.5)',
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        width: '300px'
      }}>
        <h2 style={{ textAlign: 'center' }}>Login</h2>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{
            padding: '10px',
            backgroundColor: '#2a2a2a',
            border: '1px solid #444',
            color: '#f0f0f0',
            borderRadius: '4px'
          }}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{
            padding: '10px',
            backgroundColor: '#2a2a2a',
            border: '1px solid #444',
            color: '#f0f0f0',
            borderRadius: '4px'
          }}
          required
        />

        {error && <div style={{ color: '#ff6b6b', textAlign: 'center' }}>{error}</div>}

        <button type="submit" style={{
          padding: '10px',
          backgroundColor: '#0066cc',
          color: '#fff',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer'
        }}>
          Log In
        </button>
      </form>
    </div>
  )
}

export default Login