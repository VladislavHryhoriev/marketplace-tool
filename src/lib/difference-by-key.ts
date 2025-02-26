export const differenceByKey = <T, K extends keyof T>(
  arr1: T[],
  arr2: T[],
  key: K,
): T[] => {
  const set2 = new Set(arr2.map((item) => item[key]));
  return arr1.filter((item) => !set2.has(item[key]));
};
