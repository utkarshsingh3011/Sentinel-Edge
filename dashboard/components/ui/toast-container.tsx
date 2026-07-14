"use client";

import { useTelemetry } from "@/lib/telemetry-context";
import { motion, AnimatePresence } from "framer-motion";
import { X, AlertTriangle, ShieldAlert, Info, CheckCircle2 } from "lucide-react";

export function ToastContainer() {
  const { toasts, removeToast } = useTelemetry();

  return (
    <AnimatePresence>
      {toasts.length > 0 && (
        <motion.div
          key="toast-container"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.2 } }}
          className="fixed bottom-md right-md z-50 flex flex-col gap-sm max-w-sm w-full pointer-events-none p-margin-mobile md:p-0"
        >
          <AnimatePresence mode="popLayout">
            {toasts.map((toast) => {
              let icon = <Info className="w-5 h-5 text-primary" />;
              let borderClass = "border-outline-variant/30";
              let bgClass = "bg-surface-container-high/90";

              if (toast.type === "critical") {
                icon = <ShieldAlert className="w-5 h-5 text-[#f87171]" />;
                borderClass = "border-[#f87171]/40";
                bgClass = "bg-[#f87171]/10";
              } else if (toast.type === "warning") {
                icon = <AlertTriangle className="w-5 h-5 text-[#fb923c]" />;
                borderClass = "border-[#fb923c]/40";
                bgClass = "bg-[#fb923c]/10";
              } else if (toast.type === "success") {
                icon = <CheckCircle2 className="w-5 h-5 text-[#4ade80]" />;
                borderClass = "border-[#4ade80]/40";
                bgClass = "bg-[#4ade80]/10";
              }

              return (
                <motion.div
                  key={toast.id}
                  layout
                  initial={{ opacity: 0, y: 20, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9, y: 15, transition: { duration: 0.2 } }}
                  className={`pointer-events-auto p-md rounded-lg border ${borderClass} ${bgClass} backdrop-blur-md flex items-start gap-sm shadow-xl`}
                >
                  <div className="shrink-0 mt-0.5">{icon}</div>
                  <div className="flex-1 text-body-sm font-semibold text-on-background">
                    {toast.message}
                  </div>
                  <button
                    onClick={() => removeToast(toast.id)}
                    className="shrink-0 text-on-surface-variant hover:text-on-background transition-colors cursor-pointer"
                    aria-label="Close alert"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
