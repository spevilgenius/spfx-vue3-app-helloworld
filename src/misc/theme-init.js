/**
 * Theme Initialization Script
 * Loads necessary CSS and initializes theme integration for SharePoint
 */

/**
 * Load PrimeIcons CSS if not already loaded
 */
function loadPrimeIcons() {
  if (!document.getElementById('primeicons-css')) {
    const link = document.createElement('link');
    link.id = 'primeicons-css';
    link.rel = 'stylesheet';
    link.href = 'https://cdn.jsdelivr.net/npm/primeicons@6.0.1/primeicons.css';
    document.head.appendChild(link);
    console.log('PrimeIcons CSS loaded');
  }
}

/**
 * Add minimal CSS variables for theming
 */
function addThemeCssVariables() {
  if (!document.getElementById('theme-base-css')) {
    const style = document.createElement('style');
    style.id = 'theme-base-css';
    
    // Base CSS variables for light mode
    style.textContent = `
      :root {
        --primary-50: #e6f7ff;
        --primary-100: #bae7ff;
        --primary-200: #91d5ff;
        --primary-300: #69c0ff;
        --primary-400: #40a9ff;
        --primary-500: #0078d4;
        --primary-600: #0062ad;
        --primary-700: #004c87;
        --primary-800: #003761;
        --primary-900: #00213a;
        
        --surface-0: #ffffff;
        --surface-50: #f9fafb;
        --surface-100: #f3f4f6;
        --surface-200: #e5e7eb;
        --surface-300: #d1d5db;
        --surface-400: #9ca3af;
        --surface-500: #6b7280;
        --surface-600: #4b5563;
        --surface-700: #374151;
        --surface-800: #1f2937;
        --surface-900: #111827;
        --surface-950: #030712;
      }
      
      /* Dark mode variables */
      .p-dark {
        --primary-50: #003761;
        --primary-100: #004c87;
        --primary-200: #0062ad;
        --primary-300: #0078d4;
        --primary-400: #40a9ff;
        --primary-500: #69c0ff;
        --primary-600: #91d5ff;
        --primary-700: #bae7ff;
        --primary-800: #e6f7ff;
        --primary-900: #ffffff;
        
        --surface-0: #111827;
        --surface-50: #1f2937;
        --surface-100: #374151;
        --surface-200: #4b5563;
        --surface-300: #6b7280;
        --surface-400: #9ca3af;
        --surface-500: #d1d5db;
        --surface-600: #e5e7eb;
        --surface-700: #f3f4f6;
        --surface-800: #f9fafb;
        --surface-900: #ffffff;
        --surface-950: #030712;
      }
    `;
    
    document.head.appendChild(style);
    console.log('Theme CSS variables added');
  }
}

/**
 * Initialize SharePoint theme integration by checking the context
 */
function initSharePointThemeIntegration() {
  // Import the SharePoint load-themed-styles module if in SharePoint context
  if (isSharePointEnvironment()) {
    console.log('SharePoint environment detected, initializing theme integration');
    
    // Try to use LoadTheme if available
    if (window.require) {
      try {
        window.require(['@microsoft/load-themed-styles'], function(loadThemedStyles) {
          console.log('SharePoint loadThemedStyles module loaded');
          
          // Store in global scope for later use
          window.__loadThemedStyles = loadThemedStyles;
          
          // You could register themes here if needed
        });
      } catch (e) {
        console.error('Failed to load SharePoint theme module:', e);
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
 * Initialize theming
 */
export function initializeTheme() {
  // Load required CSS
  loadPrimeIcons();
  
  // Add base CSS variables
  addThemeCssVariables();
  
  // Initialize SharePoint integration
  initSharePointThemeIntegration();
  
  console.log('Theme initialization complete');
  
  // Return cleanup function
  return function cleanup() {
    // No cleanup needed for this simple initialization
  };
}

// Auto-initialize when imported
initializeTheme();
