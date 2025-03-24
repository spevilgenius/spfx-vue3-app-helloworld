/**
 * SharePoint Theme Adapter
 * Adapts SharePoint themes to work with Tailwind CSS themes
 * Uses @microsoft/load-themed-styles to properly apply themes within SharePoint
 */

// Define mapping between Tailwind theme names and SharePoint themes
const THEME_MAPPINGS = {
  // Primary Colors
  'blue': { spTheme: 'blue', spShade: 'shade50' },
  'indigo': { spTheme: 'themeDarker', spShade: 'shade30' },
  'purple': { spTheme: 'purple', spShade: 'shade50' },
  'emerald': { spTheme: 'greenLight', spShade: 'shade30' },
  'teal': { spTheme: 'teal', spShade: 'shade40' },
  'amber': { spTheme: 'orangeLighter', spShade: 'shade30' },
  'orange': { spTheme: 'orange', spShade: 'shade30' },
  'rose': { spTheme: 'red', spShade: 'shade30' },
  
  // SharePoint Predefined Themes
  'themeDarkRed': { spTheme: 'red', spShade: 'shade50', isPreset: true },
  'themeRed': { spTheme: 'red', spShade: 'shade30', isPreset: true },
  'themeDarkOrange': { spTheme: 'orange', spShade: 'shade50', isPreset: true },
  'themeOrange': { spTheme: 'orangeLight', spShade: 'shade30', isPreset: true },
  'themeDarkYellow': { spTheme: 'yellow', spShade: 'shade50', isPreset: true },
  'themeYellow': { spTheme: 'yellow', spShade: 'shade30', isPreset: true },
  'themeDarkGreen': { spTheme: 'green', spShade: 'shade50', isPreset: true },
  'themeGreen': { spTheme: 'green', spShade: 'shade30', isPreset: true },
  'themeDarkBlue': { spTheme: 'blue', spShade: 'shade50', isPreset: true },
  'themeBlue': { spTheme: 'blue', spShade: 'shade30', isPreset: true },
  'themeDarkPurple': { spTheme: 'purple', spShade: 'shade50', isPreset: true },
  'themePurple': { spTheme: 'purple', spShade: 'shade30', isPreset: true },
  'themeDarkTeal': { spTheme: 'teal', spShade: 'shade50', isPreset: true },
  'themeTeal': { spTheme: 'teal', spShade: 'shade30', isPreset: true }
};

// Get all available predefined SharePoint themes
export function getSharePointThemes() {
  return Object.entries(THEME_MAPPINGS)
    .filter(([_, value]) => value.isPreset)
    .map(([key, _]) => key);
}

// Get all available Tailwind themes
export function getTailwindThemes() {
  return Object.entries(THEME_MAPPINGS)
    .filter(([_, value]) => !value.isPreset)
    .map(([key, _]) => key);
}

/**
 * Apply a SharePoint predefined theme
 * @param {string} themeName - The SharePoint theme name (e.g., 'themeDarkYellow')
 */
export function applySharePointTheme(themeName) {
  if (!isSharePointEnvironment()) {
    console.warn('Not in SharePoint environment, theme will only affect the Vue component');
    return;
  }
  
  const mapping = THEME_MAPPINGS[themeName];
  if (!mapping) {
    console.error(`Unknown theme: ${themeName}`);
    return;
  }
  
  try {
    // In SharePoint, we use its built-in theming capabilities
    if (window._spPageContextInfo && window.__themeState__ && window.loadTheme) {
      // Extract theme info from SharePoint's theme state
      const themeInfo = getSharePointThemeInfo(mapping.spTheme, mapping.spShade);
      
      // Apply the theme using SharePoint's loadTheme function
      window.loadTheme(themeInfo);
      
      console.log(`Applied SharePoint theme: ${themeName}`);
    } else if (window.require) {
      // Alternative approach using require if available
      window.require(['@microsoft/load-themed-styles'], (loadThemedStyles) => {
        // Create a theme ruleset
        const themeRules = createSharePointThemeRules(mapping.spTheme, mapping.spShade);
        
        // Load the themed styles
        loadThemedStyles.loadStyles(themeRules);
        
        console.log(`Applied SharePoint theme using loadThemedStyles: ${themeName}`);
      });
    }
  } catch (error) {
    console.error('Error applying SharePoint theme:', error);
  }
}

/**
 * Apply a Tailwind theme in SharePoint environment
 * @param {string} colorName - The primary color name from Tailwind
 * @param {boolean} isDarkMode - Whether dark mode is enabled
 */
export function applyTailwindTheme(colorName, isDarkMode) {
  // Find the corresponding SharePoint theme
  const mapping = THEME_MAPPINGS[colorName];
  if (!mapping) {
    console.error(`Unknown Tailwind color: ${colorName}`);
    return;
  }
  
  // Apply dark mode toggle
  toggleDarkMode(isDarkMode);
  
  if (isSharePointEnvironment()) {
    try {
      // Use SharePoint's theming capabilities
      if (window._spPageContextInfo && window.__themeState__ && window.loadTheme) {
        // Create theme colors based on the color and dark mode
        const themeInfo = getSharePointThemeInfo(mapping.spTheme, mapping.spShade, isDarkMode);
        
        // Apply the theme using SharePoint's loadTheme function
        window.loadTheme(themeInfo);
        
        console.log(`Applied Tailwind theme to SharePoint: ${colorName}, Dark Mode: ${isDarkMode}`);
      } else if (window.require) {
        // Alternative approach using require if available
        window.require(['@microsoft/load-themed-styles'], (loadThemedStyles) => {
          // Create a theme ruleset based on the Tailwind color
          const themeRules = createSharePointThemeRules(mapping.spTheme, mapping.spShade, isDarkMode);
          
          // Load the themed styles
          loadThemedStyles.loadStyles(themeRules);
          
          console.log(`Applied Tailwind theme using loadThemedStyles: ${colorName}, Dark Mode: ${isDarkMode}`);
        });
      }
    } catch (error) {
      console.error('Error applying Tailwind theme to SharePoint:', error);
    }
  } else {
    console.log(`Not in SharePoint environment, theme will only affect the Vue component: ${colorName}, Dark Mode: ${isDarkMode}`);
  }
}

/**
 * Toggle dark mode in SharePoint and the app
 * @param {boolean} isDarkMode - Whether dark mode should be enabled
 */
export function toggleDarkMode(isDarkMode) {
  if (isDarkMode) {
    document.documentElement.classList.add('p-dark');
    document.body.classList.add('p-dark');
    
    // Apply dark mode to SharePoint if in that environment
    if (isSharePointEnvironment()) {
      document.body.classList.add('ms-darkMode');
      
      // Try to find SharePoint's dark mode toggle and activate it if possible
      const darkModeToggle = document.querySelector('.ms-darkMode-toggle');
      if (darkModeToggle) {
        // This might need adjustments based on SharePoint's actual implementation
        const isAlreadyDark = darkModeToggle.getAttribute('aria-checked') === 'true';
        if (!isAlreadyDark) {
          // Simulating a click might trigger SharePoint's dark mode
          darkModeToggle.click();
        }
      }
    }
  } else {
    document.documentElement.classList.remove('p-dark');
    document.body.classList.remove('p-dark');
    
    // Remove dark mode from SharePoint if in that environment
    if (isSharePointEnvironment()) {
      document.body.classList.remove('ms-darkMode');
      
      // Try to find SharePoint's dark mode toggle and deactivate it if possible
      const darkModeToggle = document.querySelector('.ms-darkMode-toggle');
      if (darkModeToggle) {
        const isAlreadyDark = darkModeToggle.getAttribute('aria-checked') === 'true';
        if (isAlreadyDark) {
          // Simulating a click might toggle SharePoint's dark mode off
          darkModeToggle.click();
        }
      }
    }
  }
}

/**
 * Check if currently running in a SharePoint environment
 * @returns {boolean} True if in SharePoint environment
 */
function isSharePointEnvironment() {
  return typeof window !== 'undefined' && (
    window._spPageContextInfo || 
    window.SPClientTemplates || 
    (window.SP && window.SP.ClientContext) ||
    document.getElementById('SPPageChrome') !== null
  );
}

/**
 * Extract theme information from SharePoint's theme state
 * @param {string} baseColor - The base color name from SharePoint's palette
 * @param {string} shade - The shade to use ('shade10', 'shade20', etc.)
 * @param {boolean} isDarkMode - Whether to create a dark mode version
 * @returns {Object} Theme information for SharePoint's loadTheme function
 */
function getSharePointThemeInfo(baseColor, shade, isDarkMode = false) {
  // Default theme info if we can't extract from SharePoint
  let themeInfo = {
    isInverted: isDarkMode,
    palette: {}
  };
  
  try {
    // If SharePoint theme state is available, extract from it
    if (window.__themeState__ && window.__themeState__.theme) {
      const spTheme = window.__themeState__.theme;
      
      // Start with a copy of the current theme
      themeInfo = JSON.parse(JSON.stringify(spTheme));
      
      // Modify the theme palette
      if (themeInfo.palette) {
        // Set the primary color based on our input
        if (baseColor && themeInfo.palette[baseColor]) {
          themeInfo.palette.themePrimary = themeInfo.palette[baseColor];
          
          // Adjust related colors
          if (shade && themeInfo.palette[`${baseColor}${shade}`]) {
            themeInfo.palette.themeSecondary = themeInfo.palette[`${baseColor}${shade}`];
          }
        }
        
        // Adjust for dark mode
        if (isDarkMode) {
          themeInfo.isInverted = true;
          
          // Swap some colors for dark mode
          themeInfo.palette.white = themeInfo.palette.black;
          themeInfo.palette.neutralLighter = themeInfo.palette.neutralDark;
          themeInfo.palette.neutralLight = themeInfo.palette.neutralDarker || themeInfo.palette.neutralDark;
          themeInfo.palette.neutralQuaternaryAlt = themeInfo.palette.neutralTertiary;
          themeInfo.palette.neutralQuaternary = themeInfo.palette.neutralSecondary;
          themeInfo.palette.neutralTertiaryAlt = themeInfo.palette.neutralPrimary;
          themeInfo.palette.neutralTertiary = themeInfo.palette.neutralPrimaryAlt;
          themeInfo.palette.neutralSecondary = themeInfo.palette.neutralQuaternaryAlt;
          themeInfo.palette.neutralPrimaryAlt = themeInfo.palette.neutralQuaternary;
          themeInfo.palette.neutralPrimary = themeInfo.palette.neutralLight;
          themeInfo.palette.neutralDark = themeInfo.palette.neutralLighter;
          themeInfo.palette.black = themeInfo.palette.white;
        }
      }
    }
  } catch (error) {
    console.error('Error extracting SharePoint theme info:', error);
  }
  
  return themeInfo;
}

/**
 * Create SharePoint theme rules for load-themed-styles
 * @param {string} baseColor - The base color name from SharePoint's palette
 * @param {string} shade - The shade to use ('shade10', 'shade20', etc.)
 * @param {boolean} isDarkMode - Whether to create dark mode rules
 * @returns {string} CSS rules string for loadThemedStyles
 */
function createSharePointThemeRules(baseColor, shade, isDarkMode = false) {
  // Try to get SharePoint's palette
  let palette = {};
  try {
    if (window.__themeState__ && window.__themeState__.theme && window.__themeState__.theme.palette) {
      palette = window.__themeState__.theme.palette;
    }
  } catch (error) {
    console.error('Error getting SharePoint palette:', error);
  }
  
  // Primary color based on input
  const primary = palette[baseColor] || '#0078d4'; // Default if not found
  const secondary = palette[`${baseColor}${shade}`] || '#106ebe';
  
  // Create CSS rules based on dark mode
  if (isDarkMode) {
    return `
      .ms-Button--primary { background-color: ${primary}; border-color: ${primary}; }
      .ms-Button--primary:hover { background-color: ${secondary}; }
      body, .ms-Fabric { background-color: #121212; color: #ffffff; }
      .ms-Panel-main { background-color: #2d2d2d; }
      .ms-TextField-field { background-color: #2d2d2d; color: #ffffff; }
    `;
  } else {
    return `
      .ms-Button--primary { background-color: ${primary}; border-color: ${primary}; }
      .ms-Button--primary:hover { background-color: ${secondary}; }
      body, .ms-Fabric { background-color: #ffffff; color: #333333; }
      .ms-Panel-main { background-color: #ffffff; }
      .ms-TextField-field { background-color: #ffffff; color: #333333; }
    `;
  }
}
