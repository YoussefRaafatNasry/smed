export const timeToMs = (time: string): number => {
  var arr = time.split(":").map(Number);
  return 1000 * (arr[0] * 60 * 60 + arr[1] * 60 + arr[2]);
};
