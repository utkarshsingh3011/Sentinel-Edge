---
name: Sentinel Edge
colors:
  surface: '#111317'
  surface-dim: '#111317'
  surface-bright: '#37393e'
  surface-container-lowest: '#0c0e12'
  surface-container-low: '#1a1c20'
  surface-container: '#1e2024'
  surface-container-high: '#282a2e'
  surface-container-highest: '#333539'
  on-surface: '#e2e2e8'
  on-surface-variant: '#c2c6d6'
  inverse-surface: '#e2e2e8'
  inverse-on-surface: '#2f3035'
  outline: '#8c909f'
  outline-variant: '#424754'
  surface-tint: '#adc6ff'
  primary: '#adc6ff'
  on-primary: '#002e6a'
  primary-container: '#4d8eff'
  on-primary-container: '#00285d'
  inverse-primary: '#005ac2'
  secondary: '#c0c1ff'
  on-secondary: '#1000a9'
  secondary-container: '#3131c0'
  on-secondary-container: '#b0b2ff'
  tertiary: '#ffb786'
  on-tertiary: '#502400'
  tertiary-container: '#df7412'
  on-tertiary-container: '#461f00'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#d8e2ff'
  primary-fixed-dim: '#adc6ff'
  on-primary-fixed: '#001a42'
  on-primary-fixed-variant: '#004395'
  secondary-fixed: '#e1e0ff'
  secondary-fixed-dim: '#c0c1ff'
  on-secondary-fixed: '#07006c'
  on-secondary-fixed-variant: '#2f2ebe'
  tertiary-fixed: '#ffdcc6'
  tertiary-fixed-dim: '#ffb786'
  on-tertiary-fixed: '#311400'
  on-tertiary-fixed-variant: '#723600'
  background: '#111317'
  on-background: '#e2e2e8'
  surface-variant: '#333539'
typography:
  display-lg:
    fontFamily: Geist
    fontSize: 48px
    fontWeight: '600'
    lineHeight: 56px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Geist
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
    letterSpacing: -0.02em
  headline-lg-mobile:
    fontFamily: Geist
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  headline-md:
    fontFamily: Geist
    fontSize: 24px
    fontWeight: '500'
    lineHeight: 32px
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-sm:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  label-md:
    fontFamily: Geist
    fontSize: 14px
    fontWeight: '500'
    lineHeight: 20px
    letterSpacing: 0.01em
  label-sm:
    fontFamily: Geist
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  unit: 4px
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 40px
  container-max: 1280px
  gutter: 24px
  margin-mobile: 16px
---

## Brand & Style
The design system is built on a foundation of **Modern Minimalism** with a **Tactile** edge. It is designed to feel like a high-end tool that prioritizes clarity and calm over complexity. The target audience includes educators and technical managers who require precise data without the cognitive load of traditional "enterprise" dashboards.

The emotional response should be one of "controlled intelligence"—a quiet, high-performance environment where every element has breathing room. By moving away from terminal-inspired aesthetics and toward a polished, "pro-consumer" feel (inspired by the precision of Vercel and the friendliness of Notion), this design system ensures that monitoring IoT infrastructure feels less like a chore and more like a curated experience.

## Colors
The palette is rooted in a deep, sophisticated "Midnight" neutral that avoids pure black to maintain a sense of depth and soft contrast. 

- **Primary & Accents:** A soft, high-clarity blue (`#3B82F6`) is used for primary actions and focus states, providing a clear "path of least resistance."
- **Surfaces:** We use a tiered dark mode. The background is the darkest, while cards and containers use a slightly lighter, desaturated navy-grey to create a natural hierarchy.
- **Status Indicators:** Status colors are intentionally muted to prevent "alert fatigue." They should appear as small, glowing dots or subtle pills rather than loud, full-bleed background colors.

## Typography
This design system utilizes a dual-font approach. **Geist** provides a technical, precise feel for headlines and UI labels, while **Inter** handles body copy for maximum legibility and a friendly, humanist touch.

- **Scale:** High contrast between headlines and body text ensures a strong information hierarchy. 
- **Tracking:** Headlines should use slight negative letter-spacing (`-0.02em`) to feel tight and modern.
- **Usage:** Use `label-sm` for technical metadata and overlines. Use `display-lg` sparingly for hero sections or empty state titles.

## Layout & Spacing
The spacing philosophy is "Generous & Intentional." By using an 8pt grid system, we ensure vertical rhythm while providing ample whitespace (the "Notion" influence) to prevent the UI from feeling cramped.

- **Grid:** A 12-column fluid grid for desktop with 24px gutters.
- **Margins:** Desktop views should maintain a 40px outer margin, while mobile scales down to 16px.
- **Content Width:** Technical dashboards should be capped at `1280px` to maintain comfortable eye-tracking distances across wide monitors.

## Elevation & Depth
Depth is achieved through **Tonal Layering** and **Low-Contrast Outlines** rather than heavy shadows.

- **The Stack:** Level 0 is the background (`#0F1115`). Level 1 is the Card surface (`#1C2026`). 
- **Borders:** Every card and interactive element should have a 1px solid border using a slightly lighter value than the surface (`#2D333B`). This creates a crisp, "Vercel-like" definition.
- **Shadows:** Use a single "Ambient Glow" shadow for floating elements (modals/popovers). The shadow should be large (32px blur), low opacity (15%), and slightly tinted with the primary blue to feel integrated into the dark theme.

## Shapes
The shape language is "Approachable Geometric." 

- **Corner Radius:** Standard components (buttons, inputs) use a `0.5rem` (8px) radius. 
- **Large Components:** Cards and main containers use `1rem` (16px) to soften the overall appearance of the platform.
- **Interactive States:** On hover, buttons should not change shape, but subtle scale transforms (98%) can be used to provide tactile feedback.

## Components
- **Buttons:** Primary buttons are solid Blue (`#3B82F6`) with white text. Secondary buttons are "ghost" style with a subtle border and no fill until hover.
- **Cards:** Use a "Glass-lite" approach. While not fully transparent, cards should have a subtle 1px border and 24px internal padding to ensure data doesn't feel crowded.
- **Status Chips:** Small, pill-shaped indicators. Use a background opacity of 10% of the status color and a 100% opacity dot next to the label.
- **Input Fields:** Darker than the card surface with a subtle 1px border that glows primary blue on focus.
- **Lists:** Use "Divideless" lists where possible, using whitespace and subtle hover-state backgrounds to define rows instead of heavy lines.
- **Educational Tooltips:** These should be styled slightly differently—using the secondary Indigo color to signal that they are helpful "hints" rather than system alerts.