import { createApp, h, reactive, defineComponent } from 'vue'
import { registerLicense } from '@syncfusion/ej2-base'
import { createPinia } from 'pinia'

import PrimeVue from 'primevue/config'
import { definePreset } from '@primevue/themes'
import DialogService from 'primevue/dialogservice'
import ToastService from 'primevue/toastservice'

import '../node_modules/primeflex/primeflex.min.css'
import Aura from '@primevue/themes/aura'
import './assets/main.scss'
import App from './Hello.vue'
// import App from './Test.vue'

import SPFxConfig from './interfaces/SPFxConfig'

registerLicense('ORg4AjUWIQA/Gnt2XVhhQlJHfV5AQmBIYVp/TGpJfl96cVxMZVVBJAtUQF1hTH5RdkBjUXxZc3ZUTmhe') // 28

// type PropertyUpdateCallback = (event: { propertyName: string; value: any }) => void

declare global {
  interface Window {
    BaseWidget: BaseWidget
  }
}

interface BaseWidget {
  render: (container: Element, props: SPFxConfig) => {
    update: (newProps: Partial<SPFxConfig>) => void;
    unmount: () => void;
  }
}

const createLibrary = (): BaseWidget => {
  return {
    render: (container: Element, initialProps: SPFxConfig) => {
      
      const state = reactive<{ props: SPFxConfig}>({
        props: { ...initialProps }
      });

      const AppComponent = defineComponent({
        setup() {
          return () => {
            return h(App as any, {
              ...state.props,
              'onUpdate:widgetsettings': (value: string) => {
                if (state.props.widgetsettings !== value) {
                  state.props.widgetsettings = value
                  if (state.props.onPropertyChanged) {
                    state.props.onPropertyChanged('widgetsettings', value)
                  }
                }
              },
              'onUpdate:title': (value: string) => {
                if (state.props.title !== value) {
                  state.props.title = value
                  if (state.props.onPropertyChanged) {
                    state.props.onPropertyChanged('title', value)
                  }
                }
              }
            })
          }
        }
      })

      const app = createApp(AppComponent)

      app.use(createPinia())

      const calPreset = definePreset(Aura, {
        primitive: {
          blue: {
            50: '#eff6ff',
            100: '#dbeafe',
            200: '#bfdbfe',
            300: '#93c5fd',
            400: '#60a5fa',
            500: '#3b82f6',
            600: '#2563eb',
            700: '#1d4ed8',
            800: '#005288',
            900: '#1e3a8a',
            950: '#172554'
          }
        },
        semantic: {
          primary: {
            50: '{blue.50}',
            100: '{blue.100}',
            200: '{blue.200}',
            300: '{blue.300}',
            400: '{blue.400}',
            500: '{blue.500}',
            600: '{blue.600}',
            700: '{blue.700}',
            800: '{blue.800}',
            900: '{blue.900}',
            950: '{blue.950}'
          },
          colorScheme: {
            light: {
              primary: {
                color: '{blue.800}'
              },
              success: {
                color: '{green.400}'
              }
            },
            dark: {
              primary: {
                color: '{blue.800}'
              },
              success: {
                color: '{green.400}'
              }
            }
          }
        },
        components: {
          button: {
            icon: {
              only: {
                width: '1.5rem'
              }
            },
            sm: {
              padding: {
                x: '.25rem',
                y: '.25rem'
              },
              font: {
                size: '.5rem'
              }
            },
            colorScheme: {
              light: {
                textPrimaryHoverBackground: 'transparent',
                textPrimaryActiveBackground: 'transparent'
              },
              dark: {
                textPrimaryHoverBackground: 'transparent',
                textPrimaryActiveBackground: 'transparent'
              }
            }
          },
          dialog: {
            border: {
              radius: '10px'
            }
          },
          card: {
            border: {
              radius: '10px'
            }
          }
        }
      })
      
      app.use(PrimeVue, {
        theme: {
          preset: calPreset,
          options: {
            darkModeSelector: '.ecn-app-dark'
          }
        }
      })
      
      app.use(ToastService)
      app.use(DialogService)

      app.mount(container)

      return {
        update: (newProps: Partial<SPFxConfig>) => {
          Object.assign(state.props, newProps)
        },
        unmount: () => {
          app.unmount()
        }
      }
    }
  }
}

const library = createLibrary()

export default (() => {
  window.BaseWidget = library
  return library
})();
