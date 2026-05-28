import type { APIRoute } from 'astro'
import { getCollection } from 'astro:content'
import satori, { type SatoriOptions } from 'satori'
import { join } from 'node:path'
import { existsSync, readFileSync } from 'node:fs'

function readFont(...parts: string[]): Buffer | null {
    const filePath = join(process.cwd(), ...parts)
    return existsSync(filePath) ? readFileSync(filePath) : null
}

const notoSansData = readFont(
    'node_modules/@fontsource/noto-sans/files/noto-sans-cyrillic-ext-400-normal.woff',
)

const notoGothicData = readFont(
    'node_modules/@fontsource/noto-sans-gothic/files/noto-sans-gothic-gothic-400-normal.woff'
)

export async function getStaticPaths() {
    const glyphs = await getCollection('glyphs')
    return glyphs.map((glyph) => ({
        params: { unicode: glyph.data.unicode.replace('U+', '') },
        props: { glyph },
    }))
}

export const GET: APIRoute = async ({ props }) => {
    const { glyph } = props
    const char = glyph.data.upperCase
    const isGothic = glyph.data.script === 'gothic'
    const fontFamily = isGothic ? 'Noto Sans Gothic' : 'Noto Sans'

    const fonts: SatoriOptions['fonts'] = []
    if (notoSansData)
        fonts.push({ name: 'Noto Sans', data: notoSansData, weight: 400, style: 'normal' })
    if (notoGothicData)
        fonts.push({ name: 'Noto Sans Gothic', data: notoGothicData, weight: 400, style: 'normal' })

    const svg = await satori(
        {
            type: 'div',
            key: null,
            props: {
                style: {
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '200px',
                    height: '200px',
                    background: 'transparent',
                    fontSize: '130px',
                    color: '#1c1917',
                    fontFamily,
                },
                children: char,
            },
        } as any,
        { width: 200, height: 200, fonts },
    )

    return new Response(svg, {
        headers: {
            'Content-Type': 'image/svg+xml',
            'Cache-Control': 'public, max-age=31536000',
        },
    })
}
