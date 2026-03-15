import { useTranslation } from 'react-i18next';
import { Link, useParams, Navigate } from 'react-router-dom';
import { ArrowLeft, Check, Clock, Dumbbell, Target } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { useEffect } from 'react';
import { trackPageView } from '@/lib/analytics';

import programBeginner from '@/assets/program-beginner.jpg';
import programCompetition from '@/assets/program-competition.jpg';
import programStrength from '@/assets/program-strength.jpg';

const programData: Record<string, { image: string; price: number; weeks: number; level: string }> = {
  'beginner-strongman': { image: programBeginner, price: 49, weeks: 12, level: 'Beginner' },
  'competition-prep': { image: programCompetition, price: 69, weeks: 16, level: 'Intermediate–Advanced' },
  'strength-hypertrophy': { image: programStrength, price: 39, weeks: 8, level: 'All Levels' },
};

const ProgramDetail = () => {
  const { t } = useTranslation();
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    trackPageView(`/programs/${id}`);
  }, [id]);

  if (!id || !programData[id]) {
    return <Navigate to="/programs" replace />;
  }

  const program = programData[id];
  const features: string[] = t(`programs.items.${id}.features`, { returnObjects: true }) as string[];

  return (
    <main className="min-h-screen bg-background">
      <Navigation />

      <section className="pt-28 md:pt-36 pb-16 md:pb-24">
        <div className="container mx-auto px-4 md:px-6 max-w-5xl">
          {/* Back link */}
          <Link
            to="/programs"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-8 font-display text-sm uppercase tracking-wider"
          >
            <ArrowLeft className="w-4 h-4" />
            {t('programs.backToPrograms')}
          </Link>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
            {/* Image */}
            <div className="aspect-square rounded-lg overflow-hidden border border-border relative">
              <img
                src={program.image}
                alt={t(`programs.items.${id}.name`)}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-card/60 to-transparent" />
            </div>

            {/* Details */}
            <div className="flex flex-col justify-center">
              {/* Coming Soon */}
              <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-primary/30 bg-primary/10 text-primary font-display text-xs uppercase tracking-wider w-fit mb-4">
                <Clock className="w-3.5 h-3.5" />
                {t('programs.comingSoon')}
              </span>

              <h1 className="font-display text-2xl md:text-4xl font-bold text-foreground mb-3">
                {t(`programs.items.${id}.name`)}
              </h1>

              {/* Meta */}
              <div className="flex flex-wrap gap-4 mb-4">
                <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
                  <Dumbbell className="w-4 h-4 text-primary" />
                  {program.level}
                </span>
                <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
                  <Target className="w-4 h-4 text-primary" />
                  {program.weeks} {t('programs.weeks')}
                </span>
              </div>

              <p className="text-muted-foreground text-sm md:text-base mb-6 leading-relaxed">
                {t(`programs.items.${id}.description`)}
              </p>

              {/* Features */}
              {Array.isArray(features) && features.length > 0 && (
                <ul className="space-y-2.5 mb-8">
                  {features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <Check className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
              )}

              {/* Price & CTA */}
              <div className="flex items-center gap-4 mb-6">
                <span className="font-display text-3xl md:text-4xl font-bold text-foreground">
                  €{program.price}
                </span>
                <span className="text-sm text-muted-foreground">{t('programs.oneTimePurchase')}</span>
              </div>

              <Button size="lg" disabled className="w-full md:w-auto opacity-70 cursor-not-allowed">
                {t('programs.comingSoon')}
              </Button>

              <p className="text-xs text-muted-foreground mt-3">
                {t('programs.notifyNote')}
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default ProgramDetail;
