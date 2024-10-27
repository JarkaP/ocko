import { defineConfig } from 'astro/config'

import tailwind from '@astrojs/tailwind'

// https://astro.build/config
export default defineConfig({
    base: '/ocko',
    integrations: [tailwind()],
    experimental: {
        contentIntellisense: true,
    },
})
