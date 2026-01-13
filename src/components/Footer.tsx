import { Instagram, Youtube, Mail, ArrowUp } from 'lucide-react';
import { useState, useEffect } from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* Scroll to Top Button */}
      <button
        onClick={scrollToTop}
        className={`fixed bottom-8 right-8 z-50 w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-all duration-300 ${
          showScrollTop ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'
        }`}
        aria-label="Scroll to top"
      >
        <ArrowUp className="w-5 h-5" />
      </button>

      <footer className="bg-card border-t border-border py-12">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid md:grid-cols-4 gap-8">
            {/* Brand */}
            <div className="md:col-span-2">
              <a href="#" className="font-display text-2xl font-bold tracking-wider text-foreground hover:text-primary transition-colors duration-300">
                ​VIKTORLINGMAN<span className="text-primary">COACHING</span>
              </a>
              <p className="text-muted-foreground mt-4 max-w-md">
                Professional strongman and strength coaching. Building champions through 
                proven training methods and personalized programming.
              </p>
              {/* Social Links */}
              <div className="flex gap-4 mt-6">
                <a 
                  href="https://www.instagram.com/viktor_lingman/" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="w-10 h-10 bg-secondary rounded-full flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/10 hover:scale-110 transition-all duration-300" 
                  aria-label="Instagram"
                >
                  <Instagram className="w-5 h-5" />
                </a>
                <a 
                  href="#" 
                  className="w-10 h-10 bg-secondary rounded-full flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/10 hover:scale-110 transition-all duration-300" 
                  aria-label="YouTube"
                >
                  <Youtube className="w-5 h-5" />
                </a>
                <a 
                  href="mailto:vabba.lingman@gmail.com" 
                  className="w-10 h-10 bg-secondary rounded-full flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/10 hover:scale-110 transition-all duration-300" 
                  aria-label="Email"
                >
                  <Mail className="w-5 h-5" />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-display text-lg font-bold text-foreground mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li>
                  <a href="#about" className="text-muted-foreground hover:text-primary transition-colors duration-300 link-underline">
                    About Me
                  </a>
                </li>
                <li>
                  <a href="#services" className="text-muted-foreground hover:text-primary transition-colors duration-300 link-underline">
                    Services
                  </a>
                </li>
                <li>
                  <a href="#pricing" className="text-muted-foreground hover:text-primary transition-colors duration-300 link-underline">
                    Pricing
                  </a>
                </li>
                <li>
                  <a href="#referrals" className="text-muted-foreground hover:text-primary transition-colors duration-300 link-underline">
                    Testimonials
                  </a>
                </li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="font-display text-lg font-bold text-foreground mb-4">Get Started</h4>
              <ul className="space-y-2">
                <li>
                  <a 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-muted-foreground hover:text-primary transition-colors duration-300 link-underline" 
                    href="https://forms.gle/cdERLCFkTc9ZumSYA"
                  >
                    Athlete Questionnaire
                  </a>
                </li>
                <li>
                  <a 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-muted-foreground hover:text-primary transition-colors duration-300 link-underline" 
                    href="https://forms.gle/BkNUft1t15iiBVWM9"
                  >
                    Book Consultation
                  </a>
                </li>
                <li>
                  <a 
                    className="text-muted-foreground hover:text-primary transition-colors duration-300 link-underline" 
                    href="mailto:vabba.lingman@gmail.com"
                  >
                    Contact Me
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-border mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground">
              © {currentYear} ViktorLingmanCoaching. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm text-muted-foreground">
              <a href="#" className="hover:text-primary transition-colors duration-300 link-underline">Privacy Policy</a>
              <a href="#" className="hover:text-primary transition-colors duration-300 link-underline">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;