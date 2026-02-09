import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import LanguageSelector from '@/components/LanguageSelector';
import { Link } from 'react-router-dom';

const Navigation = () => {
  const { t } = useTranslation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: '#about', label: t('nav.about') },
    { href: '#services', label: t('nav.services') },
    { href: '#pricing', label: t('nav.pricing') },
    { href: '#referrals', label: t('nav.testimonials') }
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-background/95 backdrop-blur-md border-b border-border' : 'bg-transparent'}`}>
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link to="/" className="font-display text-xl md:text-2xl font-bold tracking-wider text-foreground">
            VIKTORLINGMAN<span className="text-primary">COACHING</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map(link => (
              <a 
                key={link.href} 
                href={link.href} 
                className="font-display text-sm uppercase tracking-wider text-muted-foreground hover:text-primary transition-all duration-300 link-underline py-1"
              >
                {link.label}
              </a>
            ))}
            <Button asChild size="sm" className="hover:scale-105 transition-transform duration-300">
              <a href="#cta">{t('nav.bookConsultation')}</a>
            </Button>
            <LanguageSelector />
          </div>

          {/* Mobile: Language Selector + Menu Button */}
          <div className="md:hidden flex items-center gap-3">
            <LanguageSelector />
            <button 
              className="text-foreground p-3 -mr-2 touch-manipulation" 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-background border-b border-border py-6 shadow-lg">
            <div className="flex flex-col gap-4 px-4">
              {navLinks.map(link => (
                <a 
                  key={link.href} 
                  href={link.href} 
                  className="font-display text-lg uppercase tracking-wider text-muted-foreground hover:text-primary transition-colors py-2 touch-manipulation" 
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.label}
                </a>
              ))}
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
