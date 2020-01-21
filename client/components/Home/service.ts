export const getPictureSize = (
  isXs: boolean
): { width: number; height: number } => {
  return isXs ? { width: 300, height: 450 } : { width: 375, height: 562.5 };
};

export default { getPictureSize };
