import { useEffect, useState } from 'react'
import api from '../api/axios'

const STATUS_OPTIONS = ['all', 'new', 'read', 'replied']
const dotColor = { new: 'bg-[#f84d07]', read: 'bg-blue-400', replied: 'bg-emerald-400' }
const tagStyle = {
  new: 'bg-[#f84d07]/10 text-[#f84d07]',
  read: 'bg-blue-50 text-blue-500',
  replied: 'bg-emerald-50 text-emerald-600',
}

export default function EnquiriesPage() {
  const [enquiries, setEnquiries] = useState([])
  const [filter, setFilter] = useState('all')
  const [selected, setSelected] = useState(null)
  const [loading, setLoading] = useState(true)

  const fetchEnquiries = () => {
    setLoading(true)
    const q = filter !== 'all' ? `?status=${filter}` : ''
    api.get(`/enquiries${q}`).then(({ data }) => setEnquiries(data.enquiries)).finally(() => setLoading(false))
  }

  useEffect(() => { fetchEnquiries() }, [filter])

  const updateStatus = async (id, status) => {
    await api.put(`/enquiries/${id}/status`, { status })
    setEnquiries((prev) => prev.map((e) => (e._id === id ? { ...e, status } : e)))
    if (selected?._id === id) setSelected((s) => ({ ...s, status }))
  }

  const handleDelete = async (id) => {
    if (!confirm('Delete this enquiry?')) return
    await api.delete(`/enquiries/${id}`)
    setEnquiries((prev) => prev.filter((e) => e._id !== id))
    if (selected?._id === id) setSelected(null)
  }

  const openEnquiry = (enquiry) => {
    setSelected(enquiry)
    if (enquiry.status === 'new') updateStatus(enquiry._id, 'read')
  }

  return (
    <div className="p-6">
      {/* Page header */}
      <div className="flex items-end justify-between mb-6">
        <div>
          <h1 className="text-xl font-bold text-[#111]">Enquiries</h1>
          <p className="text-xs text-[#9CA3AF] mt-0.5">View and manage incoming messages</p>
        </div>
        <div className="flex gap-1.5">
          {STATUS_OPTIONS.map((s) => (
            <button
              key={s}
              onClick={() => setFilter(s)}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold capitalize transition-colors ${
                filter === s
                  ? 'bg-[#f84d07] text-white shadow-sm'
                  : 'bg-white border border-[#F0F0F0] text-[#6B7280] hover:border-[#f84d07]/30 hover:text-[#f84d07]'
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      <div className="flex gap-5 items-start">
        {/* List */}
        <div className="flex-1 bg-white rounded-2xl border border-[#F0F0F0] shadow-sm overflow-hidden">
          {loading ? (
            <div className="py-16 text-center text-xs text-[#C4C4C4]">Loading…</div>
          ) : enquiries.length === 0 ? (
            <div className="py-16 text-center text-xs text-[#C4C4C4]">No enquiries found</div>
          ) : (
            <div className="divide-y divide-[#F8F8F8]">
              {enquiries.map((e) => (
                <button
                  key={e._id}
                  onClick={() => openEnquiry(e)}
                  className={`w-full text-left px-5 py-4 transition-colors ${
                    selected?._id === e._id
                      ? 'bg-[#f84d07]/5 border-l-[3px] border-[#f84d07]'
                      : 'hover:bg-[#FAFAFA] border-l-[3px] border-transparent'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-start gap-3 min-w-0">
                      <div className="h-8 w-8 rounded-full bg-[#F5F5F5] flex items-center justify-center shrink-0 mt-0.5">
                        <span className="text-[11px] font-bold text-[#9CA3AF]">{e.name?.[0]?.toUpperCase()}</span>
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <p className="text-sm font-semibold text-[#111] truncate">{e.name}</p>
                          {e.status === 'new' && <span className="h-1.5 w-1.5 rounded-full bg-[#f84d07] shrink-0" />}
                        </div>
                        <p className="text-[11px] text-[#9CA3AF] mt-0.5">{e.service || 'General enquiry'}</p>
                        <p className="text-[11px] text-[#C4C4C4] mt-1 truncate">{e.message?.slice(0, 55)}…</p>
                      </div>
                    </div>
                    <div className="text-right shrink-0">
                      <span className={`inline-block px-2 py-0.5 rounded-lg text-[10px] font-semibold capitalize ${tagStyle[e.status] || 'bg-[#F5F5F5] text-[#9CA3AF]'}`}>
                        {e.status}
                      </span>
                      <p className="text-[10px] text-[#C4C4C4] mt-1.5">{new Date(e.createdAt).toLocaleDateString()}</p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Detail panel */}
        {selected && (
          <div className="w-80 shrink-0 bg-white rounded-2xl border border-[#F0F0F0] shadow-sm overflow-hidden sticky top-6">
            <div className="flex items-start justify-between px-5 py-4 border-b border-[#F8F8F8]">
              <div className="flex items-center gap-3 min-w-0">
                <div className="h-9 w-9 rounded-full bg-[#f84d07]/15 flex items-center justify-center shrink-0">
                  <span className="text-[12px] font-bold text-[#f84d07]">{selected.name?.[0]?.toUpperCase()}</span>
                </div>
                <div className="min-w-0">
                  <p className="font-semibold text-[#111] text-sm truncate">{selected.name}</p>
                  <p className="text-[11px] text-[#9CA3AF] truncate">{selected.email}</p>
                </div>
              </div>
              <button onClick={() => setSelected(null)} className="text-[#C4C4C4] hover:text-[#888] transition-colors shrink-0 ml-2">
                <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Metadata */}
            <div className="px-5 py-4 space-y-2.5 border-b border-[#F8F8F8]">
              {[
                ['Phone', selected.phone],
                ['Company', selected.company],
                ['Service', selected.service],
                ['Budget', selected.budget],
                ['Date', new Date(selected.createdAt).toLocaleString()],
              ].filter(([, v]) => v).map(([k, v]) => (
                <div key={k} className="flex gap-3 items-start">
                  <span className="text-[10px] font-semibold text-[#C4C4C4] uppercase tracking-wide w-14 shrink-0 pt-0.5">{k}</span>
                  <span className="text-xs text-[#6B7280] leading-snug">{v}</span>
                </div>
              ))}
            </div>

            {/* Message */}
            <div className="px-5 py-4 border-b border-[#F8F8F8]">
              <p className="text-xs text-[#6B7280] leading-relaxed">{selected.message}</p>
            </div>

            {/* Actions */}
            <div className="px-5 py-4 space-y-2">
              <p className="text-[10px] font-semibold text-[#C4C4C4] uppercase tracking-wide mb-3">Update Status</p>
              <div className="flex gap-2">
                {['read', 'replied'].map((s) => (
                  <button
                    key={s}
                    onClick={() => updateStatus(selected._id, s)}
                    disabled={selected.status === s}
                    className={`flex-1 py-2 rounded-xl text-xs font-semibold capitalize transition-colors ${
                      selected.status === s
                        ? 'bg-[#F5F5F5] text-[#C4C4C4] cursor-default'
                        : 'border border-[#F0F0F0] text-[#6B7280] hover:border-[#f84d07]/30 hover:text-[#f84d07] hover:bg-[#f84d07]/5'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
              <button
                onClick={() => handleDelete(selected._id)}
                className="w-full py-2 rounded-xl text-xs font-semibold text-[#C4C4C4] hover:text-red-500 hover:bg-red-50 border border-transparent hover:border-red-100 transition-colors"
              >
                Delete Enquiry
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
