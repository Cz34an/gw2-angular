export function isRaidCategory(categoryName: string) {
  return categoryName.toLowerCase() === 'raid';
}

export function isFractalCategory(categoryName: string) {
  return categoryName.toLowerCase() === 'fractal';
}
