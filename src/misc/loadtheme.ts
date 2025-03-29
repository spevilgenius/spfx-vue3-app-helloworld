import { defineStore } from 'pinia'
import { ref } from 'vue'
import { loadTheme, loadStyles, IThemingInstruction } from '@microsoft/load-themed-styles'

// Define theme interface
interface IThemeColors {
  palette: {
    themePrimary: string
    themeLighterAlt: string
    themeLighter: string
    themeLight: string
    themeTertiary: string
    themeSecondary: string
    themeDarkAlt: string
    themeDark: string
    themeDarker: string
    neutralLighterAlt: string
    neutralLighter: string
    neutralLight: string
    neutralQuaternaryAlt: string
    neutralQuaternary: string
    neutralTertiaryAlt: string
    neutralTertiary: string
    neutralSecondary: string
    neutralPrimaryAlt: string
    neutralPrimary: string
    neutralDark: string
    black: string
    white: string
  }
  isInverted?: boolean
}

// Define tailwind color palettes
const tailwindColors = {
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
  },
}

// Predefined SharePoint themes
const predefinedThemes: Record<string, IThemeColors> = {
  blue: {
    palette: {
      themePrimary: '#0078d4',
      themeLighterAlt: '#eff6fc',
      themeLighter: '#deecf9',
      themeLight: '#c7e0f4',
      themeTertiary: '#71afe5',
      themeSecondary: '#2b88d8',
      themeDarkAlt: '#106ebe',
      themeDark: '#005a9e',
      themeDarker: '#004578',
      neutralLighterAlt: '#faf9f8',
      neutralLighter: '#f3f2f1',
      neutralLight: '#edebe9',
      neutralQuaternaryAlt: '#e1dfdd',
      neutralQuaternary: '#d0d0d0',
      neutralTertiaryAlt: '#c8c6c4',
      neutralTertiary: '#a19f9d',
      neutralSecondary: '#605e5c',
      neutralPrimaryAlt: '#3b3a39',
      neutralPrimary: '#323130',
      neutralDark: '#201f1e',
      black: '#000000',
      white: '#ffffff',
    },
  },
  green: {
    palette: {
      themePrimary: '#107c10',
      themeLighterAlt: '#f1faf1',
      themeLighter: '#c8e6c9',
      themeLight: '#92ce94',
      themeTertiary: '#5eb45f',
      themeSecondary: '#369637',
      themeDarkAlt: '#0e6b0e',
      themeDark: '#0c5e0c',
      themeDarker: '#094409',
      neutralLighterAlt: '#faf9f8',
      neutralLighter: '#f3f2f1',
      neutralLight: '#edebe9',
      neutralQuaternaryAlt: '#e1dfdd',
      neutralQuaternary: '#d0d0d0',
      neutralTertiaryAlt: '#c8c6c4',
      neutralTertiary: '#a19f9d',
      neutralSecondary: '#605e5c',
      neutralPrimaryAlt: '#3b3a39',
      neutralPrimary: '#323130',
      neutralDark: '#201f1e',
      black: '#000000',
      white: '#ffffff',
    },
  },
  purple: {
    palette: {
      themePrimary: '#5c2d91',
      themeLighterAlt: '#f5f0fa',
      themeLighter: '#dfd0ee',
      themeLight: '#c5addf',
      themeTertiary: '#9365c1',
      themeSecondary: '#6b39a7',
      themeDarkAlt: '#532885',
      themeDark: '#462270',
      themeDarker: '#331a53',
      neutralLighterAlt: '#faf9f8',
      neutralLighter: '#f3f2f1',
      neutralLight: '#edebe9',
      neutralQuaternaryAlt: '#e1dfdd',
      neutralQuaternary: '#d0d0d0',
      neutralTertiaryAlt: '#c8c6c4',
      neutralTertiary: '#a19f9d',
      neutralSecondary: '#605e5c',
      neutralPrimaryAlt: '#3b3a39',
      neutralPrimary: '#323130',
      neutralDark: '#201f1e',
      black: '#000000',
      white: '#ffffff',
    },
  },
  orange: {
    palette: {
      themePrimary: '#d83b01',
      themeLighterAlt: '#fdf6f2',
      themeLighter: '#f5d4c8',
      themeLight: '#ebb09f',
      themeTertiary: '#d67e54',
      themeSecondary: '#db4b1e',
      themeDarkAlt: '#c23500',
      themeDark: '#a42d00',
      themeDarker: '#782100',
      neutralLighterAlt: '#faf9f8',
      neutralLighter: '#f3f2f1',
      neutralLight: '#edebe9',
      neutralQuaternaryAlt: '#e1dfdd',
      neutralQuaternary: '#d0d0d0',
      neutralTertiaryAlt: '#c8c6c4',
      neutralTertiary: '#a19f9d',
      neutralSecondary: '#605e5c',
      neutralPrimaryAlt: '#3b3a39',
      neutralPrimary: '#323130',
      neutralDark: '#201f1e',
      black: '#000000',
      white: '#ffffff',
    },
  },
  red: {
    palette: {
      themePrimary: '#e81123',
      themeLighterAlt: '#fdf3f4',
      themeLighter: '#fad4d6',
      themeLight: '#f6b0b5',
      themeTertiary: '#ea6870',
      themeSecondary: '#e13841',
      themeDarkAlt: '#d10f1f',
      themeDark: '#b10d1b',
      themeDarker: '#820a14',
      neutralLighterAlt: '#faf9f8',
      neutralLighter: '#f3f2f1',
      neutralLight: '#edebe9',
      neutralQuaternaryAlt: '#e1dfdd',
      neutralQuaternary: '#d0d0d0',
      neutralTertiaryAlt: '#c8c6c4',
      neutralTertiary: '#a19f9d',
      neutralSecondary: '#605e5c',
      neutralPrimaryAlt: '#3b3a39',
      neutralPrimary: '#323130',
      neutralDark: '#201f1e',
      black: '#000000',
      white: '#ffffff',
    },
  },
}

export const useThemeStore = defineStore('theme', () => {
  const currentTheme = ref<string>('blue')
  const isDarkMode = ref<boolean>(false)

  /**
   * Get the current SharePoint theme
   * @returns The current SharePoint theme if available
   */
  function getCurrentSharePointTheme(): IThemeColors | null {
    try {
      // Attempt to get the current theme from SharePoint
      if (window.__themeState__ && window.__themeState__.theme) {
        return window.__themeState__.theme
      }

      return null
    } catch (error) {
      console.error('Error getting current SharePoint theme:', error)
      return null
    }
  }

  /**
   * Apply a theme using loadTheme
   * @param theme The theme colors to apply
   */
  function applyThemeWithLoadTheme(theme: IThemeColors): void {
    try {
      loadTheme(theme)
      console.log('Theme applied with loadTheme')
    } catch (error) {
      console.error('Error applying theme with loadTheme:', error)
      // Fallback to loadStyles if loadTheme fails
      applyThemeWithLoadStyles(theme)
    }
  }

  /**
   * Apply a theme using loadStyles
   * @param theme The theme colors to apply
   */
  function applyThemeWithLoadStyles(theme: IThemeColors): void {
    try {
      const palette = theme.palette

      // Create CSS variables for each theme color
      const cssVariables: string[] = Object.entries(palette).map(
        ([key, value]) => `--${key}: ${value};`,
      )

      // Create themable instruction
      const themableInstruction: IThemingInstruction = {
        theme: {
          rawString: `:root { ${cssVariables.join(' ')} }`,
        },
      }

      // Apply styles
      loadStyles([themableInstruction])
      console.log('Theme applied with loadStyles')
    } catch (error) {
      console.error('Error applying theme with loadStyles:', error)
    }
  }

  /**
   * Create a theme palette from a Tailwind color
   * @param colorName The name of the Tailwind color to use
   * @param isDark Whether to create a dark variant
   * @returns A SharePoint theme palette object
   */
  function createThemeFromTailwindColor(colorName: string, isDark: boolean): IThemeColors {
    const color = tailwindColors[colorName as keyof typeof tailwindColors]

    if (!color) {
      console.error(`Unknown color: ${colorName}`)
      return predefinedThemes.blue
    }

    // Create palette based on Tailwind color
    const palette = {
      themePrimary: color[500],
      themeLighterAlt: color[50],
      themeLighter: color[100],
      themeLight: color[200],
      themeTertiary: color[300],
      themeSecondary: color[400],
      themeDarkAlt: color[600],
      themeDark: color[700],
      themeDarker: color[800],
      // Neutrals depend on dark/light mode
      neutralLighterAlt: isDark ? '#2f2f2f' : '#faf9f8',
      neutralLighter: isDark ? '#3c3c3c' : '#f3f2f1',
      neutralLight: isDark ? '#494949' : '#edebe9',
      neutralQuaternaryAlt: isDark ? '#595959' : '#e1dfdd',
      neutralQuaternary: isDark ? '#6a6a6a' : '#d0d0d0',
      neutralTertiaryAlt: isDark ? '#7a7a7a' : '#c8c6c4',
      neutralTertiary: isDark ? '#c8c8c8' : '#a19f9d',
      neutralSecondary: isDark ? '#d0d0d0' : '#605e5c',
      neutralPrimaryAlt: isDark ? '#dadada' : '#3b3a39',
      neutralPrimary: isDark ? '#ffffff' : '#323130',
      neutralDark: isDark ? '#f4f4f4' : '#201f1e',
      black: isDark ? '#f8f8f8' : '#000000',
      white: isDark ? '#1f1f1f' : '#ffffff',
    }

    return {
      palette,
      isInverted: isDark,
    }
  }

  /**
   * Apply a predefined SharePoint theme
   * @param themeName Name of the predefined theme to apply
   */
  function applyPredefinedTheme(themeName: string): void {
    const theme = predefinedThemes[themeName]

    if (!theme) {
      console.error(`Unknown theme: ${themeName}`)
      return
    }

    // Apply the theme
    currentTheme.value = themeName
    const themeToApply = {
      ...theme,
      isInverted: isDarkMode.value,
    }

    applyThemeWithLoadTheme(themeToApply)
  }

  /**
   * Apply a Tailwind color as a theme
   * @param colorName Name of the Tailwind color to apply
   */
  function applyTailwindColor(colorName: string): void {
    if (!tailwindColors[colorName as keyof typeof tailwindColors]) {
      console.error(`Unknown Tailwind color: ${colorName}`)
      return
    }

    // Set as current theme
    currentTheme.value = colorName

    // Create theme from Tailwind color
    const theme = createThemeFromTailwindColor(colorName, isDarkMode.value)

    // Apply the theme
    applyThemeWithLoadTheme(theme)
  }

  /**
   * Toggle dark mode
   */
  function toggleDarkMode(): void {
    isDarkMode.value = !isDarkMode.value

    // Re-apply current theme with new mode
    if (predefinedThemes[currentTheme.value]) {
      applyPredefinedTheme(currentTheme.value)
    } else {
      applyTailwindColor(currentTheme.value)
    }
  }

  /**
   * Reset to the default SharePoint theme
   */
  function resetToDefaultTheme(): void {
    try {
      // Get original SharePoint theme
      const originalTheme = getCurrentSharePointTheme()

      if (originalTheme) {
        // Reset to original theme
        applyThemeWithLoadTheme(originalTheme)

        // Update state
        isDarkMode.value = !!originalTheme.isInverted
        currentTheme.value = 'default'

        console.log('Reset to default SharePoint theme')
      } else {
        // Fallback to blue theme
        applyPredefinedTheme('blue')
        isDarkMode.value = false
        currentTheme.value = 'blue'

        console.log('Reset to blue theme (default not found)')
      }
    } catch (error) {
      console.error('Error resetting to default theme:', error)
    }
  }

  /**
   * Apply specific style overrides using loadStyles
   * @param styles CSS styles to apply
   */
  function applyStyleOverrides(styles: string): void {
    try {
      const instruction: IThemingInstruction = {
        theme: { rawString: styles },
      }

      loadStyles([instruction])
      console.log('Style overrides applied')
    } catch (error) {
      console.error('Error applying style overrides:', error)
    }
  }

  /**
   * Initialize the theme store
   */
  function initialize(): void {
    // Optionally get and store the original SharePoint theme
    const spTheme = getCurrentSharePointTheme()
    if (spTheme) {
      isDarkMode.value = !!spTheme.isInverted
    }

    console.log('Theme store initialized')
  }

  return {
    // State
    currentTheme,
    isDarkMode,

    // Methods
    applyPredefinedTheme,
    applyTailwindColor,
    toggleDarkMode,
    resetToDefaultTheme,
    applyStyleOverrides,
    initialize,

    // For advanced use
    getCurrentSharePointTheme,
    applyThemeWithLoadTheme,
    applyThemeWithLoadStyles,
  }
})
