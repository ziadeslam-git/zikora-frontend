import { CheckCircle2, MessageCircle, Send } from "lucide-react";
import { Button } from "@/components/ui/Button";

interface ProfileHeroProps {
  name: string;
  specialty: string;
  avatarLetter: string;
  isVerified: boolean;
  whatsappNumber?: string;
  telegramLink?: string;
}

export function ProfileHero({
  name,
  specialty,
  avatarLetter,
  isVerified,
  whatsappNumber,
  telegramLink,
}: ProfileHeroProps) {
  return (
    <div className="relative bg-bg-surface border-b border-border-theme py-12 overflow-hidden">
      {/* Subtle brand color gradient background overlay */}
      <div 
        className="absolute inset-0 opacity-[0.06] pointer-events-none"
        style={{
          background: "linear-gradient(135deg, transparent 0%, var(--color-accent-500) 100%)"
        }}
      />
      
      <div className="relative z-10 max-w-[1280px] mx-auto px-4 md:px-8 lg:px-12 flex flex-col md:flex-row items-center gap-8">
        {/* Avatar */}
        <div className="shrink-0 flex items-center justify-center w-24 h-24 rounded-full border-4 border-accent-500 bg-bg-surface-2 text-3xl font-bold text-accent-text">
          {avatarLetter}
        </div>
        
        {/* Info */}
        <div className="flex-1 text-center md:text-start space-y-3">
          <div className="flex flex-col md:flex-row md:items-center gap-3">
            <h1 className="text-3xl font-extrabold text-ink">{name}</h1>
            {isVerified && (
              <span className="inline-flex items-center gap-1 bg-accent-blob/20 text-accent-text text-xs font-bold px-3 py-1 rounded-full w-fit mx-auto md:mx-0">
                <CheckCircle2 className="w-3.5 h-3.5" />
                مدرس معتمد
              </span>
            )}
          </div>
          <p className="text-text-secondary text-lg">{specialty}</p>
          
          {/* Contact Buttons */}
          {(whatsappNumber || telegramLink) && (
            <div className="flex items-center justify-center md:justify-start gap-3 pt-2">
              {whatsappNumber && (
                <a href={`https://wa.me/${whatsappNumber}`} target="_blank" rel="noopener noreferrer">
                  <Button variant="outline" size="sm" className="gap-2 text-emerald-600 border-emerald-600/30 hover:bg-emerald-50 dark:text-emerald-400 dark:hover:bg-emerald-950/30">
                    <MessageCircle className="w-4 h-4" />
                    تواصل واتساب
                  </Button>
                </a>
              )}
              {telegramLink && (
                <a href={telegramLink} target="_blank" rel="noopener noreferrer">
                  <Button variant="outline" size="sm" className="gap-2 text-blue-600 border-blue-600/30 hover:bg-blue-50 dark:text-blue-400 dark:hover:bg-blue-950/30">
                    <Send className="w-4 h-4" />
                    قناة تليجرام
                  </Button>
                </a>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
