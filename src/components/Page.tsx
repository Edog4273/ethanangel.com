import type { ReactNode } from 'react'
import { motion } from 'motion/react'

export function Page({ children }: { children: ReactNode }) {
  return (
    <motion.main
      className="page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.28 } }}
      transition={{ duration: 0.55, ease: 'easeOut' }}
    >
      {children}
    </motion.main>
  )
}