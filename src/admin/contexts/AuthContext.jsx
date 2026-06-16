import { createContext, useContext, useState, useEffect } from 'react'
import api from '../api/axios'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [admin, setAdmin] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem('tayb_token')
    if (!token) { setLoading(false); return }
    api.get('/auth/me')
      .then((res) => setAdmin(res.data))
      .catch(() => localStorage.removeItem('tayb_token'))
      .finally(() => setLoading(false))
  }, [])

  const login = async (email, password) => {
    const { data } = await api.post('/auth/login', { email, password })
    localStorage.setItem('tayb_token', data.token)
    setAdmin(data.admin)
  }

  const logout = () => {
    localStorage.removeItem('tayb_token')
    setAdmin(null)
  }

  return (
    <AuthContext.Provider value={{ admin, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
