import { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { format } from 'date-fns';
import { sv, enUS } from 'date-fns/locale';
import { toZonedTime, fromZonedTime } from 'date-fns-tz';
import { Clock, User, Mail, MessageSquare, ArrowLeft, Send, CalendarIcon, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Calendar } from '@/components/ui/calendar';
import { useToast } from '@/hooks/use-toast';
import { Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { cn } from '@/lib/utils';

const SWEDISH_TIMEZONE = 'Europe/Stockholm';

// Swedish time slots (13:00 - 17:00 in 30 min increments)
const SWEDISH_TIME_SLOTS = [
  { hour: 13, minute: 0 },
  { hour: 13, minute: 30 },
  { hour: 14, minute: 0 },
  { hour: 14, minute: 30 },
  { hour: 15, minute: 0 },
  { hour: 15, minute: 30 },
  { hour: 16, minute: 0 },
  { hour: 16, minute: 30 },
  { hour: 17, minute: 0 },
];

const BookConsultation = () => {
  const { t, i18n } = useTranslation();
  const { toast } = useToast();
  
  // Get locale for date formatting
  const dateLocale = i18n.language === 'sv' ? sv : enUS;
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    preferredTime: '',
    swedishTime: '',
    message: ''
  });

  // Get user's timezone
  const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const isSwedishTimezone = userTimezone === SWEDISH_TIMEZONE;

  // Generate time slots with local time conversion
  const timeSlots = useMemo(() => {
    // Use a reference date for conversion (today)
    const referenceDate = selectedDate || new Date();
    
    return SWEDISH_TIME_SLOTS.map(({ hour, minute }) => {
      // Create a date in Swedish timezone
      const swedishDate = new Date(referenceDate);
      swedishDate.setHours(hour, minute, 0, 0);
      
      // Convert from Swedish time to UTC, then to local
      const utcDate = fromZonedTime(swedishDate, SWEDISH_TIMEZONE);
      const localDate = toZonedTime(utcDate, userTimezone);
      
      const swedishLabel = format(swedishDate, 'h:mm a');
      const localLabel = format(localDate, 'h:mm a');
      
      return {
        swedish: swedishLabel,
        local: localLabel,
        value: swedishLabel, // Use Swedish time as the value
        showBoth: !isSwedishTimezone && swedishLabel !== localLabel
      };
    });
  }, [selectedDate, userTimezone, isSwedishTimezone]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleTimeSelect = (localTime: string, swedishTime: string) => {
    setFormData(prev => ({ ...prev, preferredTime: localTime, swedishTime }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedDate) {
      toast({
        title: t('booking.validation.selectDate'),
        description: t('booking.validation.selectDateDesc'),
        variant: "destructive"
      });
      return;
    }

    if (!formData.preferredTime) {
      toast({
        title: t('booking.validation.selectTime'),
        description: t('booking.validation.selectTimeDesc'),
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Send Swedish time to Viktor, but include local time info for context
      const timeInfo = isSwedishTimezone 
        ? formData.swedishTime 
        : `${formData.swedishTime} (Swedish time) / ${formData.preferredTime} (${userTimezone})`;
      
      const { data, error } = await supabase.functions.invoke('send-consultation-request', {
        body: {
          name: formData.name,
          email: formData.email,
          preferredDate: format(selectedDate, 'EEEE, MMMM d, yyyy', { locale: dateLocale }),
          preferredTime: timeInfo,
          message: formData.message || undefined
        }
      });

      if (error) throw error;

      toast({
        title: t('booking.success.title'),
        description: t('booking.success.description'),
      });

      setFormData({
        name: '',
        email: '',
        preferredTime: '',
        swedishTime: '',
        message: ''
      });
      setSelectedDate(undefined);
    } catch (error: any) {
      console.error('Error submitting consultation request:', error);
      toast({
        title: t('booking.error.title'),
        description: error?.message || t('booking.error.description'),
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
            {t('booking.backToHome')}
          </Link>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 md:py-20">
        <div className="max-w-4xl mx-auto">
          {/* Page Header */}
          <div className="text-center mb-10">
            <p className="font-display text-primary uppercase tracking-[0.2em] text-sm mb-3">
              {t('booking.tagline')}
            </p>
            <h1 className="font-display text-3xl md:text-5xl font-bold text-foreground mb-4">
              {t('booking.title')} <span className="text-primary">{t('booking.titleHighlight')}</span> {t('booking.titleEnd')}
            </h1>
            <p className="text-muted-foreground max-w-lg mx-auto">
              {t('booking.description')}
            </p>
          </div>

          {/* Booking Form */}
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Left Column - Calendar */}
              <div className="bg-card border border-border rounded-xl p-6">
                <div className="flex items-center gap-2 mb-4">
                  <CalendarIcon className="w-5 h-5 text-primary" />
                  <h2 className="font-display text-lg font-semibold text-foreground">{t('booking.selectDate')}</h2>
                </div>
                <div className="flex justify-center">
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={setSelectedDate}
                    disabled={(date) => date < new Date() || date.getDay() === 0 || date.getDay() === 6}
                    locale={dateLocale}
                    className="rounded-md border-0 pointer-events-auto"
                  />
                </div>
                {selectedDate && (
                  <p className="text-center mt-4 text-sm text-muted-foreground">
                    {t('booking.selected')}: <span className="text-primary font-medium">{format(selectedDate, 'EEEE, MMMM d, yyyy', { locale: dateLocale })}</span>
                  </p>
                )}
              </div>

              {/* Right Column - Time & Details */}
              <div className="space-y-6">
                {/* Time Selection */}
                <div className="bg-card border border-border rounded-xl p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <Clock className="w-5 h-5 text-primary" />
                    <h2 className="font-display text-lg font-semibold text-foreground">{t('booking.selectTime')}</h2>
                  </div>
                  {!isSwedishTimezone && (
                    <div className="flex items-center gap-2 mb-3 text-xs text-muted-foreground">
                      <Globe className="w-3 h-3" />
                      <span>{t('booking.timezoneNote', { timezone: userTimezone })}</span>
                    </div>
                  )}
                  <div className="grid grid-cols-3 gap-2">
                    {timeSlots.map(slot => (
                      <button
                        key={slot.value}
                        type="button"
                        onClick={() => handleTimeSelect(slot.local, slot.swedish)}
                        className={cn(
                          "py-2 px-3 text-sm rounded-lg border transition-all duration-200 flex flex-col items-center",
                          formData.swedishTime === slot.swedish
                            ? "bg-primary text-primary-foreground border-primary"
                            : "bg-background border-border hover:border-primary/50 hover:bg-primary/5"
                        )}
                      >
                        <span>{slot.local}</span>
                        {slot.showBoth && (
                          <span className={cn(
                            "text-xs",
                            formData.swedishTime === slot.swedish
                              ? "text-primary-foreground/70"
                              : "text-muted-foreground"
                          )}>
                            ({slot.swedish} SE)
                          </span>
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Contact Details */}
                <div className="bg-card border border-border rounded-xl p-6 space-y-4">
                  <h2 className="font-display text-lg font-semibold text-foreground mb-4">{t('booking.yourDetails')}</h2>
                  
                  {/* Name */}
                  <div className="space-y-2">
                    <Label htmlFor="name" className="flex items-center gap-2">
                      <User className="w-4 h-4 text-primary" />
                      {t('booking.fullName')}
                    </Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder={t('booking.namePlaceholder')}
                      required
                      className="bg-background"
                    />
                  </div>

                  {/* Email */}
                  <div className="space-y-2">
                    <Label htmlFor="email" className="flex items-center gap-2">
                      <Mail className="w-4 h-4 text-primary" />
                      {t('booking.emailAddress')}
                    </Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder={t('booking.emailPlaceholder')}
                      required
                      className="bg-background"
                    />
                  </div>

                  {/* Message */}
                  <div className="space-y-2">
                    <Label htmlFor="message" className="flex items-center gap-2">
                      <MessageSquare className="w-4 h-4 text-primary" />
                      {t('booking.goalsLabel')}
                    </Label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder={t('booking.goalsPlaceholder')}
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
                  t('booking.submitting')
                ) : (
                  <>
                    <Send className="mr-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                    {t('booking.submitButton')}
                  </>
                )}
              </Button>

              <p className="text-center text-sm text-muted-foreground">
                {t('booking.trustNote')}
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BookConsultation;
