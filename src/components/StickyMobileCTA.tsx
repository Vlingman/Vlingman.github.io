import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { trackClick } from '@/lib/analytics';

const StickyMobileCTA = () => {
  const { t } = useTranslation();
  const [isVisible, setIsVisible] = useState(false);
  const [isAtBottom, setIsAtBottom] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show after scrolling past hero (roughly 100vh)
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      
      setIsVisible(scrollY > windowHeight * 0.5);
      
      // Hide when near footer
      setIsAtBottom(scrollY + windowHeight > documentHeight - 200);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Only show on mobile
  return (
    <div 
      className={`md:hidden fixed bottom-0 left-0 right-0 z-40 p-4 bg-gradient-to-t from-background via-background to-transparent transition-all duration-300 ${
        isVisible && !isAtBottom ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
      }`}
    >
      <Button 
        asChild 
        size="lg" 
        className="w-full shadow-lg shadow-primary/25 font-display uppercase tracking-wider"
        onClick={() => trackClick('apply_now_sticky_mobile')}
      >
        <Link to="/apply">
          {t('cta.applyNow')}
          <ArrowRight className="ml-2 w-4 h-4" />
        </Link>
      </Button>
    </div>
  );
};

export default StickyMobileCTA;
