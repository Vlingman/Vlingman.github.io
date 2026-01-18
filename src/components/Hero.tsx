import { Button } from '@/components/ui/button';
import { ArrowRight, Calendar } from 'lucide-react';
import { useParallax } from '@/hooks/useParallax';

const Hero = () => {
  const parallaxOffset = useParallax(0.4);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Parallax */}
      <div className="absolute inset-0">
        <img 
          src="/lovable-uploads/0b4f51b5-50f7-429b-8bbb-90c8eb89abbb.jpg" 
          alt="Strongman athlete performing log press at competition" 
          className="w-full h-[120%] object-cover object-center scale-105 animate-[scaleIn_1.5s_ease-out_forwards]" 
          style={{ transform: `translateY(${parallaxOffset}px) scale(1.05)` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-background/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/50" />
      </div>

      {/* Decorative elements */}
      <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-primary/5 rounded-full blur-3xl animate-pulse-subtle" />
      <div className="absolute bottom-1/3 left-1/4 w-96 h-96 bg-primary/3 rounded-full blur-3xl animate-pulse-subtle delay-500" />

      {/* Content */}
      <div className="container relative z-10 mx-auto px-4 md:px-6 pt-20">
        <div className="max-w-3xl">
          <p className="font-display text-primary uppercase tracking-[0.2em] md:tracking-[0.3em] text-xs md:text-base mb-3 md:mb-4 animate-fade-up opacity-0">
            Strongman Coaching
          </p>
          
          <h1 className="font-display text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold text-foreground leading-tight mb-4 md:mb-6 animate-fade-up opacity-0 delay-100">
            BUILD
            <span className="block text-gradient-animated">CHAMPIONSHIP</span>
            STRENGTH
          </h1>
          
          <p className="text-base md:text-xl text-muted-foreground max-w-xl mb-6 md:mb-8 animate-fade-up opacity-0 delay-200">
            Train with a competitive strongman athlete. Custom programs, 
            competition prep, and the guidance you need to reach your full potential.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 animate-fade-up opacity-0 delay-300">
            <Button variant="hero" size="xl" asChild className="group">
              <a href="https://cal.com/YOUR_USERNAME/consultation" target="_blank" rel="noopener noreferrer">
                <Calendar className="mr-2 h-5 w-5 transition-transform duration-300 group-hover:scale-110" />
                Free Consultation
              </a>
            </Button>
            <Button variant="heroOutline" size="xl" asChild className="group">
              <a href="#services">
                WHAT I OFFER  
                <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
              </a>
            </Button>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-float">
        <div className="w-6 h-10 border-2 border-muted-foreground/30 rounded-full flex justify-center hover:border-primary/50 transition-colors duration-300">
          <div className="w-1 h-3 bg-primary rounded-full mt-2 animate-bounce" />
        </div>
      </div>
    </section>
  );
};

export default Hero;