import { Quote, Star, MessageSquare } from 'lucide-react';
import competitionImage from '@/assets/competition-group.jpeg';
import heroImage from '@/assets/hero-celebration.jpeg';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const placeholderTestimonials = [
  {
    name: 'Your Name Here',
    title: 'Future Champion',
    quote: 'This could be your success story. Join the coaching program and let\'s build something worth sharing.',
    achievement: 'Your Achievement',
    rating: 5,
  },
  {
    name: 'Your Name Here',
    title: 'Future Competitor',
    quote: 'Your transformation journey starts here. Be among the first athletes to work with a world champion coach.',
    achievement: 'Your PR',
    rating: 5,
  },
  {
    name: 'Your Name Here',
    title: 'Future Podium Finisher',
    quote: 'The next testimonial could be yours. Let\'s write your success story together.',
    achievement: 'Your Victory',
    rating: 5,
  },
];

const Referrals = () => {
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation();
  const { ref: cardsRef, isVisible: cardsVisible } = useScrollAnimation();
  const { ref: imagesRef, isVisible: imagesVisible } = useScrollAnimation();

  return (
    <section id="referrals" className="py-20 md:py-32">
      <div className="container mx-auto px-4 md:px-6">
        {/* Section Header */}
        <div 
          ref={headerRef}
          className={`text-center mb-16 transition-all duration-700 ${
            headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <p className="font-display text-primary uppercase tracking-[0.3em] text-sm mb-4">
            Future Success Stories
          </p>
          <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground mb-4">
            BE THE FIRST
          </h2>
          <div className="w-24 h-1 bg-primary mx-auto mb-6" />
          <p className="text-muted-foreground max-w-2xl mx-auto">
            I'm launching my coaching services and looking for dedicated athletes ready to work with a world champion. 
            <span className="text-primary font-semibold"> Your success story could be featured here.</span>
          </p>
        </div>

        {/* Placeholder Notice */}
        <div 
          className={`max-w-2xl mx-auto mb-12 bg-primary/10 border border-primary/30 rounded-lg p-6 text-center transition-all duration-700 ${
            headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
          style={{ transitionDelay: '200ms' }}
        >
          <MessageSquare className="w-10 h-10 text-primary mx-auto mb-3" />
          <p className="text-foreground font-display font-bold text-lg mb-2">
            Founding Athlete Spots Available
          </p>
          <p className="text-muted-foreground text-sm">
            Be among the first to train with a world champion and help shape the coaching program. 
            Early clients receive personalized attention and the opportunity to be featured here.
          </p>
        </div>

        {/* Placeholder Testimonials Grid */}
        <div ref={cardsRef} className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-16">
          {placeholderTestimonials.map((testimonial, index) => (
            <div
              key={index}
              className={`bg-card/50 rounded-lg p-8 border border-dashed border-border hover:border-primary/50 transition-all duration-700 relative hover-lift ${
                cardsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              {/* Quote Icon */}
              <Quote className="w-10 h-10 text-primary/10 absolute top-6 right-6" />

              {/* Rating - faded */}
              <div className="flex gap-1 mb-4 opacity-30">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-primary fill-primary" />
                ))}
              </div>

              {/* Quote */}
              <p className="text-muted-foreground/70 mb-6 italic leading-relaxed">
                "{testimonial.quote}"
              </p>

              {/* Achievement Badge - dashed */}
              <div className="bg-primary/5 text-primary/60 text-sm font-semibold px-3 py-1 rounded-full inline-block mb-4 border border-dashed border-primary/30">
                {testimonial.achievement}
              </div>

              {/* Author */}
              <div>
                <p className="font-display font-bold text-foreground/50">{testimonial.name}</p>
                <p className="text-sm text-muted-foreground/50">{testimonial.title}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Image Section */}
        <div ref={imagesRef} className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <div 
            className={`relative overflow-hidden rounded-lg transition-all duration-700 hover:scale-[1.02] ${
              imagesVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
            }`}
          >
            <img
              src={competitionImage}
              alt="Athletes at competition"
              className="w-full h-64 object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
            <div className="absolute bottom-4 left-4">
              <p className="font-display text-lg font-bold text-foreground">Competition Ready</p>
              <p className="text-sm text-muted-foreground">Training champions together</p>
            </div>
          </div>
          <div 
            className={`relative overflow-hidden rounded-lg transition-all duration-700 hover:scale-[1.02] ${
              imagesVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
            }`}
            style={{ transitionDelay: '150ms' }}
          >
            <img
              src={heroImage}
              alt="Victory celebration"
              className="w-full h-64 object-cover object-top"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
            <div className="absolute bottom-4 left-4">
              <p className="font-display text-lg font-bold text-foreground">Proven Champion</p>
              <p className="text-sm text-muted-foreground">World-class results, now coaching you</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Referrals;
