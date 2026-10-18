import { useEffect, useRef } from 'react'

const clamp = (value) => Math.min(1, Math.max(0, value))

function useScrollProgress(targetRef, onProgress, { enabled = true, ease = 0.14 } = {}) {
  const handlerRef = useRef(onProgress)

  useEffect(() => {
    handlerRef.current = onProgress
  }, [onProgress])

  useEffect(() => {
    const target = targetRef.current
    if (!enabled || !target) return undefined

    let frame = 0
    let goal = 0
    let value = 0

    const measure = () => {
      const rect = target.getBoundingClientRect()
      const travel = rect.height - window.innerHeight
      return travel > 0 ? clamp(-rect.top / travel) : 0
    }

    const step = () => {
      value += (goal - value) * ease
      if (Math.abs(goal - value) < 0.0004) value = goal
      handlerRef.current(value, goal)
      frame = value === goal ? 0 : requestAnimationFrame(step)
    }

    const update = () => {
      goal = measure()
      if (!frame) frame = requestAnimationFrame(step)
    }

    goal = measure()
    value = goal
    handlerRef.current(value, goal)

    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)

    return () => {
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
      cancelAnimationFrame(frame)
    }
  }, [targetRef, enabled, ease])
}

export default useScrollProgress
