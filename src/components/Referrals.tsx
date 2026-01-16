import { MessageSquare } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const Referrals = () => {
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation();

  return (
    <section id="referrals" className="py-10 md:py-24">
      <div className="container mx-auto px-4 md:px-6">
        {/* Compact Section for Mobile */}
        <div 
          ref={headerRef}
          className={`max-w-2xl mx-auto text-center transition-all duration-700 ${
            headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <p className="font-display text-primary uppercase tracking-[0.15em] md:tracking-[0.3em] text-xs md:text-sm mb-2 md:mb-4">
            Testimonials
          </p>
          <h2 className="font-display text-xl md:text-5xl font-bold text-foreground mb-2 md:mb-4">
            BE THE FIRST
          </h2>
          <div className="w-12 md:w-24 h-1 bg-primary mx-auto mb-4 md:mb-6" />
          
          {/* Founding Athlete CTA - More compact on mobile */}
          <div 
            className="bg-primary/10 border border-primary/30 rounded-lg p-4 md:p-6 transition-all duration-700"
            style={{ transitionDelay: '200ms' }}
          >
            <MessageSquare className="w-8 h-8 md:w-10 md:h-10 text-primary mx-auto mb-2 md:mb-3" />
            <p className="text-foreground font-display font-bold text-base md:text-lg mb-1 md:mb-2">
              Founding Athlete Spots Available
            </p>
            <p className="text-muted-foreground text-xs md:text-sm">
              Be among the first to train with a world champion. Early clients receive personalized attention and can be featured here.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Referrals;
