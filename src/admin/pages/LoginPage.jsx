import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useAuth } from '../contexts/AuthContext'

export default function LoginPage() {
  const { register, handleSubmit, setError, formState: { errors, isSubmitting } } = useForm()
  const { login } = useAuth()
  const navigate = useNavigate()

  const onSubmit = async ({ email, password }) => {
    try {
      await login(email, password)
      navigate('/admin')
    } catch {
      setError('root', { message: 'Invalid email or password' })
    }
  }

  const inp = (field) => [
    'w-full rounded-xl px-4 py-3.5 text-sm text-[#111] placeholder:text-[#C4C4C4] outline-none focus:ring-2 focus:bg-white border transition-all duration-200',
    errors[field]
      ? 'bg-red-50 border-red-300 focus:ring-red-500/20'
      : 'bg-[#F5F5F5] border-transparent focus:ring-[#f84d07]/20 focus:border-[#f84d07]/30',
  ].join(' ')

  return (
    <div className="min-h-screen flex bg-gray-50 font-sans">
      {/* Left panel: poster image (visible on lg screens only) */}
      <div className="hidden lg:flex lg:w-3/5 relative overflow-hidden bg-black select-none">
        <img
          src="/poster.webp"
          alt="TayB Construction"
          className="absolute inset-0 h-full w-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
        <div className="absolute bottom-16 left-16 z-10 max-w-md">
          <img src="/logo.svg" alt="TayB" className="h-14 w-auto mb-8 brightness-0 invert" />
          <h2 className="text-4xl font-black text-white leading-tight uppercase tracking-tight mb-4">
            Building Strong Foundations
          </h2>
          <p className="text-white/70 text-sm leading-relaxed">
            Dubai-based construction firm providing comprehensive building contracts and end-to-end building solutions.
          </p>
        </div>
      </div>

      {/* Right panel: Login form */}
      <div className="w-full lg:w-2/5 flex flex-col justify-center px-6 sm:px-12 lg:px-16 bg-gray-100 lg:bg-white relative">
        {/* Mobile background banner */}
        <div className="lg:hidden absolute inset-0 bg-black overflow-hidden select-none">
          <img
            src="/poster.webp"
            alt="TayB Background"
            className="h-full w-full object-cover opacity-30 blur-[2px]"
          />
          <div className="absolute inset-0 bg-black/30" />
        </div>

        {/* Form Container (white card on mobile, transparent layout on desktop) */}
        <div className="relative z-10 w-full max-w-sm mx-auto bg-white rounded-3xl p-8 shadow-2xl border border-gray-100/50 lg:bg-transparent lg:p-0 lg:shadow-none lg:border-0">
          
          {/* Logo and header */}
          <div className="flex flex-col items-center lg:items-start mb-8 text-center lg:text-left">
            <img src="/logo.svg" alt="TayB Logo" className="h-20 w-auto mb-6" />
            <h1 className="text-2xl font-black text-gray-900 uppercase tracking-tight">Admin Portal</h1>
            <p className="text-xs text-gray-400 mt-1.5">Sign in to manage your site content</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {errors.root && (
              <div className="bg-red-50 border border-red-100 rounded-xl px-4 py-3 text-xs text-red-500 font-medium">
                {errors.root.message}
              </div>
            )}

            <div>
              <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-2">Email Address</label>
              <input
                type="email"
                placeholder="admin@tayb.ae"
                className={inp('email')}
                {...register('email', {
                  required: 'Email is required',
                  pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Enter a valid email address' },
                })}
              />
              {errors.email && <p className="mt-1.5 text-[11px] text-red-500 font-medium">{errors.email.message}</p>}
            </div>

            <div>
              <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-2">Password</label>
              <input
                type="password"
                placeholder="••••••••"
                className={inp('password')}
                {...register('password', {
                  required: 'Password is required',
                  minLength: { value: 6, message: 'Password must be at least 6 characters' },
                })}
              />
              {errors.password && <p className="mt-1.5 text-[11px] text-red-500 font-medium">{errors.password.message}</p>}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-[#f84d07] hover:bg-[#d94206] disabled:opacity-50 text-white font-bold py-3.5 rounded-xl text-sm transition-all duration-200 shadow-md hover:shadow-lg active:scale-[0.98] mt-2 uppercase tracking-wider"
            >
              {isSubmitting ? 'Signing in…' : 'Sign In'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
