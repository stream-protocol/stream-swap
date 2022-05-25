export const parseColor = (priceChange: number | undefined = 0) => {
  if (!priceChange) return '#6F8CC3'
  if (priceChange < 0) return '#3C5990'
  if (priceChange > 0) return '#16FB48'
  return '#6F8CC3'
}
