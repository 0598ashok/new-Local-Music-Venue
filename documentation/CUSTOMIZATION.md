# 🎨 Customization Guide

This guide explains how to customize The SoundBox template to fit your branding and content needs.

## 1. Updating Brand Colors
All colors are managed via CSS variables in `assets/css/style.css`. Locate the `:root` selector at the top of the file to adjust the primary, secondary, and accent colors.

```css
:root {
  --primary: #7c3aed; /* The SoundBox Purple */
  --secondary: #ec4899; /* The SoundBox Pink */
  --accent: #f59e0b; /* The SoundBox Amber */
}
```

## 2. Using Local Fonts
The template includes **Inter** and **Space Grotesk** font files in `assets/fonts/`. To use different fonts:
1.  Add your font files to the `assets/fonts/` folder.
2.  Update the `@font-face` rules at the top of `style.css`.
3.  Change the `--font-primary` and `--font-display` variable values.

## 3. Dark Mode Customization
Adjust dark mode styles in `assets/css/dark-mode.css`. The template automatically detects user system preferences (`prefers-color-scheme: dark`) and provides a manual toggle in the navbar.

## 4. Replacing Images
This template is optimized using the **WebP** image format for ultra-fast loading. To replace images:
- Add your images to the relevant sub-folder in `assets/images/`.
- Update the `src` attribute in your HTML or the `background: url()` in your CSS.
- **Tip**: Use an online converter to convert your `.jpg` and `.png` images to `.webp` for optimal PageSpeed scores.
