import { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { navLinks, RESUME_URL } from '../config/navigation';
import Container from './ui/Container';
import SocialLinks from './ui/SocialLinks';
import PillButton from './ui/PillButton';
import SOCIAL_LINK_ITEMS from '../data/socialLinks';
import { useTheme } from '../context/ThemeContext';
import { scrollToId } from '../utils/scrollToId';

const HIDE_AFTER = 80;
const REVEAL_ZONE = 80;
const HIDE_DELAY = 450;
const SCROLL_STEP = 6;

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [isHidden, setIsHidden] = useState(false);
  const headerRef = useRef(null);
  const hideTimerRef = useRef(0);
  const hoverRef = useRef(false);
  const focusRef = useRef(false);
  const menuOpenRef = useRef(false);
  const mobileMenuRef = useRef(null);
  const mobileToggleRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const scrollIds = navLinks.filter((l) => l.kind === 'scroll').map((l) => l.id);

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      const current = scrollIds.find((section) => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      if (current) setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [location.pathname]);

  useEffect(() => {
    menuOpenRef.current = isMobileMenuOpen;
    if (isMobileMenuOpen) setIsHidden(false);
  }, [isMobileMenuOpen]);

  useEffect(() => {
    setIsHidden(false);
  }, [location.pathname]);

  useEffect(() => {
    if (!isMobileMenuOpen) return undefined;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isMobileMenuOpen]);

  useEffect(() => {
    const header = headerRef.current;
    if (!header) return undefined;

    const fineHover = window.matchMedia('(hover: hover) and (pointer: fine)');
    let lastY = window.scrollY;
    let frame = 0;

    const showHeader = () => {
      clearTimeout(hideTimerRef.current);
      setIsHidden(false);
    };

    const scheduleHide = () => {
      clearTimeout(hideTimerRef.current);
      hideTimerRef.current = setTimeout(() => {
        if (hoverRef.current || focusRef.current || menuOpenRef.current) return;
        if (window.scrollY > HIDE_AFTER) setIsHidden(true);
      }, HIDE_DELAY);
    };

    const handleScrollVisibility = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        const y = window.scrollY;
        const delta = y - lastY;

        if (y <= HIDE_AFTER) {
          lastY = y;
          showHeader();
          return;
        }
        if (Math.abs(delta) < SCROLL_STEP) return;
        lastY = y;

        const engaged = hoverRef.current || focusRef.current || menuOpenRef.current;
        if (delta > 0 && !engaged) setIsHidden(true);
        if (delta < 0 && !fineHover.matches) showHeader();
      });
    };

    const handlePointerMove = (event) => {
      if (event.pointerType !== 'mouse') return;
      const inZone = event.clientY <= REVEAL_ZONE || header.contains(event.target);
      if (inZone) {
        hoverRef.current = true;
        showHeader();
      } else if (hoverRef.current) {
        hoverRef.current = false;
        scheduleHide();
      }
    };

    const handleFocusIn = (event) => {
      if (!event.target.matches(':focus-visible')) return;
      focusRef.current = true;
      showHeader();
    };

    const handleFocusOut = (event) => {
      if (header.contains(event.relatedTarget)) return;
      focusRef.current = false;
      scheduleHide();
    };

    window.addEventListener('scroll', handleScrollVisibility, { passive: true });
    document.addEventListener('pointermove', handlePointerMove, { passive: true });
    header.addEventListener('focusin', handleFocusIn);
    header.addEventListener('focusout', handleFocusOut);

    return () => {
      cancelAnimationFrame(frame);
      clearTimeout(hideTimerRef.current);
      window.removeEventListener('scroll', handleScrollVisibility);
      document.removeEventListener('pointermove', handlePointerMove);
      header.removeEventListener('focusin', handleFocusIn);
      header.removeEventListener('focusout', handleFocusOut);
    };
  }, []);


  useEffect(() => {
    if (!isMobileMenuOpen) return;

    const menu = mobileMenuRef.current;
    const toggleButton = mobileToggleRef.current;
    const getFocusableItems = () => Array.from(
      menu?.querySelectorAll('a[href], button:not([disabled]), [tabindex="0"]') || []
    ).filter((item) => item.getClientRects().length > 0);
    getFocusableItems()[0]?.focus();

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        setIsMobileMenuOpen(false);
        toggleButton?.focus();
        return;
      }
      if (event.key !== 'Tab') return;

      const items = getFocusableItems();
      if (!items.length) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (event.shiftKey && (document.activeElement === first || !menu.contains(document.activeElement))) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && (document.activeElement === last || !menu.contains(document.activeElement))) {
        event.preventDefault();
        first.focus();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      toggleButton?.focus();
    };
  }, [isMobileMenuOpen]);

  // Sliding underline beneath the active desktop nav item.
  const navRefs = useRef({});
  const [indicator, setIndicator] = useState({ left: 0, width: 0, ready: false });

  useEffect(() => {
    const activeItem = navLinks.find((item) => isActive(item));
    const el = activeItem && navRefs.current[activeItem.id];
    if (el) {
      setIndicator({ left: el.offsetLeft, width: el.offsetWidth, ready: true });
    } else {
      setIndicator((prev) => ({ ...prev, ready: false }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeSection, location.pathname]);

  const toggleMobileMenu = (e) => {
    e.stopPropagation();
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const goToSection = (targetId) => {
    if (location.pathname !== '/') {
      navigate(`/#${targetId}`);
      closeMobileMenu();
      return;
    }

    if (scrollToId(targetId)) {
      setActiveSection(targetId);
    }
    closeMobileMenu();
  };

  const isActive = (item) =>
    item.kind === 'route'
      ? location.pathname === item.path
      : location.pathname === '/' && activeSection === item.id;

  const hidden = isHidden && !isMobileMenuOpen;

  return (
    <>
    <header
      ref={headerRef}
      className={`fixed top-0 left-0 right-0 lg:left-10 lg:right-10 z-50 transition-all duration-500 ${hidden ? '-translate-y-2 opacity-0 pointer-events-none' : ''
        } ${isScrolled
          ? 'bg-canvas/95 backdrop-blur-xl border-b border-line shadow-lg'
          : 'bg-canvas/80 lg:bg-transparent backdrop-blur-lg lg:backdrop-blur-none'
        }`}
    >
      <Container>
        <div className="flex items-center justify-between gap-8 py-4 lg:py-5">
          <Link
            to="/"
            className="relative z-50 flex-shrink-0 font-display text-[18px] sm:text-[18px] font-extrabold text-foreground -tracking-tighter rounded-lg px-2 py-1 -ml-2"
          >
            Harshal Pinge.
          </Link>

          <nav className="relative hidden lg:flex items-center gap-1 xl:gap-2">
            {navLinks.map((item) =>
              item.kind === 'route' ? (
                <Link
                  key={item.id}
                  ref={(el) => { navRefs.current[item.id] = el; }}
                  to={item.path}
                  className={`relative px-4 py-2 text-[14px] font-medium rounded-lg transition-colors duration-300 ${isActive(item) ? 'text-foreground' : 'text-stone-400 hover:text-foreground'
                    }`}
                >
                  {item.label}
                </Link>
              ) : (
                <button
                  key={item.id}
                  ref={(el) => { navRefs.current[item.id] = el; }}
                  type="button"
                  onClick={() => goToSection(item.id)}
                  className={`relative px-4 py-2 text-[14px] font-medium rounded-lg transition-colors duration-300 cursor-pointer ${isActive(item) ? 'text-foreground' : 'text-stone-400 hover:text-foreground'
                    }`}
                >
                  {item.label}
                </button>
              )
            )}
            <span
              aria-hidden="true"
              className={`pointer-events-none absolute bottom-0 h-[2px] rounded-full bg-foreground transition-all duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] ${indicator.ready ? 'opacity-100' : 'opacity-0'
                }`}
              style={{ left: indicator.left, width: indicator.width }}
            />
          </nav>

          <div className="hidden lg:flex items-center gap-3 flex-shrink-0">
            <div className="pill-dark">
              <span className="w-1.5 h-1.5 rounded-full bg-foreground"></span>
              available for work
            </div>

            <button
              type="button"
              onClick={toggleTheme}
              className="theme-toggle"
              aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {theme === 'dark' ? (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              )}
            </button>

            <PillButton
              label="Reach me out"
              href="#contact"
              onClick={(event) => {
                event.preventDefault();
                goToSection('contact');
              }}
            />
          </div>

          <div className="lg:hidden flex items-center gap-2">
            <button
              type="button"
              onClick={toggleTheme}
              className="theme-toggle"
              aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {theme === 'dark' ? (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              )}
            </button>

            <button
              ref={mobileToggleRef}
              type="button"
              onClick={toggleMobileMenu}
              className={`relative ${isMobileMenuOpen ? 'z-[70]' : 'z-50'
                } w-10 h-10 flex items-center justify-center bg-white/10 hover:bg-white/20 border border-line rounded-tile transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white/40 flex-shrink-0`}
              aria-label="Toggle mobile menu"
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-navigation"
            >
              <div className="w-5 h-4 flex flex-col justify-between">
                <span className={`w-full h-0.5 bg-foreground rounded-full transition-all duration-300 ${isMobileMenuOpen ? 'rotate-45 translate-y-[7px]' : ''}`} />
                <span className={`w-full h-0.5 bg-foreground rounded-full transition-all duration-300 ${isMobileMenuOpen ? 'opacity-0' : ''}`} />
                <span className={`w-full h-0.5 bg-foreground rounded-full transition-all duration-300 ${isMobileMenuOpen ? '-rotate-45 -translate-y-[7px]' : ''}`} />
              </div>
            </button>
          </div>
        </div>
      </Container>
    </header>
      {createPortal(
        <div
          className={`mobile-menu-container fixed inset-0 z-[100] lg:hidden transition-[visibility] duration-300 ${isMobileMenuOpen ? 'visible' : 'invisible pointer-events-none'}`}
          aria-hidden={!isMobileMenuOpen}
        >
          <button
            type="button"
            tabIndex={-1}
            aria-label="Close navigation menu"
            className={`absolute inset-0 h-full w-full cursor-default bg-ink/65 backdrop-blur-sm transition-opacity duration-300 motion-reduce:transition-none ${isMobileMenuOpen ? 'opacity-100' : 'opacity-0'}`}
            onClick={closeMobileMenu}
          />

          <aside
            role="dialog"
            aria-modal={isMobileMenuOpen ? true : undefined}
            aria-label="Mobile navigation"
            id="mobile-navigation"
            ref={mobileMenuRef}
            className={`absolute inset-y-0 right-0 z-10 flex w-full max-w-[420px] flex-col overflow-y-auto overscroll-contain border-l border-line bg-canvas px-5 pb-6 pt-5 shadow-2xl transition-transform duration-300 ease-out sm:px-7 motion-reduce:transition-none ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}
          >
            <div className="flex items-center justify-between gap-4 border-b border-line pb-5">
              <div>
                <p className="font-display text-lg font-extrabold -tracking-tighter text-foreground">Harshal Pinge.</p>
                <p className="mt-1 text-xs text-muted">Portfolio navigation</p>
              </div>
              <button
                type="button"
                onClick={closeMobileMenu}
                aria-label="Close navigation menu"
                className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full border border-line bg-surface text-foreground transition-colors hover:bg-surface-raised focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              >
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true">
                  <path d="M6 6l12 12M18 6L6 18" strokeWidth="1.8" strokeLinecap="round" />
                </svg>
              </button>
            </div>

            <div className="mt-6 flex items-center justify-between gap-3">
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-muted">Navigate</span>
              <span className="inline-flex items-center gap-2 text-xs font-medium text-muted-strong">
                <span className="h-2 w-2 rounded-full bg-accent" />
                Available for work
              </span>
            </div>

            <nav aria-label="Mobile navigation links" className="mt-3 flex flex-col gap-1.5">
              {navLinks.map((item, index) => {
                const active = isActive(item);
                const itemClass = `group flex min-h-14 w-full items-center gap-4 rounded-xl border px-4 py-3 text-left text-base font-semibold transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent motion-reduce:transition-none ${active ? 'border-line bg-surface-raised text-foreground' : 'border-transparent text-muted-strong hover:border-line hover:bg-surface hover:text-foreground'}`;
                const itemContent = (
                  <>
                    <span className={`w-6 flex-shrink-0 font-mono text-xs ${active ? 'text-accent' : 'text-muted'}`}>
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <span className="flex-1">{item.label}</span>
                    <svg className={`h-4 w-4 flex-shrink-0 transition-transform duration-200 ${active ? 'translate-x-0 text-accent' : '-translate-x-1 text-muted opacity-60 group-hover:translate-x-0 group-hover:opacity-100'}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true">
                      <path d="M5 12h14m-6-6l6 6-6 6" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </>
                );

                return item.kind === 'route' ? (
                  <Link
                    key={item.id}
                    to={item.path}
                    onClick={closeMobileMenu}
                    aria-current={active ? 'page' : undefined}
                    className={`${itemClass} group`}
                    style={{ animationDelay: `${index * 35}ms` }}
                  >
                    {itemContent}
                  </Link>
                ) : (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => goToSection(item.id)}
                    aria-current={active ? 'location' : undefined}
                    className={`${itemClass} group`}
                    style={{ animationDelay: `${index * 35}ms` }}
                  >
                    {itemContent}
                  </button>
                );
              })}
            </nav>

            <div className="mt-7 border-t border-line pt-5">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted">Next step</p>
              <a
                href="#contact"
                className="btn-pill-dark group mt-3 flex min-h-12 w-full items-center justify-between"
                onClick={(event) => {
                  event.preventDefault();
                  goToSection('contact');
                }}
              >
                <span>Let's talk about your project</span>
                <svg className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true">
                  <path d="M5 12h14m-6-6l6 6-6 6" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>

              <PillButton
                label="Download resume"
                href={RESUME_URL}
                variant="ghost-dark"
                icon="external"
                external
                fullWidth
                className="mt-3 w-full"
                onClick={closeMobileMenu}
              />

              <div className="mt-5 border-t border-line pt-4">
                <SocialLinks links={SOCIAL_LINK_ITEMS} tone="dark" className="justify-start" />
              </div>
            </div>
          </aside>
        </div>,
        document.body
      )}
    </>
  );
};

export default Header;