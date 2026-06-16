import { useEffect, useState } from 'react'
import api from '../api/axios'

export default function DashboardPage() {
  const [stats, setStats] = useState(null)
  const [recentEnquiries, setRecentEnquiries] = useState([])

  useEffect(() => {
    Promise.all([
      api.get('/projects'),
      api.get('/gallery'),
      api.get('/enquiries?limit=5'),
    ]).then(([projects, gallery, enquiries]) => {
      setStats({
        projects: projects.data.length,
        gallery: gallery.data.total,
        newEnquiries: enquiries.data.enquiries.filter((e) => e.status === 'new').length,
        totalEnquiries: enquiries.data.total,
      })
      setRecentEnquiries(enquiries.data.enquiries)
    }).catch(() => {})
  }, [])

  const cards = stats ? [
    { label: 'Total Projects', value: stats.projects, color: 'bg-blue-500', icon: <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5" /></svg> },
    { label: 'Gallery Images', value: stats.gallery, color: 'bg-purple-500', icon: <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg> },
    { label: 'New Enquiries', value: stats.newEnquiries, color: 'bg-[#f84d07]', icon: <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg> },
    { label: 'Total Enquiries', value: stats.totalEnquiries, color: 'bg-green-500', icon: <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg> },
  ] : []

  const statusBadge = (status) => {
    const map = { new: 'bg-[#f84d07]/10 text-[#f84d07]', read: 'bg-blue-100 text-blue-700', replied: 'bg-green-100 text-green-700' }
    return <span className={`px-2 py-0.5 rounded-full text-xs font-semibold capitalize ${map[status]}`}>{status}</span>
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-black text-gray-900 mb-8">Dashboard</h1>

      {/* Stat cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
        {stats === null
          ? Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 animate-pulse h-28" />
            ))
          : cards.map(({ label, value, color, icon }) => (
              <div key={label} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <div className={`${color} h-10 w-10 rounded-xl flex items-center justify-center text-white mb-4`}>
                  {icon}
                </div>
                <p className="text-3xl font-black text-gray-900">{value}</p>
                <p className="text-sm text-gray-500 mt-1">{label}</p>
              </div>
            ))
        }
      </div>

      {/* Recent enquiries */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
        <div className="px-6 py-4 border-b border-gray-100">
          <h2 className="font-bold text-gray-900">Recent Enquiries</h2>
        </div>
        <div className="divide-y divide-gray-50">
          {recentEnquiries.length === 0 && (
            <p className="text-center text-gray-400 py-10 text-sm">No enquiries yet</p>
          )}
          {recentEnquiries.map((e) => (
            <div key={e._id} className="px-6 py-4 flex items-center justify-between gap-4">
              <div className="min-w-0">
                <p className="font-semibold text-gray-900 text-sm truncate">{e.name}</p>
                <p className="text-xs text-gray-500 truncate">{e.email} · {e.service || 'General'}</p>
              </div>
              <div className="flex items-center gap-3 shrink-0">
                {statusBadge(e.status)}
                <span className="text-xs text-gray-400">{new Date(e.createdAt).toLocaleDateString()}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
