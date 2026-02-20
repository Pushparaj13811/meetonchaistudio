# Light/Dark Mode Implementation Plan

## Current Status (Dark Mode Only)

The site currently uses **dark mode only** with light-colored logos.

### Logo Files Structure

#### Active Logos (Light-colored for Dark Mode)
- `logo.png` - Main logo (light version, 16M)
- `logo.webp` - Optimized WebP (1.2M)
- `logo-512.png` - 512x512 version (188K)
- `logo-512.webp` - Optimized 512 WebP (47K)
- `logo-light.png` - Source light logo (16M)
- `logo-light.webp` - Light WebP version
- `logo-light-512.png` - 512x512 light version
- `logo-light-512.webp` - Light 512 WebP
- `favicon.ico` - Multi-size favicon (light)
- `icon.png` - PWA icon 192x192 (light)
- `apple-icon.png` - Apple touch icon 180x180 (light)
- `favicon-light.ico` - Light favicon backup
- `icon-light.png` - Light icon backup
- `apple-icon-light.png` - Light apple icon backup

#### Reserved for Light Mode (Dark-colored logos)
- `logo-dark.png` - Main dark logo (12M)
- `logo-dark.webp` - Dark WebP version
- `logo-dark-512.png` - 512x512 dark version
- `logo-dark-512.webp` - Dark 512 WebP
- `favicon-dark.ico` - Dark favicon
- `icon-dark.png` - Dark icon
- `apple-icon-dark.png` - Dark apple icon

## Implementation Plan for Light/Dark Mode Toggle

### Phase 1: Theme Context Setup

1. **Create Theme Context** (`/lib/theme-context.tsx`)
   ```tsx
   - ThemeProvider with 'light' | 'dark' | 'system' modes
   - useTheme hook for components
   - localStorage persistence
   - System preference detection
   ```

2. **Add Theme Toggle Component** (`/components/ui/ThemeToggle.tsx`)
   ```tsx
   - Sun/Moon icon toggle button
   - Position in Navigation bar
   - Smooth transition animations
   ```

### Phase 2: Logo System Update

1. **Update Navigation Component**
   ```tsx
   - Use theme context to determine logo
   - Dark mode: /logo-light.webp (light logo on dark bg)
   - Light mode: /logo-dark.webp (dark logo on light bg)
   ```

2. **Dynamic Favicon** (Optional)
   - Update favicon based on theme
   - Use media queries in HTML meta tags

### Phase 3: Color Scheme Updates

1. **CSS Variables** (`/app/globals.css`)
   ```css
   :root {
     /* Light mode colors */
     --color-bg: #ffffff;
     --color-text: #0a0a0c;
     --color-text-secondary: #4b5563;
     /* ... */
   }

   [data-theme="dark"] {
     /* Dark mode colors (current) */
     --color-bg: #0a0a0c;
     --color-text: #ffffff;
     --color-text-secondary: #9ca3af;
     /* ... */
   }
   ```

2. **Component Updates**
   - Update all inline styles to use CSS variables
   - Remove hardcoded colors
   - Test all sections in both modes

### Phase 4: Testing

1. **Functionality Testing**
   - Toggle switches between modes
   - Preference persists on reload
   - System preference detection works
   - All logos swap correctly

2. **Visual Testing**
   - Check contrast ratios (WCAG AA)
   - Verify all text is readable
   - Test all interactive states (hover, active)
   - Check glassmorphism effects in both modes

3. **Browser Testing**
   - Test in major browsers
   - Test on mobile devices
   - Verify localStorage works
   - Check system preference detection

## File Changes Required

### New Files
- `/lib/theme-context.tsx` - Theme context and provider
- `/components/ui/ThemeToggle.tsx` - Toggle button component

### Modified Files
- `/app/layout.tsx` - Wrap with ThemeProvider
- `/components/layout/Navigation.tsx` - Add theme toggle, dynamic logo
- `/app/globals.css` - Add light mode color variables
- All component files - Replace hardcoded colors with CSS variables

## Color Palette

### Dark Mode (Current)
- Background: `#0a0a0c`
- Text Primary: `#ffffff`
- Text Secondary: `#9ca3af`
- Accent: `#e67e22`

### Light Mode (Planned)
- Background: `#ffffff`
- Text Primary: `#0a0a0c`
- Text Secondary: `#4b5563`
- Accent: `#d35400` (darker accent for better contrast)

## Implementation Timeline

1. **Phase 1**: 2-3 hours - Theme context and toggle
2. **Phase 2**: 1 hour - Logo system
3. **Phase 3**: 3-4 hours - Color scheme updates
4. **Phase 4**: 2-3 hours - Testing and refinement

**Total Estimated Time**: 8-11 hours

## Notes

- Current implementation uses dark mode only
- Logo naming: -light suffix = light-colored logo (for dark backgrounds)
- Logo naming: -dark suffix = dark-colored logo (for light backgrounds)
- Priority: Maintain current dark mode experience as default
- System preference should be detected but user choice takes precedence
