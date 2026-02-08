import { useTranslation } from 'react-i18next';
import { Trophy, Medal, Award, Globe, Users, Target } from 'lucide-react';
import podiumImage from '@/assets/podium.jpeg';
import logPressImage from '@/assets/log-press.jpeg';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { useCountUp } from '@/hooks/useCountUp';

const About = () => {
  const { t } = useTranslation();
  
  const accomplishments = [
    {
      icon: Globe,
      title: t('about.accomplishments.worldChampion'),
      description: t('about.accomplishments.worldChampionDesc')
    },
    {
      icon: Trophy,
      title: t('about.accomplishments.nationalChampion'),
      description: t('about.accomplishments.nationalChampionDesc')
    },
    {
      icon: Medal,
      title: t('about.accomplishments.nordicChampion'),
      description: t('about.accomplishments.nordicChampionDesc')
    },
    {
      icon: Award,
      title: t('about.accomplishments.worldRecordHolder'),
      description: t('about.accomplishments.worldRecordHolderDesc')
    }
  ];

  const stats = [
    { value: 20, suffix: '+', label: t('about.stats.podiumFinishes'), icon: Trophy },
    { value: 10, suffix: '+', label: t('about.stats.firstPlaceWins'), icon: Medal },
    { value: 8, suffix: '+', label: t('about.stats.yearsCompeting'), icon: Target },
    { value: 10, suffix: '+', label: t('about.stats.yearsTraining'), icon: Users }
  ];

  // Animated counters for each stat
  const counter1 = useCountUp({ end: stats[0].value, duration: 500 });
  const counter2 = useCountUp({ end: stats[1].value, duration: 500 });
  const counter3 = useCountUp({ end: stats[2].value, duration: 500 });
  const counter4 = useCountUp({ end: stats[3].value, duration: 500 });
  const counters = [counter1, counter2, counter3, counter4];

  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation();
  const { ref: statsRef, isVisible: statsVisible } = useScrollAnimation();
  const { ref: imagesRef, isVisible: imagesVisible } = useScrollAnimation();
  const { ref: contentRef, isVisible: contentVisible } = useScrollAnimation();

  return (
    <section id="about" className="py-10 md:py-32 bg-secondary/30">
      <div className="container mx-auto px-4 md:px-6">
        {/* Section Header */}
        <div 
          ref={headerRef} 
          className={`text-center mb-8 md:mb-16 transition-all duration-700 ${headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          <p className="font-display text-primary uppercase tracking-[0.15em] md:tracking-[0.3em] text-xs md:text-sm mb-2 md:mb-4">
            {t('about.tagline')}
          </p>
          <h2 className="font-display text-xl md:text-5xl font-bold text-foreground mb-2 md:mb-4">
            {t('about.title')}
          </h2>
          <div className="w-12 md:w-24 h-1 bg-primary mx-auto" />
        </div>

        {/* Animated Stats Bar */}
        <div ref={statsRef} className="grid grid-cols-4 gap-2 md:gap-4 mb-8 md:mb-16 max-w-4xl mx-auto">
          {stats.map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <div 
                key={index}
                ref={counters[index].ref}
                className={`bg-card rounded-lg p-2 md:p-6 text-center border border-border hover-lift hover-glow transition-all duration-700 group ${statsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} 
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <IconComponent className="w-4 h-4 md:w-6 md:h-6 text-primary mx-auto mb-1 md:mb-2 group-hover:scale-110 transition-transform duration-300" />
                <p className="font-display text-lg md:text-4xl font-bold text-primary">
                  {counters[index].count}{stat.suffix}
                </p>
                <p className="text-[10px] md:text-sm text-muted-foreground mt-0.5 md:mt-1 leading-tight">{stat.label}</p>
              </div>
            );
          })}
        </div>

        <div className="grid lg:grid-cols-2 gap-6 md:gap-12 items-center">
          {/* Images */}
          <div 
            ref={imagesRef} 
            className={`relative transition-all duration-700 hidden md:block ${imagesVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}
          >
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="img-zoom rounded-lg shadow-xl overflow-hidden">
                  <img 
                    alt="Victory celebration at strongman competition" 
                    className="w-full h-64 object-cover object-top" 
                    src="/lovable-uploads/cf366144-5c65-47de-b24b-94ed5e6ae0e5.jpg" 
                  />
                </div>
                <div className="img-zoom rounded-lg shadow-lg overflow-hidden">
                  <img src={podiumImage} alt="First place on podium" className="w-full h-40 object-cover" />
                </div>
              </div>
              <div className="pt-8">
                <div className="img-zoom rounded-lg shadow-xl overflow-hidden">
                  <img src={logPressImage} alt="Log press world record" className="w-full h-72 object-cover" />
                </div>
                <div className="bg-primary/10 rounded-lg p-4 mt-4 text-center border-glow">
                  <p className="font-display text-sm font-bold text-primary uppercase tracking-wider">
                    {t('about.recordsNote')}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Content */}
          <div 
            ref={contentRef} 
            className={`lg:pl-8 transition-all duration-700 ${contentVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`}
          >
            <h3 className="font-display text-lg md:text-3xl font-bold text-foreground mb-3 md:mb-6 text-center md:text-left">
              {t('about.subtitle')}
            </h3>
            <div className="space-y-3 md:space-y-4 text-muted-foreground leading-relaxed text-sm md:text-base">
              <p className="hidden md:block">
                {t('about.description1')}
              </p>
              <p>
                {t('about.description2')}
              </p>
              <p className="hidden md:block">
                {t('about.description3')}
              </p>
            </div>

            {/* Accomplishments Grid */}
            <div className="grid grid-cols-2 gap-2 md:gap-4 mt-4 md:mt-8">
              {accomplishments.map((item, index) => (
                <div 
                  key={index} 
                  className="bg-card p-2 md:p-4 rounded-lg border border-border hover:border-primary/50 hover-lift transition-all duration-300" 
                  style={{ transitionDelay: `${index * 50}ms` }}
                >
                  <item.icon className="w-5 h-5 md:w-8 md:h-8 text-primary mb-1 md:mb-2" />
                  <p className="font-display font-bold text-foreground text-xs md:text-base">{item.title}</p>
                  <p className="text-[10px] md:text-sm text-muted-foreground leading-tight">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
