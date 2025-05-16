

import { LucideIcon } from "lucide-react";
import Link from "next/link";

interface IFeatureCard {
  Icon: LucideIcon;
  title: string;
  description?: string;
  buttonText?: string;
  buttonLink: string;
}

export function FeatureCard({ Icon, buttonLink, title, buttonText, description }: IFeatureCard) {
  return (
    <Link href={buttonLink}>
      <div className="px-8 py-6 flex flex-col items-start justify-center gap-4 rounded-xl border border-border bg-secondary backdrop-blur-xl">
        <div className="flex items-center gap-3">
          <Icon className="w-10 h-10" />
          <p className="font-semibold text-xl text-primary">{title}</p>
        </div>
        
        {description && (
          <p className="text-muted-foreground">{description}</p>
        )}
        
        {buttonText && (
          <div className="mt-4">
            <span className="text-sm font-medium text-primary">{buttonText} →</span>
          </div>
        )}
      </div>
    </Link>
  );
}
