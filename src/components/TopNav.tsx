import { useEffect, useRef, useState, type FormEvent, type MouseEvent } from 'react';
import brandLogo from '../assets/hero/brand-logo.svg';
import closeIcon from '../assets/hero/close-x.svg';
import './TopNav.css';

const SCROLL_THRESHOLD = 8;
const EMAIL = 'abhijeetpunia01@gmail.com';
const PHONE_DISPLAY = '+91 639926078';
const PHONE_TEL = '+91639926078';

type MenuView = 'menu' | 'contact';

export default function TopNav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [menuView, setMenuView] = useState<MenuView>('menu');
  const [emailCopied, setEmailCopied] = useState(false);
  const [formEmail, setFormEmail] = useState('');
  const [formReason, setFormReason] = useState('');
  const navRef = useRef<HTMLElement>(null);
  const copyTimeoutRef = useRef<number | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > SCROLL_THRESHOLD;
      setScrolled(isScrolled);
      if (!isScrolled) setMenuOpen(false);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const handlePointerDown = (event: PointerEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMenuOpen(false);
    };
    window.addEventListener('pointerdown', handlePointerDown);
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('pointerdown', handlePointerDown);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [menuOpen]);

  useEffect(
    () => () => {
      if (copyTimeoutRef.current !== null) window.clearTimeout(copyTimeoutRef.current);
    },
    [],
  );

  // reset to the main menu view whenever the panel closes, so it reopens fresh
  useEffect(() => {
    if (!menuOpen) setMenuView('menu');
  }, [menuOpen]);

  const handleLogoClick = (event: MouseEvent<HTMLAnchorElement>) => {
    if (!scrolled) return;
    event.preventDefault();
    setMenuOpen((open) => !open);
  };

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
    } catch {
      // clipboard API unavailable/blocked — the address is still visible to copy by hand
    }
    setEmailCopied(true);
    if (copyTimeoutRef.current !== null) window.clearTimeout(copyTimeoutRef.current);
    copyTimeoutRef.current = window.setTimeout(() => setEmailCopied(false), 1800);
  };

  const handleFormSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const subject = encodeURIComponent('Portfolio contact');
    const body = encodeURIComponent(`From: ${formEmail}\n\n${formReason}`);
    window.location.href = `mailto:${EMAIL}?subject=${subject}&body=${body}`;
    setFormEmail('');
    setFormReason('');
    setMenuView('menu');
  };

  return (
    <header
      className={`top-nav${scrolled ? ' top-nav--scrolled' : ''}${menuOpen ? ' top-nav--menu-open' : ''}`}
      ref={navRef}
    >
      <a
        className="top-nav__brand"
        href="#top"
        onClick={handleLogoClick}
        aria-haspopup={scrolled ? 'true' : undefined}
        aria-expanded={scrolled ? menuOpen : undefined}
      >
        <img className="top-nav__brand-logo" src={brandLogo} alt="Abhijeet Punia" />
      </a>

      <nav className="top-nav__links" aria-label="Primary">
        <a href="#works">Works</a>
        <a href="#resume">Resume</a>
        <a className="top-nav__cta" href="#contact">
          <span className="top-nav__cta-label">Contact me</span>
        </a>
      </nav>

      <div
        className={`logo-menu${menuOpen ? ' logo-menu--open' : ''}`}
        aria-hidden={!menuOpen}
      >
        <div className="logo-menu__header">
          {menuView === 'contact' ? (
            <button
              type="button"
              className="logo-menu__back"
              onClick={() => setMenuView('menu')}
              aria-label="Back to menu"
            >
              <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path
                  d="M10 2.5 L4 8 L10 13.5"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Back
            </button>
          ) : (
            <img className="logo-menu__brand-logo" src={brandLogo} alt="Abhijeet Punia" />
          )}
          <button
            type="button"
            className="logo-menu__close"
            onClick={() => setMenuOpen(false)}
            aria-label="Close menu"
          >
            <img src={closeIcon} alt="" aria-hidden="true" />
          </button>
        </div>

        <div className="logo-menu__viewport">
          <div className={`logo-menu__track${menuView === 'contact' ? ' logo-menu__track--contact' : ''}`}>
            <div className="logo-menu__page logo-menu__page--menu">
              <div className="logo-menu__row logo-menu__row--grid">
                <a className="logo-menu__card" href="#works" onClick={() => setMenuOpen(false)}>
                  <span className="logo-menu__card-title">Work</span>
                  <span className="logo-menu__card-sub">Selected projects</span>
                </a>
                <a className="logo-menu__card" href="#resume" onClick={() => setMenuOpen(false)}>
                  <span className="logo-menu__card-title">Studio</span>
                  <span className="logo-menu__card-sub">About me</span>
                </a>
              </div>

              <div className="logo-menu__row">
                {/* Placeholder slot — wire up a real showreel clip here when one exists */}
                <button type="button" className="logo-menu__video" aria-label="Play reel">
                  <span className="logo-menu__video-play" aria-hidden="true">
                    <svg viewBox="0 0 16 16" fill="none">
                      <path d="M4 2.5 L13 8 L4 13.5 Z" fill="currentColor" />
                    </svg>
                  </span>
                  <span className="logo-menu__video-label">Play reel</span>
                </button>
              </div>

              <div className="logo-menu__row logo-menu__row--short">
                <div className="logo-menu__email-pill">
                  <button
                    type="button"
                    className="logo-menu__contact-icon"
                    onClick={handleCopyEmail}
                    aria-label="Copy email address"
                  >
                    <svg viewBox="0 0 20 20" fill="none">
                      <rect x="2" y="4" width="16" height="12" rx="2" stroke="currentColor" strokeWidth="1.5" />
                      <path
                        d="M3 5.5 L10 11 L17 5.5"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>

                  <span className="logo-menu__email-pill-value">
                    {emailCopied ? 'Copied!' : EMAIL}
                  </span>

                  <button
                    type="button"
                    className="logo-menu__contact-icon logo-menu__contact-icon--arrow"
                    onClick={() => setMenuView('contact')}
                    aria-label="Open contact form"
                  >
                    <svg viewBox="0 0 20 20" fill="none">
                      <path
                        d="M7 4 L13 10 L7 16"
                        stroke="currentColor"
                        strokeWidth="1.6"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                </div>
              </div>

              <div className="logo-menu__row logo-menu__row--short">
                <a className="logo-menu__contact logo-menu__contact--phone" href={`tel:${PHONE_TEL}`}>
                  <span className="logo-menu__contact-icon" aria-hidden="true">
                    <svg viewBox="0 0 20 20" fill="none">
                      <path
                        d="M4 3.5c0-.6.5-1 1-1h2.2c.5 0 .9.3 1 .8l.6 2.4c.1.4 0 .9-.3 1.1L7.2 7.9c.9 1.9 2.4 3.4 4.3 4.3l1.1-1.3c.3-.3.7-.4 1.1-.3l2.4.6c.5.1.8.5.8 1v2.2c0 .6-.5 1-1 1C9.9 15.4 4.6 10.1 4 4.1Z"
                        stroke="currentColor"
                        strokeWidth="1.4"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                  <span className="logo-menu__contact-text">
                    <span className="logo-menu__contact-label">Call</span>
                    <span className="logo-menu__contact-value">{PHONE_DISPLAY}</span>
                  </span>
                </a>
              </div>
            </div>

            <div className="logo-menu__page logo-menu__page--form">
              <h3 className="logo-menu__form-title">Get in touch</h3>
              <p className="logo-menu__form-sub">
                Prefer to just email? My address is{' '}
                <button type="button" className="logo-menu__form-email-link" onClick={handleCopyEmail}>
                  {emailCopied ? 'copied!' : EMAIL}
                </button>
                . Otherwise, send a message here instead:
              </p>
              <form className="logo-menu__form" onSubmit={handleFormSubmit}>
                <input
                  type="email"
                  required
                  placeholder="Your email*"
                  className="logo-menu__form-input"
                  value={formEmail}
                  onChange={(event) => setFormEmail(event.target.value)}
                />
                <textarea
                  required
                  placeholder="Enter your reason here"
                  className="logo-menu__form-textarea"
                  value={formReason}
                  onChange={(event) => setFormReason(event.target.value)}
                />
                <button type="submit" className="logo-menu__form-submit">
                  Submit
                  <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
                    <path
                      d="M3 8 H13 M8 3 L13 8 L8 13"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
