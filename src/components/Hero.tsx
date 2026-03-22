import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, Calendar, FileText } from 'lucide-react';
import { useParallax } from '@/hooks/useParallax';
import { trackClick } from '@/lib/analytics';

const Hero = () => {
  const { t } = useTranslation();
  const parallaxOffset = useParallax(0.4);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Parallax */}
      <div className="absolute inset-0">
        <img 
          src="/lovable-uploads/0b4f51b5-50f7-429b-8bbb-90c8eb89abbb.jpg" 
          alt="Strongman athlete Viktor Lingman performing log press at competition" 
          className="w-full h-[120%] object-cover object-center scale-105 animate-[scaleIn_1.5s_ease-out_forwards]" 
          style={{ transform: `translateY(${parallaxOffset}px) scale(1.05)` }}
          fetchPriority="high"
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
            {t('hero.tagline')}
          </p>
          
          <h1 className="font-display text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold text-foreground leading-tight mb-4 md:mb-6 animate-fade-up opacity-0 delay-100">
            {t('hero.title1')}
            <span className="block text-gradient-animated">{t('hero.title2')}</span>
            {t('hero.title3')}
          </h1>
          
          <p className="text-sm md:text-xl text-muted-foreground max-w-xl mb-4 md:mb-8 animate-fade-up opacity-0 delay-200 hidden sm:block">
            {t('hero.description')}
          </p>

          {/* Aspirational Questions */}
          <div className="mb-4 md:mb-8 animate-fade-up opacity-0 delay-250 max-w-xl">
            <p className="text-xs md:text-base text-foreground/70 leading-relaxed">
              {t('hero.questions.intro')}{' '}
              <span className="text-primary font-semibold">{t('hero.questions.q1')}</span>{' '}
              <span className="text-primary font-semibold">{t('hero.questions.q2')}</span>{' '}
              <span className="text-primary font-semibold hidden sm:inline">{t('hero.questions.q3')}</span>{' '}
              <span className="text-primary font-semibold">{t('hero.questions.q4')}</span>{' '}
              <span className="text-primary font-semibold hidden sm:inline">{t('hero.questions.q5')}</span>
            </p>
          </div>

          <div className="flex flex-col gap-3 md:gap-4 animate-fade-up opacity-0 delay-300 max-w-xl">
            <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
              <Button variant="hero" size="lg" asChild className="group w-full sm:flex-1" onClick={() => trackClick('apply_now_hero')}>
                <Link to="/apply">
                  <FileText className="mr-2 h-5 w-5 transition-transform duration-300 group-hover:scale-110" />
                  {t('hero.applyNow', 'Apply Now')}
                </Link>
              </Button>
              <Button variant="hero" size="lg" asChild className="group w-full sm:flex-1" onClick={() => trackClick('book_consultation_hero')}>
                <a href="/book">
                  <Calendar className="mr-2 h-5 w-5 transition-transform duration-300 group-hover:scale-110" />
                  {t('hero.freeConsultation')}
                </a>
              </Button>
            </div>
            <Button variant="heroOutline" size="lg" asChild className="group w-full">
              <a href="#services">
                {t('hero.whatIOffer')}
                <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
              </a>
            </Button>
          </div>
        </div>
      </div>

      {/* Scroll Indicator - hidden on mobile for more space */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-float hidden sm:block">
        <div className="w-6 h-10 border-2 border-muted-foreground/30 rounded-full flex justify-center hover:border-primary/50 transition-colors duration-300">
          <div className="w-1 h-3 bg-primary rounded-full mt-2 animate-bounce" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
