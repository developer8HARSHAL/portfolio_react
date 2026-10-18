const TITLE_SIZE = {
  display: 'text-display leading-[1.05]',
  heading: 'text-heading leading-[1.1]',
  title: 'text-title leading-snug',
}

function SectionHeading({
  eyebrow,
  title,
  id,
  as: Heading = 'h2',
  size = 'display',
  description,
  descriptionClassName = '',
  titleClassName = '',
  side,
  className = '',
}) {
  const wrapperClasses = [
    'flex flex-wrap items-end justify-between gap-[24px]',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  const titleClasses = [
    'font-display font-bold text-balance text-foreground',
    TITLE_SIZE[size] || TITLE_SIZE.display,
    titleClassName,
  ]
    .filter(Boolean)
    .join(' ')

  const descriptionClasses = [
    'mt-[20px] max-w-[672px] text-body leading-relaxed text-muted',
    descriptionClassName,
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <div className={wrapperClasses}>
      <div className="max-w-[768px]">
        {eyebrow && <p className="label-mono mb-[16px]">{eyebrow}</p>}
        <Heading id={id} className={titleClasses}>
          {title}
        </Heading>
        {description && <p className={descriptionClasses}>{description}</p>}
      </div>
      {side}
    </div>
  )
}

export default SectionHeading