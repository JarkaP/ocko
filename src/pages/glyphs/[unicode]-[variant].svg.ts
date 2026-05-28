import type { APIRoute } from 'astro'
import { getCollection } from 'astro:content'
import { generateGlyphSvg } from '../../utils/generateGlyphSvg'

export async function getStaticPaths() {
    const glyphs = await getCollection('glyphs')
    return glyphs.flatMap((glyph) => [
        {
            params: { unicode: glyph.data.unicode.replace('U+', ''), variant: 'upper' },
            props: { glyph, char: glyph.data.upperCase },
        },
        {
            params: { unicode: glyph.data.unicode.replace('U+', ''), variant: 'lower' },
            props: { glyph, char: glyph.data.lowerCase },
        },
    ])
}

export const GET: APIRoute = async ({ props }) => {
    const { glyph, char } = props
    const svg = await generateGlyphSvg(char, glyph.data.script)

    return new Response(svg, {
        headers: {
            'Content-Type': 'image/svg+xml',
            'Cache-Control': 'public, max-age=31536000',
        },
    })
}
