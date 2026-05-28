import { defineConfig } from 'astro/config'

import tailwind from '@astrojs/tailwind'
import alpinejs from '@astrojs/alpinejs'

// https://astro.build/config
export default defineConfig({
    output: 'static',
    base: '/ocko',
    integrations: [tailwind(), alpinejs()],
    experimental: {
        contentIntellisense: true,
    },
})
