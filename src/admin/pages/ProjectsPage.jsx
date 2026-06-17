import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import api from '../api/axios'
import { useConfirm } from '../contexts/ConfirmContext'

export default function ProjectsPage() {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)

  const confirm = useConfirm()

  const fetchProjects = () => {
    setLoading(true)
    api.get('/projects').then((res) => setProjects(res.data)).finally(() => setLoading(false))
  }

  useEffect(() => { fetchProjects() }, [])

  const handleDelete = async (id) => {
    const ok = await confirm({
      title: 'Delete this project?',
      message: 'This will permanently remove the project and all its images.',
    })
    if (!ok) return
    await api.delete(`/projects/${id}`)
    fetchProjects()
    toast.success('Project deleted')
  }

  return (
    <div className="p-6">
      {/* Page header */}
      <div className="flex items-end justify-between mb-6">
        <div>
          <h1 className="text-xl font-bold text-[#111]">Projects</h1>
          <p className="text-xs text-[#9CA3AF] mt-0.5">Manage your project portfolio</p>
        </div>
        <Link
          to="/admin/projects/new"
          className="inline-flex items-center gap-2 bg-[#f84d07] hover:bg-[#d94206] text-white text-xs font-semibold px-4 py-2.5 rounded-xl transition-colors shadow-sm"
        >
          <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
          New Project
        </Link>
      </div>

      <div className="bg-white rounded-2xl border border-[#F0F0F0] shadow-sm overflow-hidden">
        {loading ? (
          <div className="py-16 text-center text-xs text-[#C4C4C4]">Loading…</div>
        ) : projects.length === 0 ? (
          <div className="py-16 text-center">
            <div className="h-12 w-12 rounded-2xl bg-[#F5F5F5] flex items-center justify-center mx-auto mb-3">
              <svg className="h-6 w-6 text-[#C4C4C4]" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21" />
              </svg>
            </div>
            <p className="text-sm text-[#9CA3AF] font-medium">No projects yet</p>
            <p className="text-xs text-[#C4C4C4] mt-1">Add your first project to get started</p>
          </div>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[#F5F5F5] bg-[#FAFAFA]">
                <th className="text-left px-5 py-3.5 text-[11px] font-semibold text-[#9CA3AF]">Project</th>
                <th className="text-left px-4 py-3.5 text-[11px] font-semibold text-[#9CA3AF]">Project Type</th>
                <th className="text-left px-4 py-3.5 text-[11px] font-semibold text-[#9CA3AF]">Property Type</th>
                <th className="text-left px-4 py-3.5 text-[11px] font-semibold text-[#9CA3AF]">Year</th>
                <th className="px-4 py-3.5" />
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F8F8F8]">
              {projects.map((p) => (
                <tr key={p._id} className="group hover:bg-[#FAFAFA] transition-colors">
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      {p.coverImage?.url ? (
                        <img src={p.coverImage.url} alt={p.title} className="h-10 w-14 rounded-xl object-cover shrink-0 border border-[#F0F0F0]" />
                      ) : (
                        <div className="h-10 w-14 rounded-xl bg-[#F5F5F5] shrink-0 flex items-center justify-center border border-[#F0F0F0]">
                          <svg className="h-4 w-4 text-[#CCC]" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159" />
                          </svg>
                        </div>
                      )}
                      <div>
                        <p className="font-semibold text-[#111] text-sm">{p.title}</p>
                        {p.location && <p className="text-[11px] text-[#9CA3AF] mt-0.5">{p.location}</p>}
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <span className="text-xs bg-[#f84d07]/10 text-[#f84d07] px-2.5 py-1 rounded-lg font-medium">{p.projectType || '—'}</span>
                  </td>
                  <td className="px-4 py-4">
                    <span className="text-xs bg-[#F5F5F5] text-[#6B7280] px-2.5 py-1 rounded-lg font-medium">{p.propertyType || '—'}</span>
                  </td>
                  <td className="px-4 py-4">
                    <span className="text-xs text-[#9CA3AF]">{p.year || '—'}</span>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-2 justify-end opacity-0 group-hover:opacity-100 transition-opacity">
                      <Link
                        to={`/admin/projects/${p._id}/edit`}
                        className="text-xs font-semibold text-[#6B7280] hover:text-[#f84d07] bg-[#F5F5F5] hover:bg-[#f84d07]/10 px-3 py-1.5 rounded-lg transition-colors"
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => handleDelete(p._id)}
                        className="text-xs font-semibold text-[#9CA3AF] hover:text-red-500 bg-[#F5F5F5] hover:bg-red-50 px-3 py-1.5 rounded-lg transition-colors"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}
