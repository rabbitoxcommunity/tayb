import { useEffect, useState } from 'react'
import api from '../api/axios'

const dotColor = { new: 'bg-[#f84d07]', read: 'bg-blue-400', replied: 'bg-emerald-400' }

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
        gallery: gallery.data.total ?? 0,
        newEnquiries: enquiries.data.enquiries.filter((e) => e.status === 'new').length,
        totalEnquiries: enquiries.data.total,
      })
      setRecentEnquiries(enquiries.data.enquiries)
    }).catch(() => {})
  }, [])

  const statCards = stats ? [
    { label: 'Total Projects', value: stats.projects, icon: <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75" /></svg> },
    { label: 'Gallery Images', value: stats.gallery, icon: <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5z" /></svg> },
    { label: 'New Enquiries', value: stats.newEnquiries, accent: true, icon: <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" /></svg> },
    { label: 'Total Enquiries', value: stats.totalEnquiries, icon: <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg> },
  ] : []

  return (
    <div className="p-6">
      {/* Page header */}
      <div className="mb-6">
        <h1 className="text-xl font-bold text-[#111]">Dashboard</h1>
        <p className="text-xs text-[#9CA3AF] mt-0.5">Welcome back — here's what's happening.</p>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {stats === null
          ? Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="bg-white rounded-2xl p-5 animate-pulse h-28 border border-[#F0F0F0]" />
            ))
          : statCards.map(({ label, value, icon, accent }) => (
              <div key={label} className="bg-white rounded-2xl p-5 border border-[#F0F0F0] shadow-sm hover:shadow-md transition-shadow">
                <div className={`h-9 w-9 rounded-xl flex items-center justify-center mb-4 ${accent ? 'bg-[#f84d07] text-white' : 'bg-[#F5F5F5] text-[#9CA3AF]'}`}>
                  {icon}
                </div>
                <p className={`text-3xl font-black ${accent ? 'text-[#f84d07]' : 'text-[#111]'}`}>{value}</p>
                <p className="text-xs text-[#9CA3AF] mt-1">{label}</p>
              </div>
            ))
        }
      </div>

      {/* Recent enquiries */}
      <div className="bg-white rounded-2xl border border-[#F0F0F0] shadow-sm overflow-hidden">
        <div className="flex items-center justify-between px-5 py-4 border-b border-[#F5F5F5]">
          <h2 className="text-sm font-semibold text-[#111]">Recent Enquiries</h2>
          <span className="text-[10px] font-semibold text-[#9CA3AF] bg-[#F5F5F5] px-2.5 py-1 rounded-full">{recentEnquiries.length} records</span>
        </div>
        <div className="divide-y divide-[#F8F8F8]">
          {recentEnquiries.length === 0 ? (
            <p className="text-center text-xs text-[#C4C4C4] py-10">No enquiries yet</p>
          ) : (
            recentEnquiries.map((e) => (
              <div key={e._id} className="flex items-center justify-between px-5 py-3.5 hover:bg-[#FAFAFA] transition-colors">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="h-8 w-8 rounded-full bg-[#f84d07]/10 flex items-center justify-center shrink-0">
                    <span className="text-[11px] font-bold text-[#f84d07]">{e.name?.[0]?.toUpperCase()}</span>
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-[#111] truncate">{e.name}</p>
                    <p className="text-[11px] text-[#9CA3AF] truncate">{e.email}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  <div className="flex items-center gap-1.5">
                    <span className={`h-1.5 w-1.5 rounded-full ${dotColor[e.status] || 'bg-[#DDD]'}`} />
                    <span className="text-[11px] text-[#9CA3AF] capitalize">{e.status}</span>
                  </div>
                  <span className="text-[11px] text-[#C4C4C4]">{new Date(e.createdAt).toLocaleDateString()}</span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}
