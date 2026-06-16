import { useEffect, useState } from 'react'
import api from '../api/axios'

const STATUS_OPTIONS = ['all', 'new', 'read', 'replied']

const statusStyle = {
  new: 'bg-[#f84d07]/10 text-[#f84d07]',
  read: 'bg-blue-100 text-blue-700',
  replied: 'bg-green-100 text-green-700',
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

  const openEnquiry = async (enquiry) => {
    setSelected(enquiry)
    if (enquiry.status === 'new') updateStatus(enquiry._id, 'read')
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-black text-gray-900 mb-6">Enquiries</h1>

      {/* Filter tabs */}
      <div className="flex gap-2 mb-6">
        {STATUS_OPTIONS.map((s) => (
          <button
            key={s}
            onClick={() => setFilter(s)}
            className={`px-4 py-2 rounded-xl text-sm font-semibold capitalize transition-colors ${filter === s ? 'bg-[#f84d07] text-white' : 'bg-white border border-gray-200 text-gray-600 hover:border-[#f84d07]/30'}`}
          >
            {s}
          </button>
        ))}
      </div>

      <div className="flex gap-6">
        {/* List */}
        <div className="flex-1 bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          {loading ? (
            <div className="p-10 text-center text-gray-400">Loading…</div>
          ) : enquiries.length === 0 ? (
            <div className="p-10 text-center text-gray-400">No enquiries found</div>
          ) : (
            <div className="divide-y divide-gray-50">
              {enquiries.map((e) => (
                <div
                  key={e._id}
                  onClick={() => openEnquiry(e)}
                  className={`px-6 py-4 cursor-pointer hover:bg-gray-50 transition-colors ${selected?._id === e._id ? 'bg-[#f84d07]/5 border-l-2 border-[#f84d07]' : ''}`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 mb-0.5">
                        <p className="font-semibold text-gray-900 text-sm truncate">{e.name}</p>
                        {e.status === 'new' && <span className="h-2 w-2 rounded-full bg-[#f84d07] shrink-0" />}
                      </div>
                      <p className="text-xs text-gray-500 truncate">{e.service || 'General enquiry'}</p>
                      <p className="text-xs text-gray-400 mt-1 truncate">{e.message.slice(0, 60)}…</p>
                    </div>
                    <div className="text-right shrink-0">
                      <span className={`px-2 py-0.5 rounded-full text-xs font-semibold capitalize ${statusStyle[e.status]}`}>{e.status}</span>
                      <p className="text-xs text-gray-400 mt-1">{new Date(e.createdAt).toLocaleDateString()}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Detail panel */}
        {selected && (
          <div className="w-96 shrink-0 bg-white rounded-2xl shadow-sm border border-gray-100 p-6 self-start sticky top-6">
            <div className="flex items-start justify-between mb-5">
              <div>
                <h2 className="font-black text-gray-900">{selected.name}</h2>
                <p className="text-sm text-gray-500">{selected.email}</p>
              </div>
              <button onClick={() => setSelected(null)} className="text-gray-400 hover:text-gray-600">
                <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="space-y-3 text-sm mb-6">
              {selected.phone && <div><span className="font-semibold text-gray-500">Phone:</span> <span className="text-gray-800">{selected.phone}</span></div>}
              {selected.company && <div><span className="font-semibold text-gray-500">Company:</span> <span className="text-gray-800">{selected.company}</span></div>}
              {selected.service && <div><span className="font-semibold text-gray-500">Service:</span> <span className="text-gray-800">{selected.service}</span></div>}
              {selected.budget && <div><span className="font-semibold text-gray-500">Budget:</span> <span className="text-gray-800">{selected.budget}</span></div>}
              <div><span className="font-semibold text-gray-500">Date:</span> <span className="text-gray-800">{new Date(selected.createdAt).toLocaleString()}</span></div>
            </div>

            <div className="bg-gray-50 rounded-xl p-4 text-sm text-gray-700 leading-relaxed mb-6">
              {selected.message}
            </div>

            {/* Status update */}
            <div className="space-y-2">
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Update Status</p>
              <div className="flex gap-2">
                {['read', 'replied'].map((s) => (
                  <button
                    key={s}
                    onClick={() => updateStatus(selected._id, s)}
                    disabled={selected.status === s}
                    className={`flex-1 py-2 rounded-xl text-xs font-semibold capitalize transition-colors ${selected.status === s ? 'bg-gray-100 text-gray-400' : 'border border-gray-200 text-gray-600 hover:border-[#f84d07]/30 hover:text-[#f84d07]'}`}
                  >
                    {s}
                  </button>
                ))}
              </div>
              <button
                onClick={() => handleDelete(selected._id)}
                className="w-full py-2 rounded-xl text-xs font-semibold text-red-500 border border-red-100 hover:bg-red-50 transition-colors"
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
