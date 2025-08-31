export const formatVolume = (volume: number | undefined): string => {
    if (volume === undefined) return ''
    return `Vol: ${(volume / 1000).toFixed(2)}`
}