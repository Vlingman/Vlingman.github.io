import { useState } from 'react';
import { format } from 'date-fns';
import { Clock, User, Mail, MessageSquare, ArrowLeft, Send, CalendarIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Calendar } from '@/components/ui/calendar';
import { useToast } from '@/hooks/use-toast';
import { Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { cn } from '@/lib/utils';

const BookConsultation = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    preferredTime: '',
    message: ''
  });

  const timeSlots = [
    '9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
    '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM'
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleTimeSelect = (time: string) => {
    setFormData(prev => ({ ...prev, preferredTime: time }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedDate) {
      toast({
        title: "Please select a date",
        description: "Choose your preferred consultation date from the calendar.",
        variant: "destructive"
      });
      return;
    }

    if (!formData.preferredTime) {
      toast({
        title: "Please select a time",
        description: "Choose your preferred consultation time.",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const { data, error } = await supabase.functions.invoke('send-consultation-request', {
        body: {
          name: formData.name,
          email: formData.email,
          preferredDate: format(selectedDate, 'EEEE, MMMM d, yyyy'),
          preferredTime: formData.preferredTime,
          message: formData.message || undefined
        }
      });

      if (error) throw error;

      toast({
        title: "Request Submitted!",
        description: "I'll get back to you within 24 hours to confirm your consultation time.",
      });

      setFormData({
        name: '',
        email: '',
        preferredTime: '',
        message: ''
      });
      setSelectedDate(undefined);
    } catch (error: any) {
      console.error('Error submitting consultation request:', error);
      toast({
        title: "Something went wrong",
        description: error?.message || "Please try again or contact directly via email.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-card/50 border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <Link to="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 md:py-20">
        <div className="max-w-4xl mx-auto">
          {/* Page Header */}
          <div className="text-center mb-10">
            <p className="font-display text-primary uppercase tracking-[0.2em] text-sm mb-3">
              Free Consultation
            </p>
            <h1 className="font-display text-3xl md:text-5xl font-bold text-foreground mb-4">
              BOOK YOUR <span className="text-primary">30-MINUTE</span> CALL
            </h1>
            <p className="text-muted-foreground max-w-lg mx-auto">
              Select your preferred date and time, and I'll confirm your consultation within 24 hours.
            </p>
          </div>

          {/* Booking Form */}
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Left Column - Calendar */}
              <div className="bg-card border border-border rounded-xl p-6">
                <div className="flex items-center gap-2 mb-4">
                  <CalendarIcon className="w-5 h-5 text-primary" />
                  <h2 className="font-display text-lg font-semibold text-foreground">Select a Date</h2>
                </div>
                <div className="flex justify-center">
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={setSelectedDate}
                    disabled={(date) => date < new Date() || date.getDay() === 0 || date.getDay() === 6}
                    className="rounded-md border-0 pointer-events-auto"
                  />
                </div>
                {selectedDate && (
                  <p className="text-center mt-4 text-sm text-muted-foreground">
                    Selected: <span className="text-primary font-medium">{format(selectedDate, 'EEEE, MMMM d, yyyy')}</span>
                  </p>
                )}
              </div>

              {/* Right Column - Time & Details */}
              <div className="space-y-6">
                {/* Time Selection */}
                <div className="bg-card border border-border rounded-xl p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <Clock className="w-5 h-5 text-primary" />
                    <h2 className="font-display text-lg font-semibold text-foreground">Select a Time</h2>
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    {timeSlots.map(slot => (
                      <button
                        key={slot}
                        type="button"
                        onClick={() => handleTimeSelect(slot)}
                        className={cn(
                          "py-2 px-3 text-sm rounded-lg border transition-all duration-200",
                          formData.preferredTime === slot
                            ? "bg-primary text-primary-foreground border-primary"
                            : "bg-background border-border hover:border-primary/50 hover:bg-primary/5"
                        )}
                      >
                        {slot}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Contact Details */}
                <div className="bg-card border border-border rounded-xl p-6 space-y-4">
                  <h2 className="font-display text-lg font-semibold text-foreground mb-4">Your Details</h2>
                  
                  {/* Name */}
                  <div className="space-y-2">
                    <Label htmlFor="name" className="flex items-center gap-2">
                      <User className="w-4 h-4 text-primary" />
                      Full Name
                    </Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Your name"
                      required
                      className="bg-background"
                    />
                  </div>

                  {/* Email */}
                  <div className="space-y-2">
                    <Label htmlFor="email" className="flex items-center gap-2">
                      <Mail className="w-4 h-4 text-primary" />
                      Email Address
                    </Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="your@email.com"
                      required
                      className="bg-background"
                    />
                  </div>

                  {/* Message */}
                  <div className="space-y-2">
                    <Label htmlFor="message" className="flex items-center gap-2">
                      <MessageSquare className="w-4 h-4 text-primary" />
                      Tell me about your goals (optional)
                    </Label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="What are you hoping to achieve? Any specific questions?"
                      rows={3}
                      className="bg-background resize-none"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex flex-col items-center gap-4">
              <Button 
                type="submit" 
                variant="hero" 
                size="lg" 
                className="w-full max-w-md group"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  'Submitting...'
                ) : (
                  <>
                    <Send className="mr-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                    Request Consultation
                  </>
                )}
              </Button>

              <p className="text-center text-sm text-muted-foreground">
                100% free · No commitment · I'll confirm within 24 hours
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BookConsultation;
