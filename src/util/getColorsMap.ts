export const getColorsMap = (catagories: string[]): Map<string, string> => {
  const colors = [
    "#008FFB",
    "#00E396",
    "#FEB019",
    "#FF4560",
    "#775DD0",
    "#3F51B5",
    "#546E7A",
    "#D4526E",
    "#8D5B4C",
    "#F86624",
    "#D7263D",
    "#1B998B",
    "#2E294E",
    "#F46036",
    "#E2C044",
  ];

  return catagories.reduce((acc, category) => {
    var color = colors.shift() ?? "";
    acc.set(category, color);
    return acc;
  }, new Map<string, string>());
};
