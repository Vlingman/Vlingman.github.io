import { useTranslation } from "react-i18next";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Navigation from "@/components/Navigation";
import { AthleteApplication } from "@/components/AthleteApplication";

const Apply = () => {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Back button */}
          <Link to="/">
            <Button variant="ghost" className="mb-8 gap-2 text-muted-foreground hover:text-foreground">
              <ArrowLeft className="w-4 h-4" />
              {t("application.backToHome")}
            </Button>
          </Link>

          {/* Header */}
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-semibold tracking-wider uppercase mb-6">
              {t("application.tagline")}
            </span>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-display font-black text-foreground mb-4">
              {t("application.title")}
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              {t("application.description")}
            </p>
          </div>

          {/* Application Form */}
          <div className="bg-card border border-border rounded-2xl p-6 md:p-10">
            <AthleteApplication />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Apply;
