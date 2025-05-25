export const formatPrice = (price: number | undefined): string => {
    if (price === undefined) return '$0.00';
    return `$${(price / 100).toFixed(2)}`;
};