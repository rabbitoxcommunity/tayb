import { useEffect, useState, useRef } from 'react'
import { toast } from 'react-toastify'
import api from '../api/axios'
import { useConfirm } from '../contexts/ConfirmContext'

export default function GalleryPage() {
  const confirm = useConfirm()
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
      toast.success(`${files.length} image${files.length > 1 ? 's' : ''} uploaded`)
    } catch {
      toast.error('Upload failed. Please try again.')
    } finally {
      setUploading(false)
    }
  }

  const handleDelete = async (id) => {
    const ok = await confirm({
      title: 'Delete this image?',
      message: 'This will permanently remove the image from the gallery.',
    })
    if (!ok) return
    await api.delete(`/gallery/${id}`)
    setImages((prev) => prev.filter((i) => i._id !== id))
    setTotal((t) => t - 1)
    toast.success('Image deleted')
  }

  return (
    <div className="p-6">
      {/* Page header */}
      <div className="flex items-end justify-between mb-6">
        <div>
          <h1 className="text-xl font-bold text-[#111]">Gallery</h1>
          <p className="text-xs text-[#9CA3AF] mt-0.5">{total > 0 ? `${total} images` : 'No images yet'}</p>
        </div>
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            placeholder="Category (optional)"
            className="bg-white border border-[#F0F0F0] rounded-xl px-3.5 py-2.5 text-xs text-[#111] placeholder:text-[#C4C4C4] focus:outline-none focus:ring-2 focus:ring-[#f84d07]/20 focus:border-[#f84d07]/30 transition-all shadow-sm w-40"
          />
          <label className={`inline-flex items-center gap-1.5 text-xs font-semibold px-4 py-2.5 rounded-xl cursor-pointer transition-colors shadow-sm ${uploading ? 'bg-[#F5F5F5] text-[#C4C4C4]' : 'bg-[#f84d07] hover:bg-[#d94206] text-white'}`}>
            <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
            </svg>
            {uploading ? 'Uploading…' : 'Upload'}
            <input ref={fileRef} type="file" accept="image/*" multiple className="hidden" onChange={handleUpload} disabled={uploading} />
          </label>
        </div>
      </div>

      {images.length === 0 ? (
        <div className="bg-white rounded-2xl border-2 border-dashed border-[#EBEBEB] p-20 text-center shadow-sm">
          <div className="h-12 w-12 rounded-2xl bg-[#F5F5F5] flex items-center justify-center mx-auto mb-3">
            <svg className="h-6 w-6 text-[#C4C4C4]" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
            </svg>
          </div>
          <p className="text-sm font-medium text-[#9CA3AF]">No images yet</p>
          <p className="text-xs text-[#C4C4C4] mt-1">Upload images to get started</p>
        </div>
      ) : (
        <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3">
          {images.map((img) => (
            <div key={img._id} className="group relative bg-[#F5F5F5] aspect-square rounded-2xl overflow-hidden border border-[#F0F0F0] shadow-sm">
              <img src={img.url} alt={img.caption || ''} className="h-full w-full object-cover" />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2 p-3">
                {img.category && (
                  <span className="text-[9px] font-semibold text-white/80 bg-white/20 backdrop-blur-sm px-2 py-0.5 rounded-lg">{img.category}</span>
                )}
                <button
                  onClick={() => handleDelete(img._id)}
                  className="text-xs font-semibold text-white border border-white/30 bg-white/10 hover:bg-red-500 hover:border-red-500 rounded-lg px-3 py-1.5 transition-colors"
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
