import IconButton from './IconButton'
import { EmailIcon, GitHubIcon, LinkedInIcon } from './Icons'

const ICONS = {
  Email: EmailIcon,
  GitHub: GitHubIcon,
  LinkedIn: LinkedInIcon,
}

function SocialLinks({ links = [], tone = 'dark', size = 'default', className = '' }) {
  const isLarge = size === 'large'

  return (
    <div className={`flex items-center ${isLarge ? 'gap-4' : 'gap-2.5'} ${className}`.trim()}>
      {links.map((link) => (
        <IconButton
          key={link.label}
          icon={ICONS[link.icon] || link.icon}
          href={link.href}
          label={link.label}
          tone={tone}
          className={isLarge ? 'h-14 w-14 [&_svg]:h-6 [&_svg]:w-6' : ''}
          external={link.external !== false}
        />
      ))}
    </div>
  )
}

export default SocialLinks
