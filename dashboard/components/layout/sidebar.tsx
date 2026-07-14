"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  Router, 
  LayoutDashboard, 
  LineChart, 
  Bell, 
  Settings 
} from "lucide-react";
import { cn } from "@/lib/utils";

export function Sidebar() {
  const pathname = usePathname();

  const links = [
    { name: "Dashboard", href: "/", icon: LayoutDashboard },
    { name: "Analytics", href: "/analytics", icon: LineChart },
    { name: "Alerts", href: "/alerts", icon: Bell },
    { name: "Settings", href: "/settings", icon: Settings },
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
      
      <div className="mt-auto pt-md border-t border-outline-variant text-center">
        <p className="font-label-sm text-label-sm text-outline">Sentinel Edge v1.0.0</p>
      </div>
    </nav>
  );
}

