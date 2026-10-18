import { forwardRef } from 'react'

const SurfaceCard = forwardRef(function SurfaceCard(
  { as: Element = 'div', tone = 'line', className = '', children, ...props },
  ref
) {
  const surfaceClass = tone === 'paper' ? 'card-paper' : 'card-line'

  return (
    <Element ref={ref} className={`${surfaceClass} ${className}`.trim()} {...props}>
      {children}
    </Element>
  )
})

export default SurfaceCard
