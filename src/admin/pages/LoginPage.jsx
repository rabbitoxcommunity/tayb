import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      await login(email, password)
      navigate('/admin')
    } catch {
      setError('Invalid email or password')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="mb-8 text-center">
          <span className="text-white font-black text-2xl tracking-tight">
            TayB <span className="text-[#f84d07]">Admin</span>
          </span>
          <p className="text-slate-400 text-sm mt-2">Sign in to your account</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-slate-800 rounded-2xl p-7 space-y-4 shadow-xl">
          {error && (
            <div className="bg-red-500/10 border border-red-500/30 text-red-400 text-sm px-4 py-2.5 rounded-lg">
              {error}
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wide mb-1.5">Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@tayb.ae"
              className="w-full bg-slate-700 border border-slate-600 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#f84d07] focus:ring-1 focus:ring-[#f84d07]"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wide mb-1.5">Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full bg-slate-700 border border-slate-600 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#f84d07] focus:ring-1 focus:ring-[#f84d07]"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#f84d07] hover:bg-[#d94206] disabled:opacity-60 text-white font-semibold py-3 rounded-xl transition-colors text-sm mt-2"
          >
            {loading ? 'Signing in…' : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  )
}
