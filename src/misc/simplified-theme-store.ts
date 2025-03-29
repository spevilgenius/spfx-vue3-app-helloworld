import { defineStore } from 'pinia';
import { ref } from 'vue';
import { loadTheme, loadStyles, ITheme, ThemableArray } from '@microsoft/load-themed-styles';

/**
 * Interface for theme token values
 */
export interface IThemeTokens {
  [key: string]: string;
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
 * Map of Tailwind color names to palettes
 */
interface ITailwindColors {
  [key: string]: ITailwindColorPalette;
}

// Define available Tailwind colors
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
  }
};

// Map of SharePoint theme tokens and their fallback values
const themeTokenDefaults: IThemeTokens = {
  themeDarker: '#004578',
  themeDark: '#005a9e',
  themeDarkAlt: '#106ebe',
  themePrimary: '#0078d4',
  themeSecondary: '#2b88d8',
  themeTertiary: '#71afe5',
  themeLight: '#c7e0f4',
  themeLighter: '#deecf9',
  themeLighterAlt: '#eff6fc',
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
  // Additional tokens for emphasis
  primaryBackground: '#ffffff',
  primaryText: '#323130',
  bodyBackground: '#ffffff',
  bodyText: '#323130',
  disabledBackground: '#f3f2f1',
  disabledText: '#a19f9d'
};

// Dark mode token defaults
const darkThemeTokenDefaults: IThemeTokens = {
  themeDarker: '#82c7ff',
  themeDark: '#6cb8f6',
  themeDarkAlt: '#3aa0f3',
  themePrimary: '#2899f5',
  themeSecondary: '#0078d4',
  themeTertiary: '#235a85',
  themeLight: '#106ebe',
  themeLighter: '#004578',
  themeLighterAlt: '#002b4d',
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
  // Additional tokens for emphasis
  primaryBackground: '#1f1f1f',
  primaryText: '#f3f2f1',
  bodyBackground: '#1f1f1f',
  bodyText: '#f3f2f1',
  disabledBackground: '#313131',
  disabledText: '#6e6e6e'
};

/**
 * Store for handling SharePoint theming operations
 */
export const useSharePointTheme = defineStore('sharePointTheme', () => {
  const currentColorName = ref<string>('blue');
  const isDarkMode = ref<boolean>(false);
  
  /**
   * Creates a theme tokens object from a Tailwind color
   * @param colorName - The name of the Tailwind color to use
   * @param darkMode - Whether to create dark mode tokens
   * @returns Theme tokens object
   */
  function createThemeTokensFromColor(colorName: string, darkMode: boolean = false): IThemeTokens {
    // Get the color palette or default to blue
    const colorPalette = tailwindColors[colorName] || tailwindColors.blue;
    
    // Start with the appropriate default tokens based on mode
    const baseTokens = darkMode ? darkThemeTokenDefaults : themeTokenDefaults;
    
    // Create a new tokens object with the color palette applied
    const tokens: IThemeTokens = {
      ...baseTokens,
      // Override the theme colors with the selected color
      themePrimary: colorPalette[500],
      themeDarkAlt: colorPalette[600],
      themeDark: colorPalette[700],
      themeDarker: colorPalette[800],
      themeSecondary: colorPalette[400],
      themeTertiary: colorPalette[300],
      themeLight: colorPalette[200],
      themeLighter: colorPalette[100],
      themeLighterAlt: colorPalette[50]
    };
    
    return tokens;
  }
  
  /**
   * Creates a theme object for the loadTheme function
   * @param themeTokens - The theme tokens to include
   * @param isDark - Whether this is a dark theme
   * @returns SharePoint theme object
   */
  function createSharePointTheme(themeTokens: IThemeTokens, isDark: boolean = false): ITheme {
    return {
      isInverted: isDark,
      ...themeTokens
    };
  }
  
  /**
   * Splits a styles string to create a ThemableArray
   * @param styles - CSS styles with theme tokens to split
   * @returns ThemableArray for loadStyles
   */
  function createThemableArray(styles: string): ThemableArray {
    // Examples of theme tokens in CSS:
    // color: "[theme:themePrimary, default:#0078d4]";
    // background-color: "[theme:themeLighter, default:#deecf9]";
    
    const themableArray: ThemableArray = [];
    const tokenRegex = /\[theme:\s*(\w+)\s*(?:,\s*default:\s*([^\]]*))?\]/g;
    
    let lastIndex = 0;
    let match;
    
    while ((match = tokenRegex.exec(styles)) !== null) {
      // Add the text before this match if any
      if (match.index > lastIndex) {
        themableArray.push({
          rawString: styles.substring(lastIndex, match.index)
        });
      }
      
      // Add the theme token
      themableArray.push({
        theme: match[1],
        defaultValue: match[2]?.trim() || undefined
      });
      
      lastIndex = tokenRegex.lastIndex;
    }
    
    // Add any remaining text after the last match
    if (lastIndex < styles.length) {
      themableArray.push({
        rawString: styles.substring(lastIndex)
      });
    }
    
    return themableArray;
  }
  
  /**
   * Apply a theme using loadTheme
   * @param colorName - Name of the Tailwind color to use
   */
  function applyTheme(colorName: string): void {
    // Update the current color
    currentColorName.value = colorName;
    
    // Create tokens for the selected color and mode
    const tokens = createThemeTokensFromColor(colorName, isDarkMode.value);
    
    // Create and load the theme
    const theme = createSharePointTheme(tokens, isDarkMode.value);
    loadTheme(theme);
    
    console.log(`Applied ${colorName} theme, dark mode: ${isDarkMode.value}`);
  }
  
  /**
   * Apply style overrides using loadStyles
   * @param styles - CSS styles with theme tokens
   */
  function applyStyles(styles: string): void {
    // Check if the styles include theme tokens
    if (styles.includes('[theme:')) {
      // Split into themable array and load
      const themableArray = createThemableArray(styles);
      loadStyles(themableArray);
    } else {
      // No theme tokens, load as raw string
      loadStyles(styles);
    }
    
    console.log('Applied custom styles');
  }
  
  /**
   * Apply specific SharePoint element overrides
   */
  function applySharePointOverrides(): void {
    const overrides = `
      /* Button overrides */
      .ms-Button--primary {
        background-color: "[theme:themePrimary, default:#0078d4]";
        border-color: "[theme:themePrimary, default:#0078d4]";
      }
      
      .ms-Button--primary:hover {
        background-color: "[theme:themeDarkAlt, default:#106ebe]";
      }
      
      /* Link overrides */
      .ms-Link, a {
        color: "[theme:themePrimary, default:#0078d4]";
      }
      
      .ms-Link:hover, a:hover {
        color: "[theme:themeDarkAlt, default:#106ebe]";
      }
      
      /* Text field focus border */
      .ms-TextField-fieldGroup:focus-within {
        border-color: "[theme:themePrimary, default:#0078d4]";
      }
      
      /* Navigation highlight */
      .ms-Nav-link.is-selected {
        background-color: "[theme:themeLighter, default:#deecf9]";
        color: "[theme:themePrimary, default:#0078d4]";
      }
    `;
    
    applyStyles(overrides);
  }
  
  /**
   * Toggle dark mode
   */
  function toggleDarkMode(): void {
    isDarkMode.value = !isDarkMode.value;
    
    // Re-apply the current theme with the new mode
    applyTheme(currentColorName.value);
  }
  
  /**
   * Reset to default SharePoint theme
   */
  function resetToDefaultTheme(): void {
    try {
      // If we can access the original theme, use it
      if (window.__themeState__ && window.__themeState__.theme) {
        loadTheme(window.__themeState__.theme);
        
        // Update state
        isDarkMode.value = !!window.__themeState__.theme.isInverted;
        currentColorName.value = 'default';
        
        console.log('Reset to default SharePoint theme');
      } else {
        // Otherwise reset to blue
        applyTheme('blue');
        isDarkMode.value = false;
      }
    } catch (error) {
      console.error('Error resetting theme:', error);
      // Fallback to blue
      applyTheme('blue');
      isDarkMode.value = false;
    }
  }
  
  /**
   * Initialize the theme with current settings
   */
  function init(): void {
    // Optionally detect current theme
    if (window.__themeState__ && window.__themeState__.theme) {
      // Extract color information and update state
      const spTheme = window.__themeState__.theme;
      isDarkMode.value = !!spTheme.isInverted;
    }
    
    // Apply initial theme
    applyTheme(currentColorName.value);
    applySharePointOverrides();
  }
  
  return {
    // State
    currentColorName,
    isDarkMode,
    
    // Methods
    applyTheme,
    applyStyles,
    toggleDarkMode,
    resetToDefaultTheme,
    init
  };
});
