"use client";

import { Home, Bell, Settings } from "lucide-react";
import { useEffect, useState } from "react";
import { fetchHealth } from "@/lib/api";

export function TopAppBar() {
  const [isOnline, setIsOnline] = useState<boolean>(true);

  useEffect(() => {
    let active = true;
    async function checkHealth() {
      try {
        const health = await fetchHealth();
        if (active) {
          setIsOnline(health.status === "online");
        }
      } catch (err) {
        if (active) {
          setIsOnline(false);
        }
      }
    }

    checkHealth();
    const interval = setInterval(checkHealth, 5000);

    return () => {
      active = false;
      clearInterval(interval);
    };
  }, []);

  return (
    <header className="flex justify-between items-center w-full px-lg h-20 max-w-[1536px] mx-auto bg-background sticky top-0 z-30">
      <div className="flex items-center gap-sm text-on-surface-variant font-body-sm text-body-sm">
        <Home className="w-[18px] h-[18px]" />
        <span className="text-outline">/</span>
        <span className="text-on-surface">Home</span>
      </div>
      
      <div className="flex items-center gap-md">
        <div className="hidden md:flex items-center gap-sm px-md py-1.5 bg-surface-container rounded-full border border-outline-variant">
          <span 
            className={`status-dot ${isOnline ? "healthy" : ""}`}
            style={!isOnline ? { backgroundColor: "#f87171", boxShadow: "0 0 12px rgba(248, 113, 113, 0.6)" } : {}}
          ></span>
          <span className="text-label-sm font-label-sm text-on-surface">
            {isOnline ? "All systems online" : "Backend offline"}
          </span>
        </div>
        
        <button className="text-on-surface-variant hover:text-primary transition-colors p-sm rounded-full hover:bg-surface-variant">
          <Bell className="w-5 h-5" />
        </button>
        <button className="text-on-surface-variant hover:text-primary transition-colors p-sm rounded-full hover:bg-surface-variant">
          <Settings className="w-5 h-5" />
        </button>
      </div>
    </header>
  );
}
