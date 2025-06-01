export const formatRating = (volume: number | undefined) => {
    if (!volume || volume < 9) {
        return "-"
    }
    return `${(volume / 1000).toFixed(1)}k`;
};