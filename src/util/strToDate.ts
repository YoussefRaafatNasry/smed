export const strToDate = (str: string): Date => {
  var arr = str.split(":").map(Number);
  return new Date(0, 0, 0, arr[0], arr[1], arr[2]);
};
