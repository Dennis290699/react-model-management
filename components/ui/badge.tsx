import React from "react";
import { cn } from "../../lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  className?: string;
  icon?: React.ReactNode;
}

export const Badge: React.FC<BadgeProps> = ({ children, className, icon }) => {
  return (
    <div className={cn("inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-white/90 dark:bg-neutral-800/90 backdrop-blur-sm text-xs font-semibold text-neutral-900 dark:text-neutral-100 shadow-sm", className)}>
      {icon && <span className="w-3 h-3 text-gold-500">{icon}</span>}
      {children}
    </div>
  );
};