# Component Playground – Implementation Plan

A visual UI builder that lets developers create, customize, and export reusable components (Button, Card, Input) with live preview, device simulation, and clean JSX + Tailwind code output.

## Proposed Changes

### Dependencies

Install: `zustand`, `lucide-react`, `prettier` (for code formatting)

---

### Design System – [globals.css](file:///d:/Dev/Frontend/Next%20js/component-playground/app/globals.css)

#### [MODIFY] [globals.css](file:///d:/Dev/Frontend/Next%20js/component-playground/app/globals.css)

- Replace default CSS with a full dark-mode-first design system
- Define CSS custom properties for colors, spacing, radii, shadows
- Add Tailwind `@theme inline` tokens for the custom palette
- Utility classes for glassmorphism panels, grid layout, transitions

---

### Layout & Metadata

#### [MODIFY] [layout.tsx](file:///d:/Dev/Frontend/Next%20js/component-playground/app/layout.tsx)

- Update `<Metadata>` title/description for SEO
- Add Inter font from `next/font/google`
- Apply dark class by default, wire up theme provider

---

### State Management

#### [NEW] [usePlaygroundStore.ts](file:///d:/Dev/Frontend/Next%20js/component-playground/store/usePlaygroundStore.ts)

Zustand store managing:
- `selectedComponent`: `"button" | "card" | "input"`
- `styles`: `{ bgColor, textColor, padding, borderRadius, fontSize }`
- `variant`: `"primary" | "secondary" | "outline"`
- `device`: `"mobile" | "tablet" | "desktop"`
- `theme`: `"light" | "dark"`
- Actions: `updateStyle`, `setComponent`, `setVariant`, `setDevice`, `toggleTheme`, `loadFromURL`, `toQueryString`

---

### Utilities

#### [NEW] [codeGenerator.ts](file:///d:/Dev/Frontend/Next%20js/component-playground/lib/codeGenerator.ts)

- `generateButtonCode(styles, variant)` → JSX + Tailwind string
- `generateCardCode(styles, variant)` → JSX + Tailwind string
- `generateInputCode(styles, variant)` → JSX + Tailwind string
- Map raw style values to Tailwind utility classes
- Format with Prettier

---

### Components

#### [NEW] [ComponentSelector.tsx](file:///d:/Dev/Frontend/Next%20js/component-playground/components/ComponentSelector.tsx)
- Left sidebar with Button / Card / Input icons (lucide)
- Active state highlight with gradient accent
- `'use client'`

#### [NEW] [ControlsPanel.tsx](file:///d:/Dev/Frontend/Next%20js/component-playground/components/ControlsPanel.tsx)
- Dynamic controls based on selected component
- Color pickers, range sliders, variant toggle buttons
- `'use client'`

#### [NEW] [LivePreview.tsx](file:///d:/Dev/Frontend/Next%20js/component-playground/components/LivePreview.tsx)
- Centered preview area with device-width simulation
- Renders actual styled component in real-time
- `'use client'`

#### [NEW] [DeviceSwitcher.tsx](file:///d:/Dev/Frontend/Next%20js/component-playground/components/DeviceSwitcher.tsx)
- Mobile / Tablet / Desktop toggle buttons
- `'use client'`

#### [NEW] [CodePanel.tsx](file:///d:/Dev/Frontend/Next%20js/component-playground/components/CodePanel.tsx)
- Syntax-highlighted JSX output (manual token highlighting)
- Copy-to-clipboard with "Copied!" animation
- `'use client'`

#### [NEW] [ThemeToggle.tsx](file:///d:/Dev/Frontend/Next%20js/component-playground/components/ThemeToggle.tsx)
- Sun/Moon icon toggle
- Toggles `dark` class on `<html>`
- `'use client'`

#### [NEW] [Toast.tsx](file:///d:/Dev/Frontend/Next%20js/component-playground/components/Toast.tsx)
- Slide-in toast notification for copy feedback
- `'use client'`

#### [NEW] [PreviewComponents.tsx](file:///d:/Dev/Frontend/Next%20js/component-playground/components/PreviewComponents.tsx)
- Actual Button, Card, Input renderings using current styles
- `'use client'`

---

### Main Page

#### [MODIFY] [page.tsx](file:///d:/Dev/Frontend/Next%20js/component-playground/app/page.tsx)

- Replace default Next.js content with playground layout
- 3-column grid: Selector | Preview | Controls
- Bottom panel: Code output
- URL query param parsing for share feature
- `'use client'`

---

## Verification Plan

### Browser Testing
- Run `npm run dev` and open `http://localhost:3000` in the browser
- Verify the 3-column layout renders correctly
- Test each component selector (Button, Card, Input) updates the preview
- Test controls (color picker, sliders) update preview in real-time
- Test code panel shows correct JSX output
- Test copy button copies code and shows "Copied!" toast
- Test device switcher changes preview width
- Test theme toggle switches light/dark mode
- Test share URL: modify state → copy URL → open in new tab → same state restores
- Test localStorage save/load
