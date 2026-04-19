export function isRaidCategory(categoryName: string): boolean {
  return categoryName.toLowerCase() === 'raid';
}

export function isFractalCategory(categoryName: string): boolean {
  return categoryName.toLowerCase() === 'fractal';
}
