import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const FAQ = () => {
  const { ref, isVisible } = useScrollAnimation();

  const faqs = [
    {
      question: "What experience do you have as a coach?",
      answer: "I'm a 2x National Champion and 2x World Record holder in Strongman, with extensive competition experience across Europe. My coaching approach combines personal competitive experience with proven training methodologies to help athletes of all levels reach their potential."
    },
    {
      question: "What's included in the Full 1-on-1 Coaching package?",
      answer: "The Full 1-on-1 Coaching (€150/month) includes personalized programming, video review of your lifts, direct messaging support, competition preparation, weight cutting guidance for competitions, unlimited program adjustments, and when possible, at-competition coaching support."
    },
    {
      question: "What's the difference between Program Only and Full Coaching?",
      answer: "Program Only (€80/month) provides you with a customized training program. Full 1-on-1 Coaching (€150/month) adds video review, direct messaging, competition prep, and ongoing support. The Complete Package (€200/month) includes everything plus personalized nutrition and diet planning."
    },
    {
      question: "How do I get started with coaching?",
      answer: "Simply book a free consultation through our website. We'll discuss your goals, current training experience, and determine which coaching package is the best fit for you. There's no commitment required for the initial consultation."
    },
    {
      question: "Can you help with competition preparation?",
      answer: "Absolutely! Competition prep is a core part of both the Full 1-on-1 Coaching and Complete Package. This includes peaking protocols, event-specific training, weight cutting strategies, and mental preparation for competition day."
    },
    {
      question: "Do you offer nutrition and diet planning?",
      answer: "Yes! Nutrition and diet planning is included in our Complete Package (€200/month). This covers personalized meal plans, macronutrient calculations based on your goals, and ongoing adjustments as your training progresses."
    },
    {
      question: "How often will we communicate?",
      answer: "With Full 1-on-1 Coaching and the Complete Package, you have direct messaging access for questions and check-ins. I typically respond within 24 hours and we can schedule regular video calls to review progress and make adjustments."
    },
    {
      question: "Is online coaching effective for Strongman?",
      answer: "Yes! Online coaching allows for detailed video analysis, flexible scheduling, and consistent support regardless of location. Many of my athletes have achieved significant competition results through online coaching, including national-level placements."
    }
  ];

  return (
    <section id="faq" className="py-20 md:py-32 bg-muted/30">
      <div className="container mx-auto px-4 md:px-6">
        <div 
          ref={ref}
          className={`max-w-3xl mx-auto transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          {/* Section Header */}
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary text-sm font-medium rounded-full mb-4">
              FAQ
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              Frequently Asked <span className="text-primary">Questions</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto">
              Everything you need to know about coaching, pricing, and getting started on your Strongman journey.
            </p>
          </div>

          {/* Accordion */}
          <Accordion type="single" collapsible className="w-full space-y-3">
            {faqs.map((faq, index) => (
              <AccordionItem 
                key={index} 
                value={`item-${index}`}
                className="bg-card border border-border/50 rounded-lg px-6 data-[state=open]:border-primary/30 transition-colors duration-300"
              >
                <AccordionTrigger className="text-left hover:no-underline hover:text-primary transition-colors py-5">
                  <span className="font-semibold">{faq.question}</span>
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-5 leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          {/* CTA */}
          <div className="text-center mt-12">
            <p className="text-muted-foreground mb-4">
              Still have questions?
            </p>
            <a 
              href="#cta" 
              className="inline-flex items-center gap-2 text-primary font-medium link-underline hover:gap-3 transition-all duration-300"
            >
              Book a free consultation
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
