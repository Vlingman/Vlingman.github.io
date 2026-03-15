import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Check, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const Pricing = () => {
  const { t } = useTranslation();
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation();
  const { ref: cardsRef, isVisible: cardsVisible } = useScrollAnimation();

  const pricingPlans = [
    {
      name: t('pricing.plans.programOnly.name'),
      price: '80',
      period: t('pricing.perMonth'),
      description: t('pricing.plans.programOnly.description'),
      features: [
        t('pricing.plans.programOnly.features.programOrNutrition'),
        t('pricing.plans.programOnly.features.monthlyUpdates'),
        t('pricing.plans.programOnly.features.demoVideos'),
      ],
      cta: t('pricing.plans.programOnly.cta'),
    },
    {
      name: t('pricing.plans.fullCoaching.name'),
      price: '150',
      period: t('pricing.perMonth'),
      description: t('pricing.plans.fullCoaching.description'),
      features: [
        t('pricing.plans.fullCoaching.features.customProgram'),
        t('pricing.plans.fullCoaching.features.videoReviews'),
        t('pricing.plans.fullCoaching.features.messaging'),
        t('pricing.plans.fullCoaching.features.competitionPrep'),
        t('pricing.plans.fullCoaching.features.unlimitedAdjustments'),
      ],
      cta: t('pricing.plans.fullCoaching.cta'),
      highlighted: true,
    },
    {
      name: t('pricing.plans.coachingNutrition.name'),
      price: '200',
      period: t('pricing.perMonth'),
      description: t('pricing.plans.coachingNutrition.description'),
      features: [
        t('pricing.plans.coachingNutrition.features.everythingFull'),
        t('pricing.plans.coachingNutrition.features.nutritionPlan'),
        t('pricing.plans.coachingNutrition.features.weightClass'),
        t('pricing.plans.coachingNutrition.features.competitionNutrition'),
      ],
      cta: t('pricing.plans.coachingNutrition.cta'),
    },
  ];

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
            {t('pricing.tagline')}
          </p>
          <h2 className="font-display text-xl md:text-5xl font-bold text-foreground mb-2 md:mb-4">
            {t('pricing.title')}
          </h2>
          <div className="w-12 md:w-24 h-1 bg-primary mx-auto" />
        </div>

        {/* Pricing Grid */}
        <div 
          ref={cardsRef} 
          className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8 max-w-6xl mx-auto"
        >
          {pricingPlans.map((plan, index) => (
            <div
              key={index}
              className={`relative bg-card rounded-lg p-5 md:p-8 border transition-all duration-700 hover-lift ${
                plan.highlighted
                  ? 'border-primary/50 md:scale-105'
                  : 'border-border hover:border-primary/50'
              } ${cardsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
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
              <p className="text-muted-foreground text-xs md:text-sm mb-4 md:mb-6">
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
                variant={plan.highlighted ? 'default' : 'outline'}
                size="sm"
                className="w-full group hover:scale-[1.02] transition-transform duration-300 text-xs md:text-sm"
                asChild
              >
                <Link to="/apply" className="flex items-center justify-center gap-1">
                  {plan.cta}
                  <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
                </Link>
              </Button>
            </div>
          ))}
        </div>

        {/* Note & Programs Link */}
        <div className="text-center mt-6 md:mt-8 space-y-4">
          <p className="text-xs text-muted-foreground">
            {t('pricing.note')}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <p className="text-sm text-muted-foreground">
              {t('pricing.programsNote', 'Looking for a standalone program?')}
            </p>
            <Button variant="outline" size="sm" asChild className="group">
              <Link to="/programs">
                <ShoppingBag className="mr-2 h-4 w-4" />
                {t('pricing.browsePrograms', 'Browse Programs')}
                <span className="ml-1 group-hover:translate-x-1 transition-transform duration-300">→</span>
              </Link>
            </Button>
          </div>
        </div>
  );
};

export default Pricing;
