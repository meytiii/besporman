'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
function cn(...inputs: any[]) { return twMerge(clsx(inputs)) }

interface TypingEffectProps {
  texts?: string[]
  className?: string
  rotationInterval?: number
  typingSpeed?: number
}

const DEMO = ['Design', 'Development', 'Marketing']

export const TypingEffect = ({
  texts = DEMO,
  className,
  rotationInterval = 3000,
  typingSpeed = 150,
}: TypingEffectProps) => {
  const [displayedText, setDisplayedText] = useState('')
  const [currentTextIndex, setCurrentTextIndex] = useState(0)
  const [charIndex, setCharIndex] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: true })

  const currentText = texts[currentTextIndex % texts.length]

  useEffect(() => {
    if (!isInView) return

    if (charIndex < currentText.length) {
      const typingTimeout = setTimeout(() => {
        setDisplayedText((prev) => prev + currentText.charAt(charIndex))
        setCharIndex(charIndex + 1)
      }, typingSpeed)
      return () => clearTimeout(typingTimeout)
    } else {
      const changeLabelTimeout = setTimeout(() => {
        setDisplayedText('')
        setCharIndex(0)
        setCurrentTextIndex((prev) => (prev + 1) % texts.length)
      }, rotationInterval)
      return () => clearTimeout(changeLabelTimeout)
    }
  }, [charIndex, currentText, isInView])

  return (
    <div
      ref={containerRef}
      className={cn(
        'relative inline-flex items-center justify-center text-center text-4xl font-bold',
        className
      )}
    >
      {displayedText}
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          duration: 0.8,
          repeat: Infinity,
          repeatType: 'reverse',
        }}
        className={cn(
          'ml-1 h-[1em] w-1 rounded-sm bg-current'
        )}
      />
    </div>
  )
}

export default TypingEffect
