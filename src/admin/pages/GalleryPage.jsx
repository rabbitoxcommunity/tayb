import { useEffect, useState, useRef } from 'react'
import api from '../api/axios'

export default function GalleryPage() {
  const [images, setImages] = useState([])
  const [total, setTotal] = useState(0)
  const [uploading, setUploading] = useState(false)
  const [category, setCategory] = useState('')
  const fileRef = useRef()

  const fetchImages = () => {
    api.get('/gallery?limit=100').then(({ data }) => {
      setImages(data.images)
      setTotal(data.total)
    })
  }

  useEffect(() => { fetchImages() }, [])

  const handleUpload = async (e) => {
    const files = Array.from(e.target.files)
    if (!files.length) return
    setUploading(true)
    const fd = new FormData()
    files.forEach((f) => fd.append('images', f))
    if (category) fd.append('category', category)
    try {
      await api.post('/gallery', fd)
      fetchImages()
      fileRef.current.value = ''
    } finally {
      setUploading(false)
    }
  }

  const handleDelete = async (id) => {
    if (!confirm('Delete this image?')) return
    await api.delete(`/gallery/${id}`)
    setImages((prev) => prev.filter((i) => i._id !== id))
    setTotal((t) => t - 1)
  }

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-black text-gray-900">Gallery</h1>
          <p className="text-sm text-gray-500 mt-1">{total} images</p>
        </div>

        <div className="flex items-center gap-3">
          <input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            placeholder="Category (optional)"
            className="border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#f84d07] w-44"
          />
          <label className={`inline-flex items-center gap-2 text-sm font-semibold px-5 py-2.5 rounded-xl transition-colors cursor-pointer ${uploading ? 'bg-gray-300 text-gray-500' : 'bg-[#f84d07] hover:bg-[#d94206] text-white'}`}>
            <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
            </svg>
            {uploading ? 'Uploading…' : 'Upload Images'}
            <input ref={fileRef} type="file" accept="image/*" multiple className="hidden" onChange={handleUpload} disabled={uploading} />
          </label>
        </div>
      </div>

      {images.length === 0 ? (
        <div className="bg-white rounded-2xl border border-dashed border-gray-200 p-20 text-center">
          <svg className="h-10 w-10 text-gray-300 mx-auto mb-3" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <p className="text-gray-400 text-sm">No images yet. Upload some above.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {images.map((img) => (
            <div key={img._id} className="group relative rounded-2xl overflow-hidden bg-gray-100 aspect-square">
              <img src={img.url} alt={img.caption || ''} className="h-full w-full object-cover" />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2 p-3">
                {img.category && <span className="text-xs text-white/80 bg-black/30 px-2 py-0.5 rounded-full">{img.category}</span>}
                <button
                  onClick={() => handleDelete(img._id)}
                  className="bg-red-500 hover:bg-red-600 text-white text-xs font-semibold px-4 py-1.5 rounded-lg transition-colors"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
