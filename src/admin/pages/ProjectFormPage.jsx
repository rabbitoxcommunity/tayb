import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Underline from '@tiptap/extension-underline'
import { toast } from 'react-toastify'
import api from '../api/axios'
import { useConfirm } from '../contexts/ConfirmContext'

const PROJECT_TYPES = ['Ongoing', 'Ready to Move In', 'Completed', 'New Launch']
const PROPERTY_TYPES = ['Apartment', 'Villa', 'Studio', 'Penthouse', 'Townhouse', 'Other']

const AMENITY_SUGGESTIONS = [
  'Swimming Pool', 'Gymnasium', 'Parking', 'Security', 'Power Backup',
  'Elevator', 'Clubhouse', 'Garden', 'Jogging Track', 'Children Play Area',
  'CCTV Surveillance', 'Indoor Games', 'Multipurpose Hall', 'Wi-Fi Connectivity',
  'Solar Panels', 'EV Charging', 'Rainwater Harvesting', 'Waste Management',
]

const slugify = (str) => str.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')

function RichEditor({ value, onChange }) {
  const editor = useEditor({
    extensions: [StarterKit, Underline],
    content: value || '',
    onUpdate: ({ editor }) => onChange(editor.getHTML()),
    editorProps: { attributes: { class: 'tiptap-content px-4 py-3 min-h-[180px] text-sm text-[#111] outline-none' } },
  })

  useEffect(() => {
    if (editor && value && editor.getHTML() !== value) {
      editor.commands.setContent(value)
    }
  }, [editor, value])

  const Btn = ({ onClick, active, title, children }) => (
    <button
      type="button"
      title={title}
      onClick={onClick}
      className={`h-7 min-w-[28px] px-1.5 flex items-center justify-center rounded-lg text-xs font-semibold transition-colors ${
        active ? 'bg-[#f84d07] text-white' : 'text-[#6B7280] hover:bg-[#F0F0F0] hover:text-[#111]'
      }`}
    >
      {children}
    </button>
  )

  if (!editor) return null

  return (
    <div className="border border-[#EBEBEB] rounded-xl overflow-hidden transition-all focus-within:ring-2 focus-within:ring-[#f84d07]/20 focus-within:border-[#f84d07]/30">
      {/* Toolbar */}
      <div className="flex items-center gap-0.5 px-2 py-1.5 bg-[#FAFAFA] border-b border-[#F0F0F0] flex-wrap">
        <Btn onClick={() => editor.chain().focus().toggleBold().run()} active={editor.isActive('bold')} title="Bold">
          <strong>B</strong>
        </Btn>
        <Btn onClick={() => editor.chain().focus().toggleItalic().run()} active={editor.isActive('italic')} title="Italic">
          <em>I</em>
        </Btn>
        <Btn onClick={() => editor.chain().focus().toggleUnderline().run()} active={editor.isActive('underline')} title="Underline">
          <span className="underline">U</span>
        </Btn>
        <div className="w-px h-4 bg-[#E8E8E8] mx-1" />
        <Btn onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()} active={editor.isActive('heading', { level: 1 })} title="Heading 1">H1</Btn>
        <Btn onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} active={editor.isActive('heading', { level: 2 })} title="Heading 2">H2</Btn>
        <Btn onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()} active={editor.isActive('heading', { level: 3 })} title="Heading 3">H3</Btn>
        <div className="w-px h-4 bg-[#E8E8E8] mx-1" />
        <Btn onClick={() => editor.chain().focus().toggleBulletList().run()} active={editor.isActive('bulletList')} title="Bullet List">
          <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.008v.008H3.75V6.75zm0 5.25h.008v.008H3.75V12zm0 5.25h.008v.008H3.75v-.008z" />
          </svg>
        </Btn>
        <Btn onClick={() => editor.chain().focus().toggleOrderedList().run()} active={editor.isActive('orderedList')} title="Ordered List">
          <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.242 5.992h12m-12 6.003H20.24m-12 5.999h12M4.117 7.495v-3.75H2.99m1.125 3.75H2.99m1.125 0H5.24m-1.92 2.577a1.125 1.125 0 113.356 1.548l-2.305 2.426H5.24m-1.92 2.577a1.125 1.125 0 113.356 1.548l-2.305 2.426H5.24" />
          </svg>
        </Btn>
        <div className="w-px h-4 bg-[#E8E8E8] mx-1" />
        <Btn onClick={() => editor.chain().focus().clearNodes().unsetAllMarks().run()} title="Clear formatting">
          <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </Btn>
      </div>
      <EditorContent editor={editor} />
    </div>
  )
}

export default function ProjectFormPage() {
  const { id } = useParams()
  const isEdit = Boolean(id)
  const navigate = useNavigate()
  const confirm = useConfirm()

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: '', slug: '', projectType: '', propertyTypeSelect: '',
      propertyTypeCustom: '', subDescription: '', location: '', year: '', featured: false,
    },
  })

  const [mainDescription, setMainDescription] = useState('')
  const [amenityInput, setAmenityInput] = useState('')
  const [amenities, setAmenities] = useState([])
  const [nearbyLocations, setNearbyLocations] = useState([])
  const [coverFile, setCoverFile] = useState(null)
  const [imageFiles, setImageFiles] = useState([])
  const [existingImages, setExistingImages] = useState([])
  const [coverPreview, setCoverPreview] = useState(null)
  const [saving, setSaving] = useState(false)
  const [serverError, setServerError] = useState('')

  const titleValue = watch('title')
  const propertyTypeSelect = watch('propertyTypeSelect')
  const featuredValue = watch('featured')

  useEffect(() => {
    if (!isEdit && titleValue) {
      setValue('slug', slugify(titleValue), { shouldValidate: false })
    }
  }, [titleValue, isEdit, setValue])

  useEffect(() => {
    if (!isEdit) return
    api.get(`/projects/id/${id}`).then(({ data }) => {
      const knownType = PROPERTY_TYPES.includes(data.propertyType)
      reset({
        title: data.title,
        slug: data.slug,
        projectType: data.projectType || '',
        propertyTypeSelect: knownType ? data.propertyType : (data.propertyType ? 'Other' : ''),
        propertyTypeCustom: knownType ? '' : (data.propertyType || ''),
        subDescription: data.subDescription || '',
        location: data.location || '',
        year: data.year || '',
        featured: data.featured,
      })
      setMainDescription(data.mainDescription || '')
      setAmenities(data.amenities || [])
      setNearbyLocations(data.nearbyLocations || [])
      setCoverPreview(data.coverImage?.url || null)
      setExistingImages(data.images || [])
    })
  }, [id, isEdit, reset])

  const addAmenity = (val) => {
    const v = val.trim()
    if (!v || amenities.includes(v)) return
    setAmenities((prev) => [...prev, v])
    setAmenityInput('')
  }

  const removeAmenity = (idx) => setAmenities((prev) => prev.filter((_, i) => i !== idx))

  const addNearby = () =>
    setNearbyLocations((prev) => [...prev, { name: '', distance: '' }])

  const updateNearby = (idx, field, value) =>
    setNearbyLocations((prev) =>
      prev.map((loc, i) => (i === idx ? { ...loc, [field]: value } : loc))
    )

  const removeNearby = (idx) =>
    setNearbyLocations((prev) => prev.filter((_, i) => i !== idx))

  const handleCover = (e) => {
    const file = e.target.files[0]
    if (!file) return

    // Check size limit (10MB)
    const MAX_SIZE = 10 * 1024 * 1024 // 10MB
    if (file.size > MAX_SIZE) {
      toast.error('Please reduce the image file size. Cover image exceeds the 10MB limit.')
      e.target.value = ''
      return
    }

    setCoverFile(file)
    setCoverPreview(URL.createObjectURL(file))
  }

  const handleImages = (e) => {
    const files = Array.from(e.target.files)

    // 1. Check max files limit (30)
    if (files.length > 30) {
      toast.error('You can only upload a maximum of 30 images at a time.')
      e.target.value = ''
      return
    }

    // 2. Check each file size limit (10MB)
    const MAX_SIZE = 10 * 1024 * 1024 // 10MB
    const oversized = files.filter((f) => f.size > MAX_SIZE)
    if (oversized.length > 0) {
      const names = oversized.map((f) => f.name).join(', ')
      toast.error(`Please reduce the image file size. The following files exceed the 10MB limit: ${names}`)
      e.target.value = ''
      return
    }

    setImageFiles(files)
  }

  const removeExistingImage = async (publicId) => {
    const ok = await confirm({
      title: 'Remove this image?',
      message: 'This will permanently delete the image from the project.',
    })
    if (!ok) return
    await api.delete(`/projects/${id}/images`, { data: { publicId } })
    setExistingImages((prev) => prev.filter((i) => i.publicId !== publicId))
    toast.success('Image removed')
  }

  const onSubmit = async (data) => {
    setSaving(true)
    setServerError('')
    try {
      const propertyType = data.propertyTypeSelect === 'Other'
        ? data.propertyTypeCustom.trim()
        : data.propertyTypeSelect

      const fd = new FormData()
      fd.append('title', data.title)
      fd.append('slug', data.slug)
      fd.append('projectType', data.projectType)
      fd.append('subDescription', data.subDescription || '')
      fd.append('mainDescription', mainDescription || '')
      fd.append('location', data.location || '')
      fd.append('year', data.year || '')
      fd.append('featured', data.featured)
      fd.append('amenities', JSON.stringify(amenities))
      fd.append('nearbyLocations', JSON.stringify(nearbyLocations))
      if (propertyType) fd.append('propertyType', propertyType)
      if (coverFile) fd.append('coverImage', coverFile)
      imageFiles.forEach((f) => fd.append('images', f))

      if (isEdit) {
        await api.put(`/projects/${id}`, fd)
        toast.success('Project updated')
      } else {
        await api.post('/projects', fd)
        toast.success('Project created')
      }
      navigate('/admin/projects')
    } catch (err) {
      setServerError(err.response?.data?.message || 'Something went wrong')
    } finally {
      setSaving(false)
    }
  }

  const inp = (field) => [
    'w-full rounded-xl px-4 py-2.5 text-sm text-[#111] placeholder:text-[#C4C4C4] outline-none focus:ring-2 focus:bg-white border transition-all',
    errors[field]
      ? 'bg-red-50 border-red-300 focus:ring-red-500/20'
      : 'bg-[#F5F5F5] border-transparent focus:ring-[#f84d07]/20 focus:border-[#f84d07]/30',
  ].join(' ')

  const plainInp = 'w-full bg-[#F5F5F5] rounded-xl px-4 py-2.5 text-sm text-[#111] placeholder:text-[#C4C4C4] outline-none focus:ring-2 focus:ring-[#f84d07]/20 focus:bg-white border border-transparent focus:border-[#f84d07]/30 transition-all'
  const lbl = 'block text-[11px] font-semibold text-[#6B7280] mb-1.5'
  const fieldErr = (msg) => msg ? <p className="mt-1.5 text-[11px] text-red-500">{msg}</p> : null

  return (
    <div className="p-6 max-w-6xl">
      <div className="flex items-center gap-3 mb-6">
        <button
          onClick={() => navigate('/admin/projects')}
          className="h-8 w-8 flex items-center justify-center rounded-xl bg-white border border-[#F0F0F0] text-[#9CA3AF] hover:text-[#f84d07] hover:border-[#f84d07]/30 transition-colors shadow-sm"
        >
          <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
        </button>
        <div>
          <h1 className="text-xl font-bold text-[#111]">{isEdit ? 'Edit Project' : 'New Project'}</h1>
          <p className="text-xs text-[#9CA3AF] mt-0.5">{isEdit ? 'Update project details' : 'Fill in the project details below'}</p>
        </div>
      </div>

      {serverError && (
        <div className="mb-5 bg-red-50 border border-red-100 rounded-2xl px-4 py-3 text-xs text-red-500">{serverError}</div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">

        {/* Basic Info — full width */}
        <Card title="Basic Info">
          <div className="space-y-4">

            {/* Row 1: Title + Year */}
            <div className="grid grid-cols-[1fr_120px] gap-4 items-start">
              <div>
                <label className={lbl}>Title *</label>
                <input
                  placeholder="Project name"
                  className={inp('title')}
                  {...register('title', { required: 'Title is required' })}
                />
                {fieldErr(errors.title?.message)}
              </div>
              <div>
                <label className={lbl}>Year</label>
                <input
                  placeholder="2024"
                  className={inp('year')}
                  {...register('year', {
                    pattern: { value: /^\d{4}$/, message: 'Enter a valid 4-digit year' },
                  })}
                />
                {fieldErr(errors.year?.message)}
              </div>
            </div>

            <input type="hidden" {...register('slug', { required: true })} />

            {/* Row 2: Project Type, Property Type, Location */}
            <div className="grid grid-cols-3 gap-4 items-start">
              <div>
                <label className={lbl}>Project Type *</label>
                <select
                  className={inp('projectType')}
                  {...register('projectType', { required: 'Project type is required' })}
                >
                  <option value="">Select…</option>
                  {PROJECT_TYPES.map((t) => <option key={t}>{t}</option>)}
                </select>
                {fieldErr(errors.projectType?.message)}
              </div>

              <div>
                <label className={lbl}>Property Type</label>
                <select
                  className={inp('propertyTypeSelect')}
                  {...register('propertyTypeSelect')}
                  onChange={(e) => {
                    setValue('propertyTypeSelect', e.target.value)
                    if (e.target.value !== 'Other') setValue('propertyTypeCustom', '')
                  }}
                >
                  <option value="">Select…</option>
                  {PROPERTY_TYPES.map((t) => <option key={t}>{t}</option>)}
                </select>
                {propertyTypeSelect === 'Other' && (
                  <>
                    <input
                      placeholder="e.g. Duplex, Penthouse…"
                      className={`${inp('propertyTypeCustom')} mt-2`}
                      {...register('propertyTypeCustom', {
                        validate: (val) =>
                          propertyTypeSelect !== 'Other' || val?.trim()
                            ? true
                            : 'Please specify the property type',
                      })}
                    />
                    {fieldErr(errors.propertyTypeCustom?.message)}
                  </>
                )}
              </div>

              <div>
                <label className={lbl}>Location</label>
                <input
                  placeholder="Dubai, UAE"
                  className={inp('location')}
                  {...register('location')}
                />
              </div>
            </div>

            {/* Row 3: Sub Description */}
            <div>
              <label className={lbl}>Sub Description</label>
              <textarea
                rows={3}
                placeholder="Short project summary shown in the banner…"
                className={`${inp('subDescription')} resize-none`}
                {...register('subDescription')}
              />
            </div>

            {/* Featured toggle */}
            <div
              onClick={() => setValue('featured', !featuredValue)}
              className={`flex items-center justify-between gap-4 px-4 py-3.5 rounded-xl border cursor-pointer transition-all select-none ${
                featuredValue
                  ? 'bg-[#fff5f2] border-[#f84d07]/30'
                  : 'bg-[#F5F5F5] border-transparent hover:border-[#f84d07]/20'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className={`h-9 w-9 rounded-lg flex items-center justify-center shrink-0 transition-colors ${featuredValue ? 'bg-[#f84d07]' : 'bg-white border border-[#E0E0E0]'}`}>
                  <svg className={`h-4 w-4 transition-colors ${featuredValue ? 'text-white' : 'text-[#C4C4C4]'}`} fill="currentColor" viewBox="0 0 24 24">
                    <path d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                  </svg>
                </div>
                <div>
                  <p className={`text-[13px] font-semibold transition-colors ${featuredValue ? 'text-[#f84d07]' : 'text-[#111]'}`}>Featured Project</p>
                  <p className="text-[11px] text-[#9CA3AF] mt-0.5">Highlighted on homepage and listings</p>
                </div>
              </div>
              {/* Toggle switch */}
              <div className={`relative h-6 w-11 rounded-full transition-colors shrink-0 ${featuredValue ? 'bg-[#f84d07]' : 'bg-[#D1D5DB]'}`}>
                <div className={`absolute top-1 h-4 w-4 rounded-full bg-white shadow-sm transition-all ${featuredValue ? 'left-6' : 'left-1'}`} />
              </div>
              <input type="checkbox" {...register('featured')} className="hidden" />
            </div>

          </div>
        </Card>

        {/* Main Description — full width */}
        <Card title="Main Description">
          <RichEditor value={mainDescription} onChange={setMainDescription} />
        </Card>

        {/* Amenities + Nearby Locations side by side */}
        <div className="grid grid-cols-2 gap-5 items-start">

            {/* Amenities */}
            <Card title="Amenities">
              <div className="flex gap-2 mb-4">
                <input
                  value={amenityInput}
                  onChange={(e) => setAmenityInput(e.target.value)}
                  placeholder="Type custom amenity…"
                  className={plainInp}
                  onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); addAmenity(amenityInput) } }}
                />
                <button
                  type="button"
                  onClick={() => addAmenity(amenityInput)}
                  className="shrink-0 px-4 py-2.5 bg-[#f84d07] hover:bg-[#d94206] text-white text-xs font-semibold rounded-xl transition-colors shadow-sm"
                >
                  Add
                </button>
              </div>

              <div className="flex flex-wrap gap-2 mb-4">
                {AMENITY_SUGGESTIONS.map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => addAmenity(s)}
                    disabled={amenities.includes(s)}
                    className="px-3 py-1.5 rounded-xl text-xs font-medium border transition-colors disabled:opacity-30 disabled:cursor-not-allowed border-[#EBEBEB] text-[#6B7280] hover:border-[#f84d07]/40 hover:text-[#f84d07] hover:bg-[#f84d07]/5"
                  >
                    + {s}
                  </button>
                ))}
              </div>

              {amenities.length > 0 && (
                <div className="flex flex-wrap gap-2 pt-1 border-t border-[#F8F8F8]">
                  {amenities.map((a, i) => (
                    <span key={i} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#f84d07]/10 text-[#f84d07] text-xs font-semibold">
                      {a}
                      <button type="button" onClick={() => removeAmenity(i)} className="opacity-60 hover:opacity-100 transition-opacity">
                        <svg className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </Card>

            {/* Nearby Locations */}
            <Card title="Nearby Locations">
              {nearbyLocations.length > 0 && (
                <div className="space-y-2.5 mb-4">
                  <div className="grid grid-cols-[1fr_1fr_auto] gap-2">
                    {['Place Name', 'Distance', ''].map((h) => (
                      <span key={h} className={lbl}>{h}</span>
                    ))}
                  </div>
                  {nearbyLocations.map((loc, i) => (
                    <div key={i} className="grid grid-cols-[1fr_1fr_auto] gap-2 items-center">
                      <input value={loc.name} onChange={(e) => updateNearby(i, 'name', e.target.value)} placeholder="e.g. City Mall" className={plainInp} />
                      <input value={loc.distance} onChange={(e) => updateNearby(i, 'distance', e.target.value)} placeholder="e.g. 500m" className={plainInp} />
                      <button
                        type="button"
                        onClick={() => removeNearby(i)}
                        className="h-9 w-9 flex items-center justify-center rounded-xl text-[#C4C4C4] hover:text-red-500 hover:bg-red-50 transition-colors"
                      >
                        <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  ))}
                </div>
              )}
              <button
                type="button"
                onClick={addNearby}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border-2 border-dashed border-[#E8E8E8] text-xs font-semibold text-[#9CA3AF] hover:border-[#f84d07]/40 hover:text-[#f84d07] hover:bg-[#f84d07]/5 transition-colors"
              >
                <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>
                Add Location
              </button>
            </Card>

        </div>

        {/* Row 3 — Cover Image + Gallery */}
        <div className="grid grid-cols-2 gap-5">
          <Card title="Cover Image">
            {coverPreview && (
              <img src={coverPreview} alt="cover" className="h-40 w-full object-cover rounded-xl mb-3 border border-[#F0F0F0]" />
            )}
            <label className="inline-flex items-center gap-2 cursor-pointer">
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#f84d07] bg-[#f84d07]/10 hover:bg-[#f84d07]/15 px-4 py-2 rounded-xl transition-colors">
                <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
                </svg>
                {coverPreview ? 'Change cover' : 'Upload cover'}
              </span>
              <input type="file" accept="image/*" className="hidden" onChange={handleCover} />
            </label>
          </Card>

          <Card title="Gallery Images">
            {existingImages.length > 0 && (
              <div className="grid grid-cols-4 gap-2 mb-3">
                {existingImages.map((img) => (
                  <div key={img.publicId} className="relative group">
                    <img src={img.url} alt="" className="h-20 w-full object-cover rounded-xl border border-[#F0F0F0]" />
                    {isEdit && (
                      <button
                        type="button"
                        onClick={() => removeExistingImage(img.publicId)}
                        className="absolute inset-0 flex items-center justify-center bg-black/50 text-white text-[10px] font-semibold rounded-xl opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        Remove
                      </button>
                    )}
                  </div>
                ))}
              </div>
            )}
            <label className="inline-flex items-center gap-2 cursor-pointer">
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#f84d07] bg-[#f84d07]/10 hover:bg-[#f84d07]/15 px-4 py-2 rounded-xl transition-colors">
                <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
                </svg>
                {imageFiles.length > 0 ? `${imageFiles.length} selected` : 'Upload images'}
              </span>
              <input type="file" accept="image/*" multiple className="hidden" onChange={handleImages} />
            </label>
          </Card>
        </div>

        {/* Submit */}
        <div className="flex items-center gap-3 pt-2">
          <button
            type="submit"
            disabled={saving}
            className="bg-[#f84d07] hover:bg-[#d94206] disabled:opacity-50 text-white font-semibold px-7 py-3 rounded-xl text-sm transition-colors shadow-sm"
          >
            {saving ? 'Saving…' : isEdit ? 'Save Changes' : 'Create Project'}
          </button>
          <button
            type="button"
            onClick={() => navigate('/admin/projects')}
            className="px-7 py-3 rounded-xl bg-white border border-[#F0F0F0] text-sm font-medium text-[#6B7280] hover:text-[#111] hover:border-[#E0E0E0] transition-colors shadow-sm"
          >
            Cancel
          </button>
        </div>

      </form>
    </div>
  )
}

function Card({ title, children }) {
  return (
    <div className="bg-white rounded-2xl border border-[#F0F0F0] shadow-sm overflow-hidden">
      <div className="px-5 py-3.5 border-b border-[#F8F8F8]">
        <h2 className="text-sm font-semibold text-[#111]">{title}</h2>
      </div>
      <div className="p-5">{children}</div>
    </div>
  )
}
