function Container({ as: Element = 'div', className = '', children, ...props }) {
  return (
    <Element className={`mx-auto w-full max-w-[1440px] px-page-x ${className}`.trim()} {...props}>
      {children}
    </Element>
  )
}

export default Container
