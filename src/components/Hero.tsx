import { Button } from '@/components/ui/button';
import { ArrowRight, Calendar } from 'lucide-react';
import heroImage from '@/assets/log-press.jpeg';

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="Strongman athlete performing log press at competition"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-background/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/50" />
      </div>

      {/* Content */}
      <div className="container relative z-10 mx-auto px-4 md:px-6 pt-20">
        <div className="max-w-3xl">
          <p className="font-display text-primary uppercase tracking-[0.3em] text-sm md:text-base mb-4 animate-fade-up opacity-0">
            Elite Strongman Coaching
          </p>
          
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-foreground leading-tight mb-6 animate-fade-up opacity-0 delay-100">
            BUILD
            <span className="block text-primary">CHAMPIONSHIP</span>
            STRENGTH
          </h1>
          
          <p className="text-lg md:text-xl text-muted-foreground max-w-xl mb-8 animate-fade-up opacity-0 delay-200">
            Train with a competitive strongman athlete. Custom programs, 
            competition prep, and the guidance you need to reach your full potential.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 animate-fade-up opacity-0 delay-300">
            <Button variant="hero" size="xl" asChild>
              <a href="#cta">
                <Calendar className="mr-2 h-5 w-5" />
                Free Consultation
              </a>
            </Button>
            <Button variant="heroOutline" size="xl" asChild>
              <a href="#services">
                View Programs
                <ArrowRight className="ml-2 h-5 w-5" />
              </a>
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 mt-16 pt-8 border-t border-border/30 animate-fade-up opacity-0 delay-400">
            <div>
              <p className="font-display text-3xl md:text-4xl font-bold text-primary">10+</p>
              <p className="text-sm text-muted-foreground mt-1">Competitions</p>
            </div>
            <div>
              <p className="font-display text-3xl md:text-4xl font-bold text-primary">5+</p>
              <p className="text-sm text-muted-foreground mt-1">Years Coaching</p>
            </div>
            <div>
              <p className="font-display text-3xl md:text-4xl font-bold text-primary">50+</p>
              <p className="text-sm text-muted-foreground mt-1">Athletes Trained</p>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-muted-foreground/30 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-primary rounded-full mt-2" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
