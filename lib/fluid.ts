export function fluid(minSize: number, maxSize: number, minViewport: number, maxViewport: number): string {

	const minSizeRem = minSize / 16
  const maxSizeRem = maxSize / 16
  const minViewportRem = minViewport / 16
  const maxViewportRem = maxViewport / 16

	const slope = (maxSizeRem - minSizeRem) / (maxViewportRem - minViewportRem)
	const intersection = minSizeRem - slope * minViewportRem

	return `clamp(${minSizeRem}rem, ${intersection}rem + ${slope * 100}vw, ${maxSizeRem}rem)`;
}