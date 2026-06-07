'use client'
import { useEffect, useRef, useState } from 'react'

export function CountUp({ value, duration = 1200, prefix = '₪' }: {
  value: number
  duration?: number
  prefix?: string
}) {
  const [display, setDisplay] = useState(0)
  const start = useRef(Date.now())

  useEffect(() => {
    start.current = Date.now()
    const tick = () => {
      const elapsed = Date.now() - start.current
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setDisplay(value * eased)
      if (progress < 1) requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
  }, [value, duration])

  return (
    <span className="num">
      {prefix}{display.toLocaleString('he-IL', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
    </span>
  )
}
