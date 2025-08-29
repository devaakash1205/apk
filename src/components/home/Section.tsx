import type { ReactNode } from "react";
import { Button } from "../ui/button";
import { ArrowRight } from "lucide-react";

interface SectionProps {
  title: string;
  children: ReactNode;
  actionText?: string;
  onAction?: () => void;
}

export function Section({ title, children, actionText, onAction }: SectionProps) {
  return (
    <section>
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-lg font-bold text-foreground">{title}</h2>
        {actionText && (
          <Button variant="link" className="text-primary pr-0" onClick={onAction}>
            {actionText}
            <ArrowRight className="w-4 h-4 ml-1" />
          </Button>
        )}
      </div>
      {children}
    </section>
  );
}
