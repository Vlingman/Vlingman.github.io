import { Check, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const pricingPlans = [
  {
    name: 'Program Only',
    price: '80',
    period: '/month',
    description: 'Custom programming delivered monthly, perfect for self-motivated athletes.',
    features: [
      'Personalized training program',
      'Monthly program updates',
      'Exercise demonstration videos',
    ],
    cta: 'Get Started',
    popular: false,
  },
  {
    name: 'Full 1-on-1 Coaching',
    price: '150',
    period: '/month',
    description: 'Complete coaching experience with hands-on guidance and direct communication.',
    features: [
      'Custom periodized program',
      'Weekly video form reviews',
      'Direct messaging access',
      'Competition prep support',
      'Water cutting guidance',
      'Unlimited program adjustments',
      'At-competition coaching*',
    ],
    cta: 'Apply Now',
    popular: true,
  },
  {
    name: 'Full Coaching + Nutrition',
    price: '200',
    period: '/month',
    description: 'Premium package with complete training and nutrition programming.',
    features: [
      'Everything in Full Coaching',
      'Personalized nutrition plan',
      'Diet adjustments & tracking',
      'Weight class management',
      'Competition day nutrition',
      'Supplement guidance',
      'Body composition optimization',
    ],
    cta: 'Apply Now',
    popular: false,
  },
];

const Pricing = () => {
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation();
  const { ref: cardsRef, isVisible: cardsVisible } = useScrollAnimation();

  return (
    <section id="pricing" className="py-20 md:py-32 bg-secondary/30">
      <div className="container mx-auto px-4 md:px-6">
        {/* Section Header */}
        <div 
          ref={headerRef}
          className={`text-center mb-16 transition-all duration-700 ${
            headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <p className="font-display text-primary uppercase tracking-[0.3em] text-sm mb-4">
            Pricing
          </p>
          <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground mb-4">
            INVEST IN YOUR STRENGTH
          </h2>
          <div className="w-24 h-1 bg-primary mx-auto mb-6" />
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Transparent pricing with no hidden fees. All plans include an initial consultation 
            to ensure we're the right fit.
          </p>
        </div>

        {/* Pricing Grid */}
        <div ref={cardsRef} className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {pricingPlans.map((plan, index) => (
            <div
              key={index}
              className={`relative bg-card rounded-lg p-8 border transition-all duration-700 hover-lift ${
                plan.popular
                  ? 'border-primary shadow-[0_0_40px_hsl(24_95%_53%/0.2)] scale-105'
                  : 'border-border hover:border-primary/50'
              } ${cardsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              {/* Popular Badge */}
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <div className="bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-display uppercase tracking-wider flex items-center gap-1">
                    <Star className="w-4 h-4 fill-current" />
                    Most Popular
                  </div>
                </div>
              )}

              {/* Plan Name */}
              <h3 className="font-display text-xl font-bold text-foreground mb-2">
                {plan.name}
              </h3>

              {/* Price */}
              <div className="mb-4">
                <span className="font-display text-4xl md:text-5xl font-bold text-foreground">
                  €{plan.price}
                </span>
                <span className="text-muted-foreground">{plan.period}</span>
              </div>

              {/* Description */}
              <p className="text-muted-foreground text-sm mb-6">
                {plan.description}
              </p>

              {/* Features */}
              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-muted-foreground">{feature}</span>
                  </li>
                ))}
              </ul>

              {/* CTA Button */}
              <Button
                variant={plan.popular ? 'default' : 'outline'}
                className="w-full"
                asChild
              >
                <a href="#cta">{plan.cta}</a>
              </Button>
            </div>
          ))}
        </div>

        {/* Note */}
        <p className="text-center text-sm text-muted-foreground mt-8">
          All prices in EUR. *At-competition coaching available when possible based on location and schedule.
        </p>
      </div>
    </section>
  );
};

export default Pricing;
