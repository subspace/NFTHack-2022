export const prettyHash = (
  hash: string,
  initSlice: number,
  lastsSlice: number
): string => {
  return `${hash.slice(0, initSlice)}...${hash.slice(
    hash.length - lastsSlice
  )}`;
};
