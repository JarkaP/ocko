import { defineCollection, z } from 'astro:content'

import { glob } from 'astro/loaders'

const glyphs = defineCollection({
    loader: glob({ pattern: '**/*.md', base: './src/content/glyphs' }),

    schema: z.object({
        title: z.string(),
        unicodeDecimal: z.number(),
        script: z.string(),
        lowerCase: z.string(),
        upperCase: z.string(),
    }),
})

export const collections = { glyphs }
