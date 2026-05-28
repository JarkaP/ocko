import satori, { type SatoriOptions } from 'satori'
import { join } from 'node:path'
import { existsSync, readFileSync } from 'node:fs'
import { svgPathBbox } from 'svg-path-bbox'

function readFont(...parts: string[]): Buffer | null {
    const filePath = join(process.cwd(), ...parts)
    return existsSync(filePath) ? readFileSync(filePath) : null
}

const notoSansData = readFont(
    'node_modules/@fontsource/noto-sans/files/noto-sans-cyrillic-ext-400-normal.woff'
)

const notoGothicData = readFont(
    'node_modules/@fontsource/noto-sans-gothic/files/noto-sans-gothic-gothic-400-normal.woff'
)

export async function generateGlyphSvg(char: string, script: string): Promise<string> {
    const isGothic = script === 'gothic'
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
        { width: 200, height: 200, fonts }
    )

    // Crop the SVG
    const pathMatches = [...svg.matchAll(/\sd="([^"]+)"/g)]
    if (pathMatches.length > 0) {
        let minX = Infinity,
            minY = Infinity,
            maxX = -Infinity,
            maxY = -Infinity
        for (const match of pathMatches) {
            const [x1, y1, x2, y2] = svgPathBbox(match[1])
            minX = Math.min(minX, x1)
            minY = Math.min(minY, y1)
            maxX = Math.max(maxX, x2)
            maxY = Math.max(maxY, y2)
        }
        const w = Math.ceil(maxX - minX)
        const h = Math.ceil(maxY - minY)
        return svg
            .replace(/\bwidth="\d+(\.\d+)?"/, `width="${w}"`)
            .replace(/\bheight="\d+(\.\d+)?"/, `height="${h}"`)
            .replace(/\bviewBox="[^"]*"/, `viewBox="${minX} ${minY} ${w} ${h}"`)
    }

    return svg
}
