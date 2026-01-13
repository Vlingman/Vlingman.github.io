import { CheckCircle2, ArrowRight, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import atlasImage from '@/assets/atlas-stone.jpeg';
import deadliftImage from '@/assets/deadlift.jpeg';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const services = ['Custom periodized training programs', 'Event-specific technique coaching', 'Peak week strategy & programming', 'Competition day game plan', 'Weekly video form reviews', 'Direct messaging support', 'Regular program adjustments', 'Competition prep & peaking', 'Water cutting for weigh-ins', 'Weight class management', 'Recovery & deload programming', 'At-competition coaching (when possible)'];

const Services = () => {
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation();
  const { ref: listRef, isVisible: listVisible } = useScrollAnimation();
  const { ref: imagesRef, isVisible: imagesVisible } = useScrollAnimation();

  return (
    <section id="services" className="py-20 md:py-32">
      <div className="container mx-auto px-4 md:px-6">
        {/* Section Header */}
        <div 
          ref={headerRef}
          className={`text-center mb-16 transition-all duration-700 ${
            headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <p className="font-display text-primary uppercase tracking-[0.3em] text-sm mb-4">
            What I Offer
          </p>
          <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground mb-4">
            COMPLETE COACHING
          </h2>
          <div className="w-24 h-1 bg-primary mx-auto mb-6" />
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Everything you need to become a stronger, more competitive athlete. 
            From programming to competition day, I've got you covered.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
          {/* Services List */}
          <div 
            ref={listRef}
            className={`bg-card rounded-lg p-8 md:p-10 border border-border hover-glow transition-all duration-700 ${
              listVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
            }`}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                <Zap className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-display text-2xl font-bold text-foreground">
                Full Coaching Includes
              </h3>
            </div>

            <ul className="grid sm:grid-cols-2 gap-4">
              {services.map((service, index) => (
                <li 
                  key={index} 
                  className={`flex items-start gap-3 transition-all duration-500 ${
                    listVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                  }`}
                  style={{ transitionDelay: `${index * 50}ms` }}
                >
                  <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-muted-foreground">{service}</span>
                </li>
              ))}
            </ul>

            <div className="mt-8 pt-6 border-t border-border">
              <Button asChild className="w-full sm:w-auto hover-lift">
                <a href="#pricing">
                  View Pricing Plans
                  <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </Button>
            </div>
          </div>

          {/* Images */}
          <div 
            ref={imagesRef}
            className={`relative transition-all duration-700 ${
              imagesVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
            }`}
          >
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="img-zoom rounded-lg shadow-lg overflow-hidden">
                  <img 
                    src={atlasImage} 
                    alt="Atlas stone training" 
                    className="w-full h-48 object-cover object-[center_30%]" 
                  />
                </div>
                <div className="bg-primary/10 rounded-lg p-6 text-center border-glow group cursor-default">
                  <p className="font-display text-3xl font-bold text-primary group-hover:scale-110 transition-transform duration-300">8+</p>
                  <p className="text-sm text-muted-foreground">Years Competition Experience</p>
                </div>
              </div>
              <div className="space-y-4 pt-8">
                <div className="bg-card rounded-lg p-6 text-center border border-border border-glow group cursor-default">
                  <p className="font-display text-3xl font-bold text-foreground group-hover:scale-110 transition-transform duration-300">10+</p>
                  <p className="text-sm text-muted-foreground">Years Training Experience</p>
                </div>
                <div className="img-zoom rounded-lg shadow-lg overflow-hidden">
                  <img 
                    src={deadliftImage} 
                    alt="Deadlift training" 
                    className="w-full h-48 object-cover" 
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
