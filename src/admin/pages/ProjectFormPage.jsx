import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import api from '../api/axios'

const CATEGORIES = ['Residential', 'Commercial', 'Infrastructure', 'Renovation', 'Interior']

const AMENITY_SUGGESTIONS = [
  'Swimming Pool', 'Gymnasium', 'Parking', 'Security', 'Power Backup',
  'Elevator', 'Clubhouse', 'Garden', 'Jogging Track', 'Children Play Area',
  'CCTV Surveillance', 'Indoor Games', 'Multipurpose Hall', 'Wi-Fi Connectivity',
  'Solar Panels', 'EV Charging', 'Rainwater Harvesting', 'Waste Management',
]

const NEARBY_TYPES = [
  { value: 'education', label: 'Education' },
  { value: 'healthcare', label: 'Healthcare' },
  { value: 'shopping', label: 'Shopping' },
  { value: 'transport', label: 'Transport' },
  { value: 'dining', label: 'Dining' },
  { value: 'recreation', label: 'Recreation' },
  { value: 'other', label: 'Other' },
]

export default function ProjectFormPage() {
  const { id } = useParams()
  const isEdit = Boolean(id)
  const navigate = useNavigate()

  const [form, setForm] = useState({
    title: '', slug: '', category: '', description: '',
    location: '', year: '', status: 'completed', featured: false,
    amenities: [], nearbyLocations: [],
  })
  const [amenityInput, setAmenityInput] = useState('')
  const [coverFile, setCoverFile] = useState(null)
  const [imageFiles, setImageFiles] = useState([])
  const [existingImages, setExistingImages] = useState([])
  const [coverPreview, setCoverPreview] = useState(null)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!isEdit) return
    api.get(`/projects/${id}`).then(({ data }) => {
      setForm({
        title: data.title, slug: data.slug, category: data.category,
        description: data.description || '', location: data.location || '',
        year: data.year || '', status: data.status, featured: data.featured,
        amenities: data.amenities || [], nearbyLocations: data.nearbyLocations || [],
      })
      setCoverPreview(data.coverImage?.url || null)
      setExistingImages(data.images || [])
    })
  }, [id, isEdit])

  const addAmenity = (val) => {
    const v = val.trim()
    if (!v || form.amenities.includes(v)) return
    setForm((prev) => ({ ...prev, amenities: [...prev.amenities, v] }))
    setAmenityInput('')
  }

  const removeAmenity = (idx) =>
    setForm((prev) => ({ ...prev, amenities: prev.amenities.filter((_, i) => i !== idx) }))

  const addNearby = () =>
    setForm((prev) => ({ ...prev, nearbyLocations: [...prev.nearbyLocations, { name: '', distance: '', type: 'other' }] }))

  const updateNearby = (idx, field, value) =>
    setForm((prev) => ({
      ...prev,
      nearbyLocations: prev.nearbyLocations.map((loc, i) => i === idx ? { ...loc, [field]: value } : loc),
    }))

  const removeNearby = (idx) =>
    setForm((prev) => ({ ...prev, nearbyLocations: prev.nearbyLocations.filter((_, i) => i !== idx) }))

  const slugify = (str) => str.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
      ...(name === 'title' && !isEdit ? { slug: slugify(value) } : {}),
    }))
  }

  const handleCover = (e) => {
    const file = e.target.files[0]
    if (!file) return
    setCoverFile(file)
    setCoverPreview(URL.createObjectURL(file))
  }

  const handleImages = (e) => {
    setImageFiles(Array.from(e.target.files))
  }

  const removeExistingImage = async (publicId) => {
    if (!confirm('Remove this image?')) return
    await api.delete(`/projects/${id}/images`, { data: { publicId } })
    setExistingImages((prev) => prev.filter((i) => i.publicId !== publicId))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSaving(true)
    setError('')

    try {
      const fd = new FormData()
      Object.entries(form).forEach(([k, v]) => fd.append(k, v))
      if (coverFile) fd.append('coverImage', coverFile)
      imageFiles.forEach((f) => fd.append('images', f))

      if (isEdit) {
        await api.put(`/projects/${id}`, fd)
      } else {
        await api.post('/projects', fd)
      }
      navigate('/admin/projects')
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong')
    } finally {
      setSaving(false)
    }
  }

  const inputClass = 'w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm text-gray-900 focus:border-[#f84d07] focus:outline-none focus:ring-2 focus:ring-[#f84d07]/20'
  const labelClass = 'block text-xs font-semibold text-gray-600 uppercase tracking-wide mb-1.5'

  return (
    <div className="p-8 max-w-3xl">
      <div className="flex items-center gap-3 mb-8">
        <button onClick={() => navigate('/admin/projects')} className="text-gray-400 hover:text-gray-600">
          <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
        </button>
        <h1 className="text-2xl font-black text-gray-900">{isEdit ? 'Edit Project' : 'New Project'}</h1>
      </div>

      {error && <div className="mb-5 bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-3 rounded-xl">{error}</div>}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 space-y-5">
          <h2 className="font-bold text-gray-900 text-sm uppercase tracking-wide">Basic Info</h2>

          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2">
              <label className={labelClass}>Title *</label>
              <input name="title" required value={form.title} onChange={handleChange} placeholder="Project name" className={inputClass} />
            </div>
            <div className="col-span-2">
              <label className={labelClass}>Slug *</label>
              <input name="slug" required value={form.slug} onChange={handleChange} placeholder="project-slug" className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>Category *</label>
              <select name="category" required value={form.category} onChange={handleChange} className={inputClass}>
                <option value="">Select category</option>
                {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className={labelClass}>Status</label>
              <select name="status" value={form.status} onChange={handleChange} className={inputClass}>
                <option value="completed">Completed</option>
                <option value="ongoing">Ongoing</option>
              </select>
            </div>
            <div>
              <label className={labelClass}>Location</label>
              <input name="location" value={form.location} onChange={handleChange} placeholder="Dubai, UAE" className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>Year</label>
              <input name="year" value={form.year} onChange={handleChange} placeholder="2024" className={inputClass} />
            </div>
            <div className="col-span-2">
              <label className={labelClass}>Description</label>
              <textarea name="description" rows={4} value={form.description} onChange={handleChange} placeholder="Project description…" className={`${inputClass} resize-none`} />
            </div>
            <div className="col-span-2 flex items-center gap-2">
              <input type="checkbox" id="featured" name="featured" checked={form.featured} onChange={handleChange} className="h-4 w-4 accent-[#f84d07]" />
              <label htmlFor="featured" className="text-sm font-medium text-gray-700">Mark as featured</label>
            </div>
          </div>
        </div>

        {/* Cover image */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 space-y-4">
          <h2 className="font-bold text-gray-900 text-sm uppercase tracking-wide">Cover Image</h2>
          {coverPreview && (
            <img src={coverPreview} alt="cover" className="h-40 w-full object-cover rounded-xl" />
          )}
          <label className="flex items-center gap-2 cursor-pointer w-fit">
            <span className="text-sm font-medium text-[#f84d07] border border-[#f84d07]/30 rounded-xl px-4 py-2 hover:bg-[#f84d07]/5 transition-colors">
              {coverPreview ? 'Change cover' : 'Upload cover'}
            </span>
            <input type="file" accept="image/*" className="hidden" onChange={handleCover} />
          </label>
        </div>

        {/* Gallery images */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 space-y-4">
          <h2 className="font-bold text-gray-900 text-sm uppercase tracking-wide">Gallery Images</h2>
          {existingImages.length > 0 && (
            <div className="grid grid-cols-4 gap-3">
              {existingImages.map((img) => (
                <div key={img.publicId} className="relative group">
                  <img src={img.url} alt="" className="h-24 w-full object-cover rounded-xl" />
                  {isEdit && (
                    <button
                      type="button"
                      onClick={() => removeExistingImage(img.publicId)}
                      className="absolute top-1 right-1 h-6 w-6 bg-red-500 text-white rounded-full text-xs opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
                    >
                      ×
                    </button>
                  )}
                </div>
              ))}
            </div>
          )}
          <label className="flex items-center gap-2 cursor-pointer w-fit">
            <span className="text-sm font-medium text-[#f84d07] border border-[#f84d07]/30 rounded-xl px-4 py-2 hover:bg-[#f84d07]/5 transition-colors">
              {imageFiles.length > 0 ? `${imageFiles.length} file(s) selected` : 'Upload images'}
            </span>
            <input type="file" accept="image/*" multiple className="hidden" onChange={handleImages} />
          </label>
        </div>

        <div className="flex gap-3">
          <button
            type="submit"
            disabled={saving}
            className="bg-[#f84d07] hover:bg-[#d94206] disabled:opacity-60 text-white font-semibold px-7 py-3 rounded-xl transition-colors text-sm"
          >
            {saving ? 'Saving…' : isEdit ? 'Save Changes' : 'Create Project'}
          </button>
          <button type="button" onClick={() => navigate('/admin/projects')} className="px-7 py-3 rounded-xl border border-gray-200 text-sm font-semibold text-gray-600 hover:bg-gray-50 transition-colors">
            Cancel
          </button>
        </div>
      </form>
    </div>
  )
}
