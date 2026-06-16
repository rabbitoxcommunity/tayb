import { Outlet, NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

const navItems = [
  {
    to: '/admin',
    label: 'Dashboard',
    icon: <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" /><rect x="3" y="14" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" /></svg>,
  },
  {
    to: '/admin/projects',
    label: 'Projects',
    icon: <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>,
  },
  {
    to: '/admin/gallery',
    label: 'Gallery',
    icon: <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>,
  },
  {
    to: '/admin/enquiries',
    label: 'Enquiries',
    icon: <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>,
  },
]

export default function AdminLayout() {
  const { admin, logout } = useAuth()
  const navigate = useNavigate()

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-60 bg-slate-900 flex flex-col shrink-0 fixed inset-y-0">
        <div className="px-6 py-5 border-b border-slate-700/60">
          <span className="text-white font-black text-lg tracking-tight">
            TayB <span className="text-[#f84d07]">Admin</span>
          </span>
        </div>

        <nav className="flex-1 px-3 py-4 space-y-0.5">
          {navItems.map(({ to, label, icon }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/admin'}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-[#f84d07] text-white'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }`
              }
            >
              {icon}
              {label}
            </NavLink>
          ))}
        </nav>

        <div className="px-4 py-4 border-t border-slate-700/60">
          <p className="text-xs text-slate-500 truncate mb-3">{admin?.email}</p>
          <button
            onClick={() => { logout(); navigate('/admin/login') }}
            className="flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors"
          >
            <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            Sign out
          </button>
        </div>
      </aside>

      {/* Content */}
      <main className="flex-1 ml-60 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  )
}
