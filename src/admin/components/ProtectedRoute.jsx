import { Navigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

export default function ProtectedRoute({ children }) {
  const { admin, loading } = useAuth()
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-900">
        <div className="h-8 w-8 border-2 border-[#f84d07] border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }
  return admin ? children : <Navigate to="/admin/login" replace />
}
