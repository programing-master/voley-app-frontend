import * as motion from 'motion/react-client'

export default function Cards ({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 0.2,
        scale: { type: 'spring', visualDuration: 0.2, bounce: 0.3 }
      }}
    >
      {children}
    </motion.div>
  )
}

