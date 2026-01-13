import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
const navLinks = [{
  href: '#about',
  label: 'About'
}, {
  href: '#services',
  label: 'Services'
}, {
  href: '#pricing',
  label: 'Pricing'
}, {
  href: '#referrals',
  label: 'Testimonials'
}];
const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  return <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-background/95 backdrop-blur-md border-b border-border' : 'bg-transparent'}`}>
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <a href="#" className="font-display text-xl md:text-2xl font-bold tracking-wider text-foreground">
            ​VIKTORLINGMAN<span className="text-primary">COACHING</span>
          </a>

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
              <a href="#cta">Book Consultation</a>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden text-foreground p-2" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} aria-label="Toggle menu">
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && <div className="md:hidden absolute top-full left-0 right-0 bg-background/98 backdrop-blur-md border-b border-border py-6">
            <div className="flex flex-col gap-4 px-4">
              {navLinks.map(link => <a key={link.href} href={link.href} className="font-display text-lg uppercase tracking-wider text-muted-foreground hover:text-primary transition-colors" onClick={() => setIsMobileMenuOpen(false)}>
                  {link.label}
                </a>)}
              <Button asChild className="mt-4">
                <a href="#cta" onClick={() => setIsMobileMenuOpen(false)}>Book Consultation</a>
              </Button>
            </div>
          </div>}
      </div>
    </nav>;
};
export default Navigation;