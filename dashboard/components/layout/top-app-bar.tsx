import { Home, Bell, Settings } from "lucide-react";

export function TopAppBar() {
  return (
    <header className="flex justify-between items-center w-full px-lg h-20 max-w-[1536px] mx-auto bg-background sticky top-0 z-30">
      <div className="flex items-center gap-sm text-on-surface-variant font-body-sm text-body-sm">
        <Home className="w-[18px] h-[18px]" />
        <span className="text-outline">/</span>
        <span className="text-on-surface">Home</span>
      </div>
      
      <div className="flex items-center gap-md">
        <div className="hidden md:flex items-center gap-sm px-md py-1.5 bg-surface-container rounded-full border border-outline-variant">
          <span className="status-dot healthy"></span>
          <span className="text-label-sm font-label-sm text-on-surface">All systems online</span>
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
