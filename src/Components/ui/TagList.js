function TagList({ items = [], tone = 'light', className = '' }) {
  const tagClass = tone === 'dark'
    ? 'rounded-full border border-line bg-surface px-3 py-1.5 font-mono text-micro text-foreground'
    : 'rounded-full bg-ink/[0.05] px-3 py-1.5 font-mono text-micro text-stone-600'

  return (
    <ul className={`flex flex-wrap gap-2 ${className}`.trim()}>
      {items.map((item) => (
        <li key={item} className={tagClass}>{item}</li>
      ))}
    </ul>
  )
}

export default TagList
