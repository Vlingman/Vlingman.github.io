import { useState } from "react";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, Check, User, Dumbbell, Target } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface FormData {
  // Step 1
  fullName: string;
  email: string;
  age: string;
  countryTimezone: string;
  // Step 2
  trainingLevel: string;
  isCompetitive: string;
  trainingHistory: string;
  hasWorkedWithCoach: string;
  coachExperience: string;
  // Step 3
  whyWorkWithMe: string;
  shortTermGoals: string;
  longTermGoals: string;
  motivation: string;
  // Consent
  gdprConsent: boolean;
}

const initialFormData: FormData = {
  fullName: "",
  email: "",
  age: "",
  countryTimezone: "",
  trainingLevel: "",
  isCompetitive: "",
  trainingHistory: "",
  hasWorkedWithCoach: "",
  coachExperience: "",
  whyWorkWithMe: "",
  shortTermGoals: "",
  longTermGoals: "",
  motivation: "",
  gdprConsent: false,
};

export const AthleteApplication = () => {
  const { t } = useTranslation();
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const totalSteps = 3;
  const progress = (currentStep / totalSteps) * 100;

  const updateField = (field: keyof FormData, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const validateStep = (step: number): boolean => {
    switch (step) {
      case 1:
        if (!formData.fullName.trim()) {
          toast({ title: t("application.validation.fullName"), variant: "destructive" });
          return false;
        }
        if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
          toast({ title: t("application.validation.email"), variant: "destructive" });
          return false;
        }
        if (!formData.age || parseInt(formData.age) < 13 || parseInt(formData.age) > 100) {
          toast({ title: t("application.validation.age"), variant: "destructive" });
          return false;
        }
        if (!formData.countryTimezone.trim()) {
          toast({ title: t("application.validation.countryTimezone"), variant: "destructive" });
          return false;
        }
        return true;
      case 2:
        if (!formData.trainingLevel) {
          toast({ title: t("application.validation.trainingLevel"), variant: "destructive" });
          return false;
        }
        if (!formData.isCompetitive) {
          toast({ title: t("application.validation.isCompetitive"), variant: "destructive" });
          return false;
        }
        if (!formData.trainingHistory.trim()) {
          toast({ title: t("application.validation.trainingHistory"), variant: "destructive" });
          return false;
        }
        if (!formData.hasWorkedWithCoach) {
          toast({ title: t("application.validation.hasWorkedWithCoach"), variant: "destructive" });
          return false;
        }
        return true;
      case 3:
        if (!formData.shortTermGoals.trim()) {
          toast({ title: t("application.validation.shortTermGoals"), variant: "destructive" });
          return false;
        }
        if (!formData.longTermGoals.trim()) {
          toast({ title: t("application.validation.longTermGoals"), variant: "destructive" });
          return false;
        }
        if (!formData.motivation.trim()) {
          toast({ title: t("application.validation.motivation"), variant: "destructive" });
          return false;
        }
        if (!formData.gdprConsent) {
          toast({ title: t("application.validation.gdprConsent"), variant: "destructive" });
          return false;
        }
        return true;
      default:
        return true;
    }
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, totalSteps));
    }
  };

  const handleBack = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleSubmit = async () => {
    if (!validateStep(3)) return;

    setIsSubmitting(true);

    try {
      const { error } = await supabase.functions.invoke("send-application", {
        body: {
          fullName: formData.fullName.trim(),
          email: formData.email.trim(),
          age: parseInt(formData.age),
          countryTimezone: formData.countryTimezone.trim(),
          trainingLevel: formData.trainingLevel,
          isCompetitive: formData.isCompetitive === "yes",
          trainingHistory: formData.trainingHistory.trim(),
          hasWorkedWithCoach: formData.hasWorkedWithCoach === "yes",
          coachExperience: formData.coachExperience.trim() || undefined,
          whyWorkWithMe: formData.whyWorkWithMe.trim() || undefined,
          shortTermGoals: formData.shortTermGoals.trim(),
          longTermGoals: formData.longTermGoals.trim(),
          motivation: formData.motivation.trim(),
          gdprConsent: formData.gdprConsent,
        },
      });

      if (error) throw error;

      setIsSubmitted(true);
    } catch (error) {
      console.error("Submission error:", error);
      toast({
        title: t("application.error.title"),
        description: t("application.error.description"),
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const stepIcons = [User, Dumbbell, Target];

  if (isSubmitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center py-12"
      >
        <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-6">
          <Check className="w-10 h-10 text-primary" />
        </div>
        <h3 className="text-2xl font-display font-bold text-foreground mb-4">
          {t("application.success.title")}
        </h3>
        <p className="text-muted-foreground max-w-md mx-auto">
          {t("application.success.description")}
        </p>
      </motion.div>
    );
  }

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* Progress indicator */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          {[1, 2, 3].map((step) => {
            const Icon = stepIcons[step - 1];
            return (
              <div
                key={step}
                className={`flex items-center gap-2 ${
                  step <= currentStep ? "text-primary" : "text-muted-foreground"
                }`}
              >
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-colors ${
                    step < currentStep
                      ? "bg-primary border-primary text-primary-foreground"
                      : step === currentStep
                      ? "border-primary text-primary"
                      : "border-muted-foreground/30"
                  }`}
                >
                  {step < currentStep ? <Check className="w-5 h-5" /> : <Icon className="w-5 h-5" />}
                </div>
                <span className="hidden sm:inline text-sm font-medium">
                  {t(`application.steps.step${step}`)}
                </span>
              </div>
            );
          })}
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      {/* Form steps */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.2 }}
        >
          {currentStep === 1 && (
            <div className="space-y-6">
              <h2 className="text-xl font-display font-bold text-foreground">
                {t("application.step1.title")}
              </h2>

              <div className="space-y-4">
                <div>
                  <Label htmlFor="fullName">{t("application.step1.fullName")} *</Label>
                  <Input
                    id="fullName"
                    value={formData.fullName}
                    onChange={(e) => updateField("fullName", e.target.value)}
                    placeholder={t("application.step1.fullNamePlaceholder")}
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="email">{t("application.step1.email")} *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => updateField("email", e.target.value)}
                    placeholder={t("application.step1.emailPlaceholder")}
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="age">{t("application.step1.age")} *</Label>
                  <Input
                    id="age"
                    type="number"
                    min="13"
                    max="100"
                    value={formData.age}
                    onChange={(e) => updateField("age", e.target.value)}
                    placeholder={t("application.step1.agePlaceholder")}
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="countryTimezone">{t("application.step1.countryTimezone")} *</Label>
                  <Input
                    id="countryTimezone"
                    value={formData.countryTimezone}
                    onChange={(e) => updateField("countryTimezone", e.target.value)}
                    placeholder={t("application.step1.countryTimezonePlaceholder")}
                    className="mt-1"
                  />
                </div>
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div className="space-y-6">
              <h2 className="text-xl font-display font-bold text-foreground">
                {t("application.step2.title")}
              </h2>

              <div className="space-y-6">
                <div>
                  <Label>{t("application.step2.trainingLevel")} *</Label>
                  <RadioGroup
                    value={formData.trainingLevel}
                    onValueChange={(value) => updateField("trainingLevel", value)}
                    className="mt-2 space-y-2"
                  >
                    {["beginner", "intermediate", "advanced"].map((level) => (
                      <div key={level} className="flex items-center space-x-2">
                        <RadioGroupItem value={level} id={`level-${level}`} />
                        <Label htmlFor={`level-${level}`} className="cursor-pointer">
                          {t(`application.step2.levels.${level}`)}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>

                <div>
                  <Label>{t("application.step2.isCompetitive")} *</Label>
                  <RadioGroup
                    value={formData.isCompetitive}
                    onValueChange={(value) => updateField("isCompetitive", value)}
                    className="mt-2 space-y-2"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="yes" id="competitive-yes" />
                      <Label htmlFor="competitive-yes" className="cursor-pointer">
                        {t("application.yes")}
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="no" id="competitive-no" />
                      <Label htmlFor="competitive-no" className="cursor-pointer">
                        {t("application.no")}
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                <div>
                  <Label htmlFor="trainingHistory">{t("application.step2.trainingHistory")} *</Label>
                  <Textarea
                    id="trainingHistory"
                    value={formData.trainingHistory}
                    onChange={(e) => updateField("trainingHistory", e.target.value)}
                    placeholder={t("application.step2.trainingHistoryPlaceholder")}
                    className="mt-1 min-h-[100px]"
                  />
                </div>

                <div>
                  <Label>{t("application.step2.hasWorkedWithCoach")} *</Label>
                  <RadioGroup
                    value={formData.hasWorkedWithCoach}
                    onValueChange={(value) => updateField("hasWorkedWithCoach", value)}
                    className="mt-2 space-y-2"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="yes" id="coach-yes" />
                      <Label htmlFor="coach-yes" className="cursor-pointer">
                        {t("application.yes")}
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="no" id="coach-no" />
                      <Label htmlFor="coach-no" className="cursor-pointer">
                        {t("application.no")}
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                {formData.hasWorkedWithCoach === "yes" && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                  >
                    <Label htmlFor="coachExperience">{t("application.step2.coachExperience")}</Label>
                    <Textarea
                      id="coachExperience"
                      value={formData.coachExperience}
                      onChange={(e) => updateField("coachExperience", e.target.value)}
                      placeholder={t("application.step2.coachExperiencePlaceholder")}
                      className="mt-1 min-h-[80px]"
                    />
                  </motion.div>
                )}
              </div>
            </div>
          )}

          {currentStep === 3 && (
            <div className="space-y-6">
              <h2 className="text-xl font-display font-bold text-foreground">
                {t("application.step3.title")}
              </h2>

              <div className="space-y-4">
                <div>
                  <Label htmlFor="whyWorkWithMe">{t("application.step3.whyWorkWithMe")}</Label>
                  <Textarea
                    id="whyWorkWithMe"
                    value={formData.whyWorkWithMe}
                    onChange={(e) => updateField("whyWorkWithMe", e.target.value)}
                    placeholder={t("application.step3.whyWorkWithMePlaceholder")}
                    className="mt-1 min-h-[80px]"
                  />
                </div>

                <div>
                  <Label htmlFor="shortTermGoals">{t("application.step3.shortTermGoals")} *</Label>
                  <Textarea
                    id="shortTermGoals"
                    value={formData.shortTermGoals}
                    onChange={(e) => updateField("shortTermGoals", e.target.value)}
                    placeholder={t("application.step3.shortTermGoalsPlaceholder")}
                    className="mt-1 min-h-[80px]"
                  />
                </div>

                <div>
                  <Label htmlFor="longTermGoals">{t("application.step3.longTermGoals")} *</Label>
                  <Textarea
                    id="longTermGoals"
                    value={formData.longTermGoals}
                    onChange={(e) => updateField("longTermGoals", e.target.value)}
                    placeholder={t("application.step3.longTermGoalsPlaceholder")}
                    className="mt-1 min-h-[80px]"
                  />
                </div>

                <div>
                  <Label htmlFor="motivation">{t("application.step3.motivation")} *</Label>
                  <Textarea
                    id="motivation"
                    value={formData.motivation}
                    onChange={(e) => updateField("motivation", e.target.value)}
                    placeholder={t("application.step3.motivationPlaceholder")}
                    className="mt-1 min-h-[80px]"
                  />
                </div>

                <div className="pt-4 border-t border-border">
                  <div className="flex items-start space-x-3">
                    <Checkbox
                      id="gdprConsent"
                      checked={formData.gdprConsent}
                      onCheckedChange={(checked) => updateField("gdprConsent", checked as boolean)}
                      className="mt-1"
                    />
                    <Label htmlFor="gdprConsent" className="cursor-pointer text-sm leading-relaxed">
                      {t("application.gdprConsent")} *
                    </Label>
                  </div>
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Navigation buttons */}
      <div className="flex justify-between mt-8 pt-6 border-t border-border">
        {currentStep > 1 ? (
          <Button variant="outline" onClick={handleBack} className="gap-2">
            <ArrowLeft className="w-4 h-4" />
            {t("application.back")}
          </Button>
        ) : (
          <div />
        )}

        {currentStep < totalSteps ? (
          <Button onClick={handleNext} className="gap-2">
            {t("application.next")}
            <ArrowRight className="w-4 h-4" />
          </Button>
        ) : (
          <Button onClick={handleSubmit} disabled={isSubmitting} className="gap-2">
            {isSubmitting ? t("application.submitting") : t("application.submit")}
            {!isSubmitting && <Check className="w-4 h-4" />}
          </Button>
        )}
      </div>
    </div>
  );
};
