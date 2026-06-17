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
    'w-full rounded-xl px-4 py-3 text-sm text-[#111] placeholder:text-[#C4C4C4] outline-none focus:ring-2 focus:bg-white border transition-all',
    errors[field]
      ? 'bg-red-50 border-red-300 focus:ring-red-500/20'
      : 'bg-[#F5F5F5] border-transparent focus:ring-[#f84d07]/20 focus:border-[#f84d07]/30',
  ].join(' ')

  return (
    <div className="min-h-screen bg-[#E8E6E3] flex items-center justify-center p-4">
      <div className="w-full max-w-sm bg-white rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.10)] border border-white/60 p-8">

        <div className="flex items-center gap-3 mb-8">
          <div className="h-10 w-10 rounded-xl bg-[#f84d07] flex items-center justify-center shadow-sm">
            <span className="text-white font-black text-base leading-none">T</span>
          </div>
          <div>
            <p className="font-bold text-[#111] text-sm leading-tight">TayB Admin</p>
            <p className="text-[11px] text-[#9CA3AF]">Sign in to continue</p>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {errors.root && (
            <div className="bg-red-50 border border-red-100 rounded-xl px-4 py-3 text-xs text-red-500">
              {errors.root.message}
            </div>
          )}

          <div>
            <label className="block text-[11px] font-semibold text-[#6B7280] mb-1.5">Email</label>
            <input
              type="email"
              placeholder="admin@tayb.ae"
              className={inp('email')}
              {...register('email', {
                required: 'Email is required',
                pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Enter a valid email address' },
              })}
            />
            {errors.email && <p className="mt-1.5 text-[11px] text-red-500">{errors.email.message}</p>}
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-[#6B7280] mb-1.5">Password</label>
            <input
              type="password"
              placeholder="••••••••"
              className={inp('password')}
              {...register('password', {
                required: 'Password is required',
                minLength: { value: 6, message: 'Password must be at least 6 characters' },
              })}
            />
            {errors.password && <p className="mt-1.5 text-[11px] text-red-500">{errors.password.message}</p>}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-[#f84d07] hover:bg-[#d94206] disabled:opacity-50 text-white font-semibold py-3 rounded-xl text-sm transition-colors shadow-sm mt-2"
          >
            {isSubmitting ? 'Signing in…' : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  )
}
