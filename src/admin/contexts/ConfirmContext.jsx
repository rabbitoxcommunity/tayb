import { createContext, useContext, useState } from 'react'
import { createPortal } from 'react-dom'
import { AnimatePresence, motion } from 'framer-motion'

const ConfirmContext = createContext(null)

const VARIANTS = {
  danger: {
    iconBg: 'bg-red-50',
    iconColor: 'text-red-500',
    confirmClass: 'bg-red-500 hover:bg-red-600 text-white',
    confirmLabel: 'Delete',
    icon: (
      <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
      </svg>
    ),
  },
  logout: {
    iconBg: 'bg-[#f84d07]/10',
    iconColor: 'text-[#f84d07]',
    confirmClass: 'bg-[#f84d07] hover:bg-[#d94206] text-white',
    confirmLabel: 'Sign Out',
    icon: (
      <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
      </svg>
    ),
  },
}

function ConfirmDialog({ open, title, message, variant, onConfirm, onCancel }) {
  const v = VARIANTS[variant] || VARIANTS.danger

  return createPortal(
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm"
            onClick={onCancel}
          />

          {/* Dialog card */}
          <motion.div
            key="dialog"
            initial={{ opacity: 0, scale: 0.88, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 12 }}
            transition={{ type: 'spring', damping: 22, stiffness: 380, mass: 0.8 }}
            className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none"
          >
            <div className="pointer-events-auto w-full max-w-sm mx-4 bg-white rounded-3xl shadow-2xl border border-[#F0F0F0] p-6">

              {/* Icon */}
              <div className={`h-12 w-12 rounded-2xl ${v.iconBg} flex items-center justify-center mb-5`}>
                <span className={v.iconColor}>{v.icon}</span>
              </div>

              {/* Text */}
              <p className="text-[15px] font-bold text-[#111] leading-snug mb-1.5">{title}</p>
              <p className="text-sm text-[#9CA3AF] leading-relaxed mb-6">{message}</p>

              {/* Actions */}
              <div className="flex gap-3">
                <button
                  onClick={onCancel}
                  className="flex-1 py-2.5 rounded-xl bg-[#F5F5F5] hover:bg-[#EBEBEB] text-[#6B7280] hover:text-[#111] text-sm font-semibold transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={onConfirm}
                  className={`flex-1 py-2.5 rounded-xl text-sm font-semibold transition-colors shadow-sm ${v.confirmClass}`}
                >
                  {v.confirmLabel}
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>,
    document.body
  )
}

export function ConfirmProvider({ children }) {
  const [state, setState] = useState({
    open: false, title: '', message: '', variant: 'danger', resolve: null,
  })

  const confirm = ({ title, message, variant = 'danger' }) =>
    new Promise((resolve) => {
      setState({ open: true, title, message, variant, resolve })
    })

  const handleConfirm = () => {
    state.resolve(true)
    setState((s) => ({ ...s, open: false }))
  }

  const handleCancel = () => {
    state.resolve(false)
    setState((s) => ({ ...s, open: false }))
  }

  return (
    <ConfirmContext.Provider value={confirm}>
      {children}
      <ConfirmDialog
        open={state.open}
        title={state.title}
        message={state.message}
        variant={state.variant}
        onConfirm={handleConfirm}
        onCancel={handleCancel}
      />
    </ConfirmContext.Provider>
  )
}

export const useConfirm = () => useContext(ConfirmContext)
