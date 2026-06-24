import { useEffect, useRef, useState } from 'react'

// Splits "1.8L" -> {value: 1.8, decimals: 1, suffix: 'L'}, "50M+" -> {value: 50, decimals: 0, suffix: 'M+'}.
function parseStat(raw) {
  const match = String(raw).match(/^(\d+(?:\.\d+)?)(.*)$/)
  if (!match) return { value: 0, decimals: 0, suffix: String(raw) }
  const [, numStr, suffix] = match
  const decimals = numStr.includes('.') ? numStr.split('.')[1].length : 0
  return { value: parseFloat(numStr), decimals, suffix }
}

export function useCountUp(raw, { duration = 1200, start = true } = {}) {
  const { value, decimals, suffix } = parseStat(raw)
  const [display, setDisplay] = useState((0).toFixed(decimals))
  const frameRef = useRef()

  useEffect(() => {
    if (!start) return
    if (value === 0) {
      setDisplay(value.toFixed(decimals))
      return
    }

    const startTime = performance.now()

    function tick(now) {
      const progress = Math.min((now - startTime) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setDisplay((value * eased).toFixed(decimals))
      if (progress < 1) {
        frameRef.current = requestAnimationFrame(tick)
      }
    }

    frameRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frameRef.current)
  }, [start, value, decimals, duration])

  return `${display}${suffix}`
}
