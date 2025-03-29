import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

/**
 * SharePoint Theme interface
 * Matches the structure expected by SharePoint's theming system
 */
export interface ISharePointTheme {
  // Base theme slots
  themeDarker: string;
  themeDark: string;
  themeDarkAlt: string;
  themePrimary: string;
  themeSecondary: string;
  themeTertiary: string;
  themeLight: string;
  themeLighter: string;
  themeLighterAlt: string;
  
  // Neutral colors
  black: string;
  neutralDark: string;
  neutralPrimary: string;
  neutralPrimaryAlt: string;
  neutralSecondary: string;
  neutralTertiary: string;
  neutralTertiaryAlt: string;
  neutralQuaternary: string;
  neutralQuaternaryAlt: string;
  neutralLight: string;
  neutralLighter: string;
  neutralLighterAlt: string;
  white: string;
  
  // Semantic slots
  primaryBackground?: string;
  primaryText?: string;
  bodyBackground?: string;
  bodyText?: string;
  disabledBackground?: string;
  disabledText?: string;
  
  // Theme state
  isInverted: boolean;
  
  // Additional custom properties
  [key: string]: string | boolean | undefined;
}

/**
 * Tailwind color palette definition
 */
interface ITailwindColorPalette {
  50: string;
  100: string;
  200: string;
  300: string;
  400: string;
  500: string;
  600: string;
  700: string;
  800: string;
  900: string;
  950?: string;
}

/**
 * Available color palette names
 */
type ColorPaletteName = 'blue' | 'emerald' | 'amber' | 'red' | 'purple' | 'indigo' | 'teal' | 'green' | 'cyan' | 'pink';

/**
 * Map of Tailwind color names to palettes
 */
interface ITailwindColors {
  [key: string]: ITailwindColorPalette;
}

// Tailwind color palettes for theme generation
const tailwindColors: ITailwindColors = {
  blue: {
    50: '#eff6ff',
    100: '#dbeafe',
    200: '#bfdbfe',
    300: '#93c5fd',
    400: '#60a5fa',
    500: '#3b82f6',
    600: '#2563eb',
    700: '#1d4ed8',
    800: '#1e40af',
    900: '#1e3a8a',
    950: '#172554'
  },
  emerald: {
    50: '#ecfdf5',
    100: '#d1fae5',
    200: '#a7f3d0',
    300: '#6ee7b7',
    400: '#34d399',
    500: '#10b981',
    600: '#059669',
    700: '#047857',
    800: '#065f46',
    900: '#064e3b',
    950: '#022c22'
  },
  amber: {
    50: '#fffbeb',
    100: '#fef3c7', 
    200: '#fde68a',
    300: '#fcd34d',
    400: '#fbbf24',
    500: '#f59e0b',
    600: '#d97706',
    700: '#b45309',
    800: '#92400e',
    900: '#78350f',
    950: '#451a03'
  },
  indigo: {
    50: '#eef2ff',
    100: '#e0e7ff',
    200: '#c7d2fe',
    300: '#a5b4fc',
    400: '#818cf8',
    500: '#6366f1',
    600: '#4f46e5',
    700: '#4338ca',
    800: '#3730a3',
    900: '#312e81',
    950: '#1e1b4b'
  },
  teal: {
    50: '#f0fdfa',
    100: '#ccfbf1',
    200: '#99f6e4',
    300: '#5eead4',
    400: '#2dd4bf',
    500: '#14b8a6',
    600: '#0d9488',
    700: '#0f766e',
    800: '#115e59',
    900: '#134e4a',
    950: '#042f2e'
  },
  green: {
    50: '#f0fdf4',
    100: '#dcfce7',
    200: '#bbf7d0',
    300: '#86efac',
    400: '#4ade80',
    500: '#22c55e',
    600: '#16a34a',
    700: '#15803d',
    800: '#166534',
    900: '#14532d',
    950: '#052e16'
  },
  cyan: {
    50: '#ecfeff',
    100: '#cffafe',
    200: '#a5f3fc',
    300: '#67e8f9',
    400: '#22d3ee',
    500: '#06b6d4',
    600: '#0891b2',
    700: '#0e7490',
    800: '#155e75',
    900: '#164e63',
    950: '#083344'
  },
  red: {
    50: '#fef2f2',
    100: '#fee2e2',
    200: '#fecaca',
    300: '#fca5a5',
    400: '#f87171',
    500: '#ef4444',
    600: '#dc2626',
    700: '#b91c1c',
    800: '#991b1b',
    900: '#7f1d1d',
    950: '#450a0a'
  },
  purple: {
    50: '#faf5ff',
    100: '#f3e8ff',
    200: '#e9d5ff',
    300: '#d8b4fe',
    400: '#a78bfa',
    500: '#8b5cf6',
    600: '#7c3aed',
    700: '#6d28d9',
    800: '#5b21b6',
    900: '#4c1d95',
    950: '#3b0764'
  },
  pink: {
    50: '#fdf2f8',
    100: '#fce7f3',
    200: '#fbcfe8',
    300: '#f9a8d4',
    400: '#f472b6',
    500: '#ec4899',
    600: '#db2777',
    700: '#be185d',
    800: '#9d174d',
    900: '#831843',
    950: '#500724'
  }
};

// Light mode base theme defaults
const lightModeDefaults: ISharePointTheme = {
  // Theme colors - will be overridden with palette colors
  themeDarker: '#004578',
  themeDark: '#005a9e',
  themeDarkAlt: '#106ebe',
  themePrimary: '#0078d4',
  themeSecondary: '#2b88d8',
  themeTertiary: '#71afe5',
  themeLight: '#c7e0f4',
  themeLighter: '#deecf9',
  themeLighterAlt: '#eff6fc',
  
  // Neutral colors
  black: '#000000',
  neutralDark: '#201f1e',
  neutralPrimary: '#323130',
  neutralPrimaryAlt: '#3b3a39',
  neutralSecondary: '#605e5c',
  neutralTertiary: '#a19f9d',
  neutralTertiaryAlt: '#c8c6c4',
  neutralQuaternary: '#d0d0d0',
  neutralQuaternaryAlt: '#e1dfdd',
  neutralLight: '#edebe9',
  neutralLighter: '#f3f2f1',
  neutralLighterAlt: '#faf9f8',
  white: '#ffffff',
  
  // Semantic slots
  primaryBackground: '#ffffff',
  primaryText: '#323130',
  bodyBackground: '#ffffff',
  bodyText: '#323130',
  disabledBackground: '#f3f2f1',
  disabledText: '#a19f9d',
  
  // Theme state
  isInverted: false
};

// Dark mode base theme defaults
const darkModeDefaults: ISharePointTheme = {
  // Theme colors - will be overridden with palette colors
  themeDarker: '#82c7ff',
  themeDark: '#6cb8f6',
  themeDarkAlt: '#3aa0f3',
  themePrimary: '#2899f5',
  themeSecondary: '#0078d4',
  themeTertiary: '#235a85',
  themeLight: '#106ebe',
  themeLighter: '#004578',
  themeLighterAlt: '#002b4d',
  
  // Neutral colors
  black: '#ffffff',
  neutralDark: '#faf9f8',
  neutralPrimary: '#f3f2f1',
  neutralPrimaryAlt: '#edebe9',
  neutralSecondary: '#d0d0d0',
  neutralTertiary: '#c8c6c4',
  neutralTertiaryAlt: '#6e6e6e',
  neutralQuaternary: '#5c5c5c',
  neutralQuaternaryAlt: '#484848',
  neutralLight: '#3c3c3c',
  neutralLighter: '#313131',
  neutralLighterAlt: '#282828',
  white: '#1f1f1f',
  
  // Semantic slots
  primaryBackground: '#1f1f1f',
  primaryText: '#f3f2f1',
  bodyBackground: '#1f1f1f',
  bodyText: '#f3f2f1',
  disabledBackground: '#313131',
  disabledText: '#6e6e6e',
  
  // Theme state
  isInverted: true
};

/**
 * A store for managing SharePoint themes
 */
export const useThemeManager = defineStore('themeManager', () => {
  // State
  const currentTheme = ref<ISharePointTheme | null>(null);
  const currentColorName = ref<ColorPaletteName>('blue');
  const isDarkMode = ref<boolean>(false);
  const isInitialized = ref<boolean>(false);
  
  // Computed properties
  const availableColors = computed(() => Object.keys(tailwindColors) as ColorPaletteName[]);
  
  /**
   * Detects if SharePoint's theme state is available in the global window object
   */
  function detectSharePointTheme(): ISharePointTheme | null {
    try {
      // SharePoint stores theme information in window.__themeState__.theme
      if (window.__themeState__ && window.__themeState__.theme) {
        const spTheme = window.__themeState__.theme;
        
        // Verify it has the required properties
        if (spTheme.themePrimary && spTheme.themeDarkAlt) {
          // Create a valid theme object
          return {
            ...spTheme,
            isInverted: !!spTheme.isInverted
          } as ISharePointTheme;
        }
      }
    } catch (error) {
      console.error('Error detecting SharePoint theme:', error);
    }
    
    return null;
  }
  
  /**
   * Creates a theme from a Tailwind color palette
   */
  function createThemeFromPalette(
    colorName: ColorPaletteName, 
    darkMode: boolean = false
  ): ISharePointTheme {
    // Get the color palette or default to blue
    const colorPalette = tailwindColors[colorName] || tailwindColors.blue;
    
    // Use appropriate base defaults based on mode
    const baseTheme = darkMode ? { ...darkModeDefaults } : { ...lightModeDefaults };
    
    // Apply color palette to theme slots
    const theme: ISharePointTheme = {
      ...baseTheme,
      // Map palette colors to theme slots
      themePrimary: colorPalette[500],
      themeDarkAlt: colorPalette[600], 
      themeDark: colorPalette[700],
      themeDarker: colorPalette[800],
      themeSecondary: colorPalette[400],
      themeTertiary: colorPalette[300],
      themeLight: colorPalette[200],
      themeLighter: colorPalette[100],
      themeLighterAlt: colorPalette[50],
      isInverted: darkMode
    };
    
    return theme;
  }
  
  /**
   * Applies a SharePoint theme to the document
   * This implementation uses CSS variables approach rather than the @microsoft/load-themed-styles
   * for better performance and easier debugging
   */
  function applyTheme(theme: ISharePointTheme): void {
    // Create CSS variables from theme
    const cssVariables: Record<string, string> = {};
    
    // Process all theme values into CSS variables
    Object.entries(theme).forEach(([key, value]) => {
      // Skip non-string values (like isInverted boolean)
      if (typeof value === 'string') {
        cssVariables[`--${key}`] = value;
      }
    });
    
    // Apply dark/light mode class
    document.documentElement.classList.toggle('sp-dark-theme', theme.isInverted);
    
    // Apply CSS variables to root element
    Object.entries(cssVariables).forEach(([variable, value]) => {
      document.documentElement.style.setProperty(variable, value);
    });
    
    // Update state
    currentTheme.value = theme;
    isDarkMode.value = theme.isInverted;
    
    // Dispatch a custom event for components to react to theme changes
    const themeChangedEvent = new CustomEvent('sp-theme-changed', { 
      detail: { theme, isDarkMode: theme.isInverted } 
    });
    document.dispatchEvent(themeChangedEvent);
    
    console.log(`Theme applied: ${currentColorName.value}, dark mode: ${isDarkMode.value}`);
  }
  
  /**
   * Changes the theme to a different color palette
   */
  function changeThemeColor(colorName: ColorPaletteName): void {
    currentColorName.value = colorName;
    const newTheme = createThemeFromPalette(colorName, isDarkMode.value);
    applyTheme(newTheme);
  }
  
  /**
   * Toggles between light and dark mode
   */
  function toggleDarkMode(): void {
    const newDarkMode = !isDarkMode.value;
    isDarkMode.value = newDarkMode;
    const newTheme = createThemeFromPalette(currentColorName.value, newDarkMode);
    applyTheme(newTheme);
  }
  
  /**
   * Detects and applies SharePoint theme or falls back to default
   */
  function initializeTheme(): void {
    if (isInitialized.value) return;
    
    // First, try to detect SharePoint theme
    const spTheme = detectSharePointTheme();
    
    if (spTheme) {
      // Use detected SharePoint theme
      currentTheme.value = spTheme;
      isDarkMode.value = spTheme.isInverted;
      
      // Try to determine closest color palette for future customization
      const primaryColor = spTheme.themePrimary.toLowerCase();
      let closestColor: ColorPaletteName = 'blue'; // Default fallback
      
      // Find closest matching color from our palettes
      Object.entries(tailwindColors).forEach(([colorName, palette]) => {
        if (primaryColor === palette[500].toLowerCase()) {
          closestColor = colorName as ColorPaletteName;
        }
      });
      
      currentColorName.value = closestColor;
      
      // Apply the theme to ensure CSS variables are set
      applyTheme(spTheme);
    } else {
      // No SharePoint theme detected, use default
      const defaultTheme = createThemeFromPalette(currentColorName.value, isDarkMode.value);
      applyTheme(defaultTheme);
    }
    
    // Register CSS that uses our theme variables
    addThemeStyleSheet();
    
    isInitialized.value = true;
  }
  
  /**
   * Adds a stylesheet that properly uses our theme CSS variables
   */
  function addThemeStyleSheet(): void {
    const styleElement = document.createElement('style');
    styleElement.id = 'sp-theme-manager-styles';
    
    // CSS that maps our CSS variables to SharePoint classes
    const css = `
      /* Theme variable mappings for SharePoint */
      :root {
        /* Only add these if they're not already defined by SharePoint */
        --bodyBackground: var(--bodyBackground, #ffffff);
        --bodyText: var(--bodyText, #323130);
        --primaryButtonBackground: var(--themePrimary);
        --primaryButtonText: var(--white);
        --primaryButtonBackgroundHovered: var(--themeDarkAlt);
        --primaryButtonBackgroundPressed: var(--themeDark);
        --actionLink: var(--themePrimary);
        --linkHovered: var(--themeDarkAlt);
        --linkPressed: var(--themeDark);
      }
      
      /* Dark theme specific overrides */
      .sp-dark-theme {
        --bodyBackground: var(--bodyBackground, #1f1f1f);
        --bodyText: var(--bodyText, #f3f2f1);
      }
      
      /* Style overrides for SharePoint UI */
      .ms-Button--primary {
        background-color: var(--themePrimary) !important;
        border-color: var(--themePrimary) !important;
        color: var(--white) !important;
      }
      
      .ms-Button--primary:hover {
        background-color: var(--themeDarkAlt) !important;
        border-color: var(--themeDarkAlt) !important;
      }
      
      .ms-Link, a:not([class*='ms-']) {
        color: var(--themePrimary) !important;
      }
      
      .ms-Link:hover, a:not([class*='ms-']):hover {
        color: var(--themeDarkAlt) !important;
      }
      
      /* Text field focus border */
      .ms-TextField-fieldGroup:focus-within {
        border-color: var(--themePrimary) !important;
      }
      
      /* Navigation highlight */
      .ms-Nav-link.is-selected {
        background-color: var(--themeLighter) !important;
        color: var(--themePrimary) !important;
      }
      
      /* Command bar */
      .ms-CommandBar-primaryCommand {
        color: var(--themePrimary) !important;
      }
      
      /* List item selection */
      .ms-List-cell.is-selected {
        border-left: 4px solid var(--themePrimary) !important;
      }
    `;
    
    styleElement.textContent = css;
    document.head.appendChild(styleElement);
  }
  
  /**
   * Reset to default SharePoint theme if available
   */
  function resetToDefaultTheme(): void {
    const spTheme = detectSharePointTheme();
    
    if (spTheme) {
      // Apply original SharePoint theme
      applyTheme(spTheme);
      
      // Update state values
      isDarkMode.value = spTheme.isInverted;
    } else {
      // No SharePoint theme available, reset to blue
      const defaultTheme = createThemeFromPalette('blue', false);
      applyTheme(defaultTheme);
      
      // Reset state
      currentColorName.value = 'blue';
      isDarkMode.value = false;
    }
  }
  
  /**
   * Manually set theme to a specific theme object
   */
  function setCustomTheme(theme: ISharePointTheme): void {
    applyTheme(theme);
  }
  
  return {
    // State
    currentTheme,
    currentColorName,
    isDarkMode,
    isInitialized,
    availableColors,
    
    // Methods
    initializeTheme,
    changeThemeColor,
    toggleDarkMode,
    resetToDefaultTheme,
    setCustomTheme
  };
});

// Add TypeScript declaration for SharePoint global theme state
declare global {
  interface Window {
    __themeState__?: {
      theme?: Record<string, any>;
    };
  }
}
