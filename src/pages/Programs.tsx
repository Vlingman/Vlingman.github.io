import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { ArrowLeft, Clock, Dumbbell } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { useEffect } from 'react';
import { trackPageView } from '@/lib/analytics';

import programBeginner from '@/assets/program-beginner.jpg';
import programCompetition from '@/assets/program-competition.jpg';
import programStrength from '@/assets/program-strength.jpg';

const programs = [
  {
    id: 'beginner-strongman',
    image: programBeginner,
    price: 49,
    weeks: 12,
    level: 'Beginner',
  },
  {
    id: 'competition-prep',
    image: programCompetition,
    price: 69,
    weeks: 16,
    level: 'Intermediate–Advanced',
  },
  {
    id: 'strength-hypertrophy',
    image: programStrength,
    price: 39,
    weeks: 8,
    level: 'All Levels',
  },
];

const Programs = () => {
  const { t } = useTranslation();

  useEffect(() => {
    trackPageView('/programs');
  }, []);

  return (
    <main className="min-h-screen bg-background">
      <Navigation />

      <section className="pt-28 md:pt-36 pb-16 md:pb-24">
        <div className="container mx-auto px-4 md:px-6">
          {/* Back link */}
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-8 font-display text-sm uppercase tracking-wider"
          >
            <ArrowLeft className="w-4 h-4" />
            {t('programs.backToHome')}
          </Link>

          {/* Header */}
          <div className="text-center mb-12 md:mb-16">
            <p className="font-display text-primary uppercase tracking-[0.15em] md:tracking-[0.3em] text-xs md:text-sm mb-2 md:mb-4">
              {t('programs.tagline')}
            </p>
            <h1 className="font-display text-2xl md:text-5xl font-bold text-foreground mb-3 md:mb-4">
              {t('programs.title')}
            </h1>
            <div className="w-12 md:w-24 h-1 bg-primary mx-auto mb-4 md:mb-6" />
            <p className="text-muted-foreground text-sm md:text-lg max-w-2xl mx-auto">
              {t('programs.description')}
            </p>
          </div>

          {/* Coming Soon Badge */}
          <div className="flex justify-center mb-10">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/10 text-primary font-display text-xs md:text-sm uppercase tracking-wider">
              <Clock className="w-4 h-4" />
              {t('programs.comingSoon')}
            </span>
          </div>

          {/* Programs Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-5xl mx-auto">
            {programs.map((program) => (
              <Link
                key={program.id}
                to={`/programs/${program.id}`}
                className="group relative bg-card rounded-lg overflow-hidden border border-border hover:border-primary/50 transition-all duration-500 hover-lift"
              >
                {/* Image */}
                <div className="aspect-square overflow-hidden relative">
                  <img
                    src={program.image}
                    alt={t(`programs.items.${program.id}.name`)}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-card via-card/20 to-transparent" />

                  {/* Coming Soon Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center bg-background/60 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="font-display text-primary text-lg uppercase tracking-wider">
                      {t('programs.comingSoon')}
                    </span>
                  </div>
                </div>

                {/* Info */}
                <div className="p-4 md:p-5">
                  <div className="flex items-center gap-2 mb-2">
                    <Dumbbell className="w-3.5 h-3.5 text-primary" />
                    <span className="text-xs text-muted-foreground uppercase tracking-wider">
                      {program.level} · {program.weeks} {t('programs.weeks')}
                    </span>
                  </div>
                  <h3 className="font-display text-base md:text-lg font-bold text-foreground mb-1 group-hover:text-primary transition-colors">
                    {t(`programs.items.${program.id}.name`)}
                  </h3>
                  <p className="text-xs text-muted-foreground mb-3 line-clamp-2">
                    {t(`programs.items.${program.id}.shortDesc`)}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="font-display text-xl font-bold text-foreground">
                      €{program.price}
                    </span>
                    <span className="text-xs text-primary font-display uppercase tracking-wider group-hover:translate-x-1 transition-transform duration-300">
                      {t('programs.viewDetails')} →
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Bottom CTA */}
          <div className="text-center mt-12 md:mt-16">
            <p className="text-muted-foreground text-sm mb-4">
              {t('programs.customNote')}
            </p>
            <Button variant="outline" asChild>
              <Link to="/apply">{t('programs.applyForCoaching')}</Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default Programs;
