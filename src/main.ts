/* eslint-disable @typescript-eslint/no-explicit-any */
import { createApp, h, reactive, defineComponent } from 'vue'
import { createPinia } from 'pinia'

import PrimeVue from 'primevue/config'
import { definePreset } from '@primeuix/themes'
import DialogService from 'primevue/dialogservice'
import ToastService from 'primevue/toastservice'

import '../node_modules/primeflex/primeflex.min.css'
import Aura from '@primeuix/themes/aura'
import './assets/main.scss'
import App from './App.vue'

import SPFxConfig from './interfaces/SPFxConfig'

declare global {
  interface Window {
    BaseWidget: BaseWidget
  }
}

interface BaseWidget {
  render: (
    container: Element,
    props: SPFxConfig,
  ) => {
    update: (newProps: Partial<SPFxConfig>) => void
    unmount: () => void
  }
}

const createLibrary = (): BaseWidget => {
  return {
    render: (container: Element, initialProps: SPFxConfig) => {
      const state = reactive<{ props: SPFxConfig }>({
        props: { ...initialProps },
      })

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
              },
            })
          }
        },
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
            950: '#172554',
          },
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
            950: '{blue.950}',
          },
          colorScheme: {
            light: {
              primary: {
                color: '{blue.800}',
              },
              success: {
                color: '{green.400}',
              },
            },
            dark: {
              primary: {
                color: '{blue.800}',
              },
              success: {
                color: '{green.400}',
              },
            },
          },
        },
        components: {
          button: {
            root: {
              iconOnlyWidth: '1.5rem',
              sm: {
                paddingX: '.25rem',
                paddingY: '.25rem',
                fontSize: '.5rem',
              },
            },
            colorScheme: {
              light: {
                text: {
                  primary: {
                    hoverBackground: 'transparent',
                    activeBackground: 'transparent',
                  },
                },
              },
              dark: {
                text: {
                  primary: {
                    hoverBackground: 'transparent',
                    activeBackground: 'transparent',
                  },
                },
              },
            },
          },
          dialog: {
            root: {
              borderRadius: '10px',
            },
          },
          card: {
            root: {
              borderRadius: '10px',
            },
          },
        },
      })

      app.use(PrimeVue, {
        theme: {
          preset: calPreset,
          options: {
            darkModeSelector: '.ecn-app-dark',
          },
        },
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
        },
      }
    },
  }
}

const library = createLibrary()

export default (() => {
  window.BaseWidget = library
  return library
})()
