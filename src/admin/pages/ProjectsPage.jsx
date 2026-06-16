import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import api from '../api/axios'

export default function ProjectsPage() {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchProjects = () => {
    setLoading(true)
    api.get('/projects').then((res) => setProjects(res.data)).finally(() => setLoading(false))
  }

  useEffect(() => { fetchProjects() }, [])

  const handleDelete = async (id) => {
    if (!confirm('Delete this project?')) return
    await api.delete(`/projects/${id}`)
    fetchProjects()
  }

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-black text-gray-900">Projects</h1>
        <Link
          to="/admin/projects/new"
          className="inline-flex items-center gap-2 bg-[#f84d07] hover:bg-[#d94206] text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-colors"
        >
          <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
          Add Project
        </Link>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        {loading ? (
          <div className="p-10 text-center text-gray-400">Loading…</div>
        ) : projects.length === 0 ? (
          <div className="p-10 text-center text-gray-400">No projects yet</div>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50">
                <th className="text-left px-6 py-3 font-semibold text-gray-600">Project</th>
                <th className="text-left px-4 py-3 font-semibold text-gray-600">Category</th>
                <th className="text-left px-4 py-3 font-semibold text-gray-600">Status</th>
                <th className="text-left px-4 py-3 font-semibold text-gray-600">Featured</th>
                <th className="px-4 py-3" />
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {projects.map((p) => (
                <tr key={p._id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      {p.coverImage?.url ? (
                        <img src={p.coverImage.url} alt={p.title} className="h-10 w-14 rounded-lg object-cover shrink-0" />
                      ) : (
                        <div className="h-10 w-14 rounded-lg bg-gray-100 shrink-0" />
                      )}
                      <div>
                        <p className="font-semibold text-gray-900">{p.title}</p>
                        <p className="text-xs text-gray-400">{p.location}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4 text-gray-600 capitalize">{p.category}</td>
                  <td className="px-4 py-4">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-semibold capitalize ${p.status === 'completed' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'}`}>
                      {p.status}
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    {p.featured && <span className="text-[#f84d07] text-xs font-semibold">✦ Featured</span>}
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-2 justify-end">
                      <Link
                        to={`/admin/projects/${p._id}/edit`}
                        className="text-xs font-medium text-gray-600 hover:text-[#f84d07] transition-colors px-3 py-1.5 rounded-lg border border-gray-200 hover:border-[#f84d07]/30"
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => handleDelete(p._id)}
                        className="text-xs font-medium text-red-500 hover:text-red-700 transition-colors px-3 py-1.5 rounded-lg border border-red-100 hover:border-red-300"
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
