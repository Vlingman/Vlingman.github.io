import { Trophy, Medal, Award, Globe } from 'lucide-react';
import podiumImage from '@/assets/podium.jpeg';
import logPressImage from '@/assets/log-press.jpeg';
import victoryImage from '@/assets/victory-pose.jpeg';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const accomplishments = [{
  icon: Globe,
  title: 'World Champion',
  description: 'World\'s Strongest Man U90'
}, {
  icon: Trophy,
  title: '4x National Champion',
  description: 'Sweden\'s Strongest Man U90'
}, {
  icon: Medal,
  title: 'Nordic Champion',
  description: 'Nordic\'s Strongest U90'
}, {
  icon: Award,
  title: 'World Record Holder',
  description: 'U90 Log Press'
}];

const stats = [{
  value: '20+',
  label: 'Podium Finishes'
}, {
  value: '10+',
  label: 'First Place Wins'
}, {
  value: '8+',
  label: 'Years Competing'
}, {
  value: '10+',
  label: 'Years Training'
}];

const About = () => {
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation();
  const { ref: statsRef, isVisible: statsVisible } = useScrollAnimation();
  const { ref: imagesRef, isVisible: imagesVisible } = useScrollAnimation();
  const { ref: contentRef, isVisible: contentVisible } = useScrollAnimation();

  return (
    <section id="about" className="py-20 md:py-32 bg-secondary/30">
      <div className="container mx-auto px-4 md:px-6">
        {/* Section Header */}
        <div 
          ref={headerRef}
          className={`text-center mb-16 transition-all duration-700 ${
            headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <p className="font-display text-primary uppercase tracking-[0.3em] text-sm mb-4">
            About Me
          </p>
          <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground mb-4">
            WORLD CHAMPION COACHING
          </h2>
          <div className="w-24 h-1 bg-primary mx-auto" />
        </div>

        {/* Stats Bar */}
        <div 
          ref={statsRef}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16 max-w-4xl mx-auto"
        >
          {stats.map((stat, index) => (
            <div 
              key={index} 
              className={`bg-card rounded-lg p-6 text-center border border-border hover-lift hover-glow transition-all duration-700 ${
                statsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <p className="font-display text-3xl md:text-4xl font-bold text-primary">{stat.value}</p>
              <p className="text-sm text-muted-foreground mt-1">{stat.label}</p>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Images */}
          <div 
            ref={imagesRef}
            className={`relative transition-all duration-700 ${
              imagesVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
            }`}
          >
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <img 
                  src={victoryImage} 
                  alt="Victory celebration at strongman competition" 
                  className="w-full h-64 object-cover object-top rounded-lg shadow-xl hover:scale-[1.02] transition-transform duration-300" 
                />
                <img 
                  src={podiumImage} 
                  alt="First place on podium" 
                  className="w-full h-40 object-cover rounded-lg shadow-lg hover:scale-[1.02] transition-transform duration-300" 
                />
              </div>
              <div className="pt-8">
                <img 
                  src={logPressImage} 
                  alt="Log press world record" 
                  className="w-full h-72 object-cover rounded-lg shadow-xl hover:scale-[1.02] transition-transform duration-300" 
                />
                <div className="bg-primary/10 rounded-lg p-4 mt-4 text-center">
                  <p className="font-display text-sm font-bold text-primary uppercase tracking-wider">
                    Multiple European, Nordic & Swedish Records
                  </p>
                </div>
              </div>
            </div>
            {/* Decorative element */}
            <div className="absolute -top-4 -left-4 w-24 h-24 border-2 border-primary/30 rounded-lg hidden md:block" />
          </div>

          {/* Content */}
          <div 
            ref={contentRef}
            className={`lg:pl-8 transition-all duration-700 ${
              contentVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
            }`}
          >
            <h3 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-6">
              From World Champion to Your Coach
            </h3>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                As the current World's Strongest Man U90, I've experienced firsthand what it takes to 
                stand at the top of the world stage. From grueling training cycles to the pressure of competition 
                day, I understand every aspect of what makes a champion.
              </p>
              <p>
                With over 10 years of strongman training and 8+ years of competitive experience, I've accumulated more than 20 podium finishes in national and international competitions, including over 10 first place victories. I currently hold the U90 world record in the log press, along with multiple European, Nordic, and Swedish records.
              </p>
              <p>
                My approach combines proven training methodologies with individualized programming. 
                Whether you're preparing for your first competition or chasing a world title, 
                I'll help you build the strength, technique, and mindset to succeed.
              </p>
            </div>

            {/* Accomplishments Grid */}
            <div className="grid grid-cols-2 gap-4 mt-8">
              {accomplishments.map((item, index) => (
                <div 
                  key={index} 
                  className="bg-card p-4 rounded-lg border border-border hover:border-primary/50 hover-lift transition-all duration-300"
                  style={{ transitionDelay: `${index * 50}ms` }}
                >
                  <item.icon className="w-8 h-8 text-primary mb-2" />
                  <p className="font-display font-bold text-foreground">{item.title}</p>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
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
