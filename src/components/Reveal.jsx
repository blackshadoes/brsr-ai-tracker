import { useInView } from '../hooks/useInView'

// Generic fade + slide-up wrapper. Renders as `as` (default div) so it can
// stand in for the actual styled element (card, row button, etc.) without
// adding an extra DOM layer that would break grid/flex layouts.
export default function Reveal({ as: Component = 'div', className = '', delay = 0, children, style, ...rest }) {
  const [ref, inView] = useInView()

  return (
    <Component
      ref={ref}
      className={`reveal${inView ? ' reveal-visible' : ''}${className ? ` ${className}` : ''}`}
      style={delay ? { ...style, transitionDelay: `${delay}ms` } : style}
      {...rest}
    >
      {children}
    </Component>
  )
}
