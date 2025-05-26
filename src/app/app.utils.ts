export const formatNumber = (n: number) =>
    new Intl.NumberFormat('en', {
        maximumSignificantDigits: 3,
        notation: 'compact',
        compactDisplay: 'short',
    } as any).format(n || 0);

export const formatPercentage = (n: number) =>
    new Intl.NumberFormat('en', { style: 'percent' } as any).format(n || 0);
