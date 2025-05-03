import { cn } from "@/lib/utils";
import { ReactNode } from "react";

type SketchyCardProps = {
  children: ReactNode;
  className?: string;
  title?: string;
  showInfoIcon?: boolean;
};

export function SketchyCard({ 
  children, 
  className, 
  title, 
  showInfoIcon = false
}: SketchyCardProps) {
  return (
    <div 
      className={cn(
        "border-2 border-black rounded-xl p-4 relative", 
        className
      )}
      style={{
        borderRadius: "20px",
        boxShadow: "2px 2px 0 rgba(0,0,0,0.2)",
      }}
    >
      {title && (
        <div className="flex items-center mb-3">
          <h3 className="text-xl font-handwriting font-semibold">{title}</h3>
          {showInfoIcon && (
            <div className="ml-2 inline-flex items-center justify-center w-5 h-5 border-2 border-black rounded-full text-xs font-semibold">
              i
            </div>
          )}
        </div>
      )}
      {children}
    </div>
  );
} 