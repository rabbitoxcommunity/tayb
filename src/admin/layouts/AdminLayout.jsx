import { Outlet, NavLink, useNavigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useAuth } from '../contexts/AuthContext'
import { ConfirmProvider, useConfirm } from '../contexts/ConfirmContext'

const navMain = [
  {
    to: '/admin', label: 'Dashboard',
    icon: <svg className="h-[18px] w-[18px]" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" /></svg>,
  },
  {
    to: '/admin/projects', label: 'Projects',
    icon: <svg className="h-[18px] w-[18px]" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008z" /></svg>,
  },
  {
    to: '/admin/gallery', label: 'Gallery',
    icon: <svg className="h-[18px] w-[18px]" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" /></svg>,
  },
  {
    to: '/admin/enquiries', label: 'Enquiries',
    icon: <svg className="h-[18px] w-[18px]" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" /></svg>,
  },
]

export default function AdminLayout() {
  return (
    <ConfirmProvider>
      <AdminLayoutInner />
    </ConfirmProvider>
  )
}

function AdminLayoutInner() {
  const { admin, logout } = useAuth()
  const navigate = useNavigate()
  const confirm = useConfirm()
  const initials = admin?.email?.[0]?.toUpperCase() || 'A'

  const handleLogout = async () => {
    const ok = await confirm({
      title: 'Sign out?',
      message: 'You will be returned to the login page.',
      variant: 'logout',
    })
    if (ok) { logout(); navigate('/admin/login') }
  }

  return (
    <div className="h-screen overflow-hidden bg-[#E8E6E3] p-3">
      <div className="flex rounded-2xl overflow-hidden h-[calc(100vh-24px)] shadow-[0_8px_32px_rgba(0,0,0,0.10)] border border-white/60">

        {/* Sidebar */}
        <aside className="w-56 bg-white flex flex-col shrink-0">

          {/* Logo */}
          <div className="flex items-center justify-center px-4 pt-5 pb-5">
            <img src="/logo.svg" alt="TayB" className="h-24 w-auto" />
          </div>

          {/* MENU nav */}
          <div className="flex-1 px-3 overflow-y-auto">
            <p className="px-2 pb-2.5 text-[9px] font-bold tracking-[0.22em] uppercase text-[#C4C4C4]">Menu</p>
            <div className="space-y-0.5">
              {navMain.map(({ to, label, icon }) => (
                <NavLink
                  key={to}
                  to={to}
                  end={to === '/admin'}
                  className={({ isActive }) =>
                    `flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-[13px] font-medium transition-all ${
                      isActive
                        ? 'bg-[#f84d07] text-white shadow-sm'
                        : 'text-[#6B7280] hover:bg-[#F5F5F5] hover:text-[#111]'
                    }`
                  }
                >
                  {icon}
                  {label}
                </NavLink>
              ))}
            </div>
          </div>

          {/* SETTINGS section */}
          <div className="px-3 pt-4 pb-2">
            <p className="px-2 pb-2.5 text-[9px] font-bold tracking-[0.22em] uppercase text-[#C4C4C4]">Settings</p>
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-[13px] font-medium text-[#6B7280] hover:bg-[#F5F5F5] hover:text-[#111] transition-colors"
            >
              <svg className="h-[18px] w-[18px]" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
              </svg>
              Sign Out
            </button>
          </div>

          {/* User row */}
          <div className="border-t border-[#F5F5F5] px-4 py-3.5 flex items-center gap-2.5">
            <div className="h-8 w-8 rounded-full bg-[#f84d07]/15 flex items-center justify-center shrink-0">
              <span className="text-[11px] font-bold text-[#f84d07]">{initials}</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[12px] font-semibold text-[#111] truncate leading-tight">{admin?.email?.split('@')[0] || 'Admin'}</p>
              <p className="text-[10px] text-[#9CA3AF] truncate">Administrator</p>
            </div>
          </div>
        </aside>

        {/* Right panel */}
        <div className="flex-1 flex flex-col bg-[#F7F8FA] overflow-hidden">

          {/* Top bar */}
          <header className="flex items-center justify-end px-6 py-3.5 bg-white border-b border-[#F0F0F0] shrink-0">
            <div
              onClick={handleLogout}
              title="Sign Out"
              className="h-9 w-9 rounded-full bg-[#f84d07]/15 flex items-center justify-center ml-1 cursor-pointer hover:bg-[#f84d07]/25 transition-colors"
            >
              <span className="text-xs font-bold text-[#f84d07]">{initials}</span>
            </div>
          </header>

          {/* Page content */}
          <main className="flex-1 overflow-y-auto">
            <Outlet />
          </main>
        </div>
      </div>
      <ToastContainer
        position="bottom-right"
        theme="light"
        toastClassName="!rounded-2xl !shadow-lg !border !border-[#F0F0F0] !p-4"
        bodyClassName="!p-0 !m-0"
      />
    </div>
  )
}
