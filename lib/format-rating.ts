export const formatRating = (volume: number | undefined) => {
    if (!volume) {
        return "0k"
    }
    return `${(volume / 1000).toFixed(1)}k`;
};