import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import LanguageSelector from '@/components/LanguageSelector';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';

const Navigation = () => {
  const { t } = useTranslation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const navLinks = [
    { href: '#about', label: t('nav.about') },
    { href: '#services', label: t('nav.services') },
    { href: '#pricing', label: t('nav.pricing') },
    { href: '/programs', label: t('nav.programs'), isRoute: true },
    { href: '#referrals', label: t('nav.testimonials') }
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleHashClick = (e: React.MouseEvent, hash: string, callback?: () => void) => {
    if (location.pathname !== '/') {
      e.preventDefault();
      navigate('/' + hash);
    }
    callback?.();
  };

  const renderNavItem = (
    link: (typeof navLinks)[number],
    className: string,
    onClick?: () => void,
  ) => {
    if (link.isRoute) {
      return (
        <Link key={link.href} to={link.href} className={className} onClick={onClick}>
          {link.label}
        </Link>
      );
    }

    return (
      <a key={link.href} href={link.href} className={className} onClick={(e) => handleHashClick(e, link.href, onClick)}>
        {link.label}
      </a>
    );
  };

  return (
    <nav
      className={cn(
        'fixed top-0 left-0 right-0 z-50 border-b border-border bg-background/95 backdrop-blur-md transition-all duration-300',
        !isScrolled && 'md:border-transparent md:bg-transparent',
        isScrolled && 'md:border-border md:bg-background/95',
      )}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="py-3 md:py-0">
          <div className="flex items-start justify-between gap-4 md:h-28 md:items-center">
          {/* Logo */}
            <Link to="/" className="font-display max-w-[10rem] text-lg font-bold leading-none tracking-[0.16em] text-foreground md:max-w-none md:text-2xl md:tracking-wider">
              VIKTORLINGMAN<span className="block text-primary md:inline">COACHING</span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden items-center gap-12 md:flex">
              {navLinks.map((link) =>
                renderNavItem(
                  link,
                  'font-display text-sm uppercase tracking-wider text-muted-foreground hover:text-primary transition-all duration-300 link-underline py-1',
                ),
              )}
              <Button asChild size="sm" className="hover:scale-105 transition-transform duration-300">
                <a href="#cta">{t('nav.bookConsultation')}</a>
              </Button>
              <LanguageSelector />
            </div>

            {/* Mobile Controls */}
            <div className="flex items-start gap-3 md:hidden">
              <LanguageSelector />
              <button
                className="flex h-12 w-12 items-center justify-center rounded-full border border-border bg-secondary/80 text-foreground shadow-sm transition-colors duration-300 touch-manipulation hover:bg-secondary"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-label="Toggle menu"
                aria-expanded={isMobileMenuOpen}
              >
                {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>
          </div>

        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="absolute top-full left-0 right-0 border-b border-border bg-background/95 py-6 shadow-lg backdrop-blur-xl md:hidden">
            <div className="flex flex-col gap-4 px-4">
              {navLinks.map((link) =>
                renderNavItem(
                  link,
                  'font-display py-2 text-lg uppercase tracking-wider text-muted-foreground transition-colors touch-manipulation hover:text-primary',
                  () => setIsMobileMenuOpen(false),
                ),
              )}
              <Button asChild className="mt-4">
                <a href="#cta" onClick={() => setIsMobileMenuOpen(false)}>
                  {t('nav.bookConsultation')}
                </a>
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
