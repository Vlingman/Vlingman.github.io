import { Check, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const pricingPlans = [
  {
    name: 'Program Only',
    price: '80',
    period: '/month',
    description: 'Custom programming delivered monthly.',
    features: [
      'Personalized training program',
      'Monthly program updates',
      'Exercise demo videos',
    ],
    cta: 'Get Started',
    popular: false,
  },
  {
    name: 'Full 1-on-1 Coaching',
    price: '150',
    period: '/month',
    description: 'Complete coaching with direct communication.',
    features: [
      'Custom periodized program',
      'Weekly video form reviews',
      'Direct messaging access',
      'Competition prep & water cut',
      'Unlimited adjustments',
    ],
    cta: 'Apply Now',
    popular: true,
  },
  {
    name: 'Coaching + Nutrition',
    price: '200',
    period: '/month',
    description: 'Premium training and nutrition package.',
    features: [
      'Everything in Full Coaching',
      'Personalized nutrition plan',
      'Weight class management',
      'Competition day nutrition',
    ],
    cta: 'Apply Now',
    popular: false,
  },
];

const Pricing = () => {
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation();
  const { ref: cardsRef, isVisible: cardsVisible } = useScrollAnimation();

  return (
    <section id="pricing" className="py-12 md:py-32 bg-secondary/30">
      <div className="container mx-auto px-4 md:px-6">
        {/* Section Header */}
        <div 
          ref={headerRef}
          className={`text-center mb-8 md:mb-16 transition-all duration-700 ${
            headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <p className="font-display text-primary uppercase tracking-[0.15em] md:tracking-[0.3em] text-xs md:text-sm mb-2 md:mb-4">
            Pricing
          </p>
          <h2 className="font-display text-xl md:text-5xl font-bold text-foreground mb-2 md:mb-4">
            INVEST IN YOUR STRENGTH
          </h2>
          <div className="w-12 md:w-24 h-1 bg-primary mx-auto" />
        </div>

        {/* Mobile: Horizontal scroll | Desktop: Grid */}
        <div 
          ref={cardsRef} 
          className="flex md:grid md:grid-cols-3 gap-4 md:gap-8 max-w-6xl mx-auto overflow-x-auto pb-4 md:pb-0 snap-x snap-mandatory md:snap-none -mx-4 px-4 md:mx-0 md:px-0"
        >
          {pricingPlans.map((plan, index) => (
            <div
              key={index}
              className={`relative bg-card rounded-lg p-5 md:p-8 border transition-all duration-700 hover-lift flex-shrink-0 w-[280px] md:w-auto snap-center ${
                plan.popular
                  ? 'border-primary shadow-[0_0_30px_hsl(24_95%_53%/0.15)] md:scale-105'
                  : 'border-border hover:border-primary/50'
              } ${cardsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              {/* Popular Badge */}
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <div className="bg-primary text-primary-foreground px-3 py-0.5 rounded-full text-xs font-display uppercase tracking-wider flex items-center gap-1">
                    <Star className="w-3 h-3 fill-current" />
                    Popular
                  </div>
                </div>
              )}

              {/* Plan Name */}
              <h3 className="font-display text-base md:text-xl font-bold text-foreground mb-1 md:mb-2">
                {plan.name}
              </h3>

              {/* Price */}
              <div className="mb-2 md:mb-4">
                <span className="font-display text-3xl md:text-5xl font-bold text-foreground">
                  €{plan.price}
                </span>
                <span className="text-muted-foreground text-sm">{plan.period}</span>
              </div>

              {/* Description */}
              <p className="text-muted-foreground text-xs md:text-sm mb-4 md:mb-6 line-clamp-2">
                {plan.description}
              </p>

              {/* Features */}
              <ul className="space-y-2 md:space-y-3 mb-4 md:mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-xs md:text-sm text-muted-foreground">{feature}</span>
                  </li>
                ))}
              </ul>

              {/* CTA Button */}
              <Button
                variant={plan.popular ? 'default' : 'outline'}
                size="sm"
                className="w-full group hover:scale-[1.02] transition-transform duration-300 text-xs md:text-sm"
                asChild
              >
                <a href="#cta" className="flex items-center justify-center gap-1">
                  {plan.cta}
                  <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
                </a>
              </Button>
            </div>
          ))}
        </div>

        {/* Scroll hint for mobile */}
        <p className="text-center text-xs text-muted-foreground mt-4 md:hidden">
          Swipe to see all plans →
        </p>

        {/* Note */}
        <p className="text-center text-xs text-muted-foreground mt-4 md:mt-8 hidden md:block">
          All prices in EUR. *At-competition coaching available based on location.
        </p>
      </div>
    </section>
  );
};

export default Pricing;
