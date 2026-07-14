"use client";

export function Footer() {
  return (
    <footer className="w-full max-w-[1536px] mx-auto px-lg py-md mt-auto border-t border-outline-variant/10 text-on-surface-variant flex flex-col sm:flex-row justify-between items-center gap-sm text-label-sm font-label-sm opacity-80">
      <div className="flex flex-col sm:flex-row items-center gap-xs sm:gap-md">
        <span className="font-bold text-on-background">Sentinel Edge v1.0</span>
        <span className="hidden sm:inline text-outline-variant">|</span>
        <span>
          Built by{" "}
          <a
            href="https://linkedin.com/in/utkarshsingh3011"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-primary transition-colors font-semibold"
          >
            Utkarsh Singh
          </a>
        </span>
      </div>
      
      <div className="flex items-center gap-md">
        <span className="font-medium text-center sm:text-right">ESP32 • FastAPI • Next.js • TypeScript</span>
        <div className="flex items-center gap-sm border-l border-outline-variant/20 pl-md">
          {/* Inline custom Github SVG */}
          <a
            href="https://github.com/utkarshsingh3011/Sentinel-Edge"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-on-background transition-colors"
            aria-label="GitHub Repository"
          >
            <svg
              className="w-4.5 h-4.5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
              <path d="M9 18c-4.51 2-5-2-7-2" />
            </svg>
          </a>
          {/* Inline custom LinkedIn SVG */}
          <a
            href="https://linkedin.com/in/utkarshsingh3011"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-on-background transition-colors"
            aria-label="LinkedIn Profile"
          >
            <svg
              className="w-4.5 h-4.5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
              <rect width="4" height="12" x="2" y="9" />
              <circle cx="4" cy="4" r="2" />
            </svg>
          </a>
        </div>
      </div>
    </footer>
  );
}
