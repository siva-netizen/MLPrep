import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * AnimatedProgressCard component - Displays progress with smooth animations
 */
export const AnimatedProgressCard = React.forwardRef(
  (
    {
      icon,
      title,
      progressLabel,
      progressSubLabel,
      currentValue,
      maxValue,
      className,
    },
    ref
  ) => {
    // Calculate the percentage, ensuring it doesn't exceed 100%
    const percentage = maxValue > 0 ? (currentValue / maxValue) * 100 : 0;
    const clampedPercentage = Math.min(percentage, 100);

    return (
      <div
        ref={ref}
        className={cn(
          "w-full max-w-sm rounded-xl border border-green-600 bg-gradient-to-br from-green-600 to-green-700 p-6 text-white shadow-lg hover:shadow-xl transition-shadow duration-300",
          className
        )}
      >
        {/* Header section with icon and title */}
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20">
            {icon}
          </div>
          <p className="font-medium">{title}</p>
        </div>

        {/* Progress bar section with animation */}
        <div className="my-5">
          <div
            className="relative h-2 w-full overflow-hidden rounded-full bg-white/20"
            role="progressbar"
            aria-valuenow={currentValue}
            aria-valuemin={0}
            aria-valuemax={maxValue}
            aria-label={title}
          >
            <motion.div
              className="absolute left-0 top-0 h-full rounded-full bg-white"
              initial={{ width: 0 }}
              animate={{ width: `${clampedPercentage}%` }}
              transition={{
                duration: 1.2,
                ease: "easeInOut",
              }}
            />
          </div>
        </div>

        {/* Footer section with progress details */}
        <div className="flex items-end justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-white/80">
              {progressLabel}
            </p>
            <p className="text-sm text-white/60">
              {progressSubLabel}
            </p>
          </div>
          <p className="text-2xl font-bold">
            {currentValue}
            <span className="text-lg font-medium text-white/80">
              {" "} / {maxValue}
            </span>
          </p>
        </div>
      </div>
    );
  }
);

AnimatedProgressCard.displayName = "AnimatedProgressCard";
