import { ViteReactSSG } from 'vite-react-ssg'
import { routes } from '@/app/routes'
import '@/styles/globals.css'
import '@/lib/i18n'

export const createRoot = ViteReactSSG({ routes })
