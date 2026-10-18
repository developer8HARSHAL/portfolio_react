function IconButton({
  icon: Icon,
  href,
  label,
  tone = 'light',
  external = true,
  variant = 'icon',
  className = '',
  children,
  ...props
}) {
  const toneClass = tone === 'dark' ? 'icon-btn-dark' : 'icon-btn-light'
  const variantClass = variant === 'label'
    ? 'w-auto min-w-max h-11 min-h-11 gap-2 px-3 whitespace-nowrap'
    : ''

  return (
    <a
      href={href}
      aria-label={label}
      target={external ? '_blank' : undefined}
      rel={external ? 'noopener noreferrer' : undefined}
      className={`${toneClass} ${variantClass} ${className}`.trim()}
      {...props}
    >
      {children || (Icon && <Icon />)}
    </a>
  )
}

export default IconButton
