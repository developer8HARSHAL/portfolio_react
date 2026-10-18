import { ArrowRightIcon, ExternalLinkIcon } from './Icons'

const BASE =
  'group inline-flex min-h-[44px] items-center justify-center gap-[8px] rounded-full [@media(pointer:fine)]:min-h-[40px] text-small font-semibold leading-none transition-[background-color,border-color,color,transform] duration-200 ease-out active:scale-[0.98] motion-reduce:transition-none motion-reduce:active:scale-100'

const CHIP =
  'flex h-[26px] w-[26px] shrink-0 items-center justify-center rounded-full'

const ICON_BASE =
  'transition-transform duration-200 ease-out motion-reduce:transition-none'

const ICON_MOTION = {
  arrow: 'group-hover:translate-x-[2px]',
  external: 'group-hover:translate-x-[2px] group-hover:-translate-y-[2px]',
}

const GHOST = {
  pill: 'border border-foreground/25 text-foreground hover:border-foreground/45 hover:bg-foreground/5',
  chip: '',
}

const VARIANTS = {
  accent: {
    pill: 'bg-accent text-accent-foreground hover:bg-accent/90',
    chip: 'bg-accent-foreground text-accent',
  },
  dark: {
    pill: 'border border-foreground/15 bg-ink text-[rgb(var(--color-paper-rgb))] hover:bg-ink/90',
    chip: 'bg-[rgb(var(--color-paper-rgb))] text-ink',
  },
  ghost: GHOST,
  'ghost-dark': GHOST,
}

const LIVE_CLASS =
  'group/pill flex min-h-[30px] min-w-0 items-center justify-between gap-2 pl-3.5 pr-1 py-1 bg-foreground text-canvas font-mono text-caption font-semibold rounded-full transition-all duration-200 ease-out hover:opacity-90 active:scale-[0.98]'

function PillButton({
  label,
  href,
  variant = 'accent',
  external = false,
  fullWidth = false,
  icon = 'arrow',
  accessibleLabel,
  className = '',
  ...props
}) {
  if (variant === 'live') {
    return (
      <a
        href={href}
        target={external ? '_blank' : undefined}
        rel={external ? 'noopener noreferrer' : undefined}
        aria-label={accessibleLabel || label}
        className={`${LIVE_CLASS} ${fullWidth ? 'flex-1' : 'inline-flex'} ${className}`.trim()}
        {...props}
      >
        {label}
        <span className="flex h-[22px] w-[22px] flex-shrink-0 items-center justify-center rounded-full bg-canvas/15 transition-transform duration-200 group-hover/pill:translate-x-0.5 group-hover/pill:-translate-y-0.5">
          <ExternalLinkIcon className="h-[12px] w-[12px]" />
        </span>
      </a>
    )
  }

  const style = VARIANTS[variant] || VARIANTS.accent
  const Icon = icon === 'external' ? ExternalLinkIcon : ArrowRightIcon
  const motion = icon === 'external' ? ICON_MOTION.external : ICON_MOTION.arrow
  const showIcon = Boolean(icon) && icon !== 'none'
  const hasChip = showIcon && Boolean(style.chip)
  const spacing = hasChip ? 'pl-[18px] pr-[7px]' : 'px-[18px]'
  const layout = fullWidth ? (hasChip ? 'flex-1 justify-between' : 'flex-1') : ''

  const classes = [BASE, style.pill, spacing, layout, className]
    .filter(Boolean)
    .join(' ')

  return (
    <a
      href={href}
      aria-label={accessibleLabel}
      target={external ? '_blank' : undefined}
      rel={external ? 'noopener noreferrer' : undefined}
      className={classes}
      {...props}
    >
      {label}
      {external && <span className="sr-only"> (opens in a new tab)</span>}
      {showIcon &&
        (hasChip ? (
          <span aria-hidden="true" className={`${CHIP} ${style.chip}`}>
            <Icon className={`h-[13px] w-[13px] ${ICON_BASE} ${motion}`} />
          </span>
        ) : (
          <span aria-hidden="true" className="flex shrink-0">
            <Icon className={`h-[14px] w-[14px] ${ICON_BASE} ${motion}`} />
          </span>
        ))}
    </a>
  )
}

export default PillButton  ;