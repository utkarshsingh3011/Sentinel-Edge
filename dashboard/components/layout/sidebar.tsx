"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { 
  Router, 
  Plus, 
  LayoutDashboard, 
  Cpu, 
  LineChart, 
  History, 
  Users, 
  HelpCircle, 
  Settings 
} from "lucide-react";
import { cn } from "@/lib/utils";

export function Sidebar() {
  const pathname = usePathname();

  const links = [
    { name: "Overview", href: "/", icon: LayoutDashboard },
    { name: "Your Devices", href: "/devices", icon: Cpu },
    { name: "Analytics", href: "/analytics", icon: LineChart },
    { name: "Activity Timeline", href: "/activity", icon: History },
    { name: "Team Members", href: "/team", icon: Users },
  ];

  return (
    <nav className="fixed left-0 top-0 h-screen flex-col p-md z-40 bg-surface-container-lowest border-r border-outline-variant w-64 hidden md:flex">
      <div className="flex items-center gap-md px-md py-sm mb-lg">
        <Router className="text-primary w-8 h-8" strokeWidth={2.5} />
        <div>
          <h1 className="font-headline-md text-headline-md font-bold text-primary">Sentinel</h1>
          <p className="font-label-sm text-label-sm text-on-surface-variant">Edge Monitoring</p>
        </div>
      </div>
      
      <motion.button 
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="bg-primary text-on-primary font-label-md text-label-md rounded-lg py-sm px-md mb-lg mx-md flex items-center justify-center gap-sm hover:bg-primary-fixed transition-colors"
      >
        <Plus className="w-5 h-5" />
        Add Device
      </motion.button>
      
      <ul className="flex-1 space-y-xs">
        {links.map((link) => {
          const isActive = pathname === link.href;
          const Icon = link.icon;
          return (
            <li key={link.name}>
              <Link 
                href={link.href} 
                className={cn(
                  "flex items-center gap-md px-md py-sm cursor-pointer rounded-lg font-label-md text-label-md transition-all",
                  isActive 
                    ? "bg-secondary-container text-on-secondary-container" 
                    : "text-on-surface-variant hover:bg-surface-variant"
                )}
              >
                <Icon className="w-5 h-5" />
                {link.name}
              </Link>
            </li>
          );
        })}
      </ul>
      
      <div className="mt-auto pt-md border-t border-outline-variant space-y-xs">
        <Link href="/support" className="flex items-center gap-md px-md py-sm cursor-pointer text-on-surface-variant hover:bg-surface-variant rounded-lg font-label-md text-label-md transition-all">
          <HelpCircle className="w-5 h-5" />
          Get Support
        </Link>
        <Link href="/settings" className={cn(
          "flex items-center gap-md px-md py-sm cursor-pointer rounded-lg font-label-md text-label-md transition-all",
          pathname === "/settings" 
            ? "bg-secondary-container text-on-secondary-container" 
            : "text-on-surface-variant hover:bg-surface-variant"
        )}>
          <Settings className="w-5 h-5" />
          Settings
        </Link>
      </div>
    </nav>
  );
}
