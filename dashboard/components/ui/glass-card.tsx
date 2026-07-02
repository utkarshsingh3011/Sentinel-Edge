"use client";

import * as React from "react"
import { motion, HTMLMotionProps } from "framer-motion"
import { cn } from "@/lib/utils"

export interface GlassCardProps extends HTMLMotionProps<"div"> {
  ambientGlow?: boolean
}

export const GlassCard = React.forwardRef<HTMLDivElement, GlassCardProps>(
  ({ className, ambientGlow, ...props }, ref) => {
    return (
      <motion.div
        ref={ref}
        whileHover={{ y: -4, transition: { duration: 0.2 } }}
        className={cn(
          "glass-card rounded-xl",
          ambientGlow && "ambient-glow",
          className
        )}
        {...props}
      />
    )
  }
)
GlassCard.displayName = "GlassCard"
