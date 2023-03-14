type IconConstant = {
  [key: string]: string[];
};
const getIcon: IconConstant = {
  0: ["sun", "Sunny"],
  1: ["sun", "Sunny"],
  2: ["cloud-sun", "Partly cloudy"],
  3: ["cloud", "Cloudy"],
  45: ["smog", "Foggy"],
  48: ["smog", "Foggy"],
  51: ["cloud-showers-heavy", "Rainy"],
  53: ["cloud-showers-heavy", "Rainy"],
  55: ["cloud-showers-heavy", "Rainy"],
  56: ["cloud-showers-heavy", "Rainy"],
  57: ["cloud-showers-heavy", "Rainy"],
  61: ["cloud-showers-heavy", "Rainy"],
  63: ["cloud-showers-heavy", "Rainy"],
  65: ["cloud-showers-heavy", "Rainy"],
  66: ["cloud-showers-heavy", "Rainy"],
  67: ["cloud-showers-heavy", "Rainy"],
  80: ["cloud-showers-heavy", "Rainy"],
  81: ["cloud-showers-heavy", "Rainy"],
  82: ["cloud-showers-heavy", "Rainy"],
  71: ["snowflake", "Snow"],
  73: ["snowflake", "Snow"],
  75: ["snowflake", "Snow"],
  77: ["snowflake", "Snow"],
  85: ["snowflake", "Snow"],
  86: ["snowflake", "Snow"],
  95: ["cloud-bolt", "Thunderstorm"],
  96: ["cloud-bolt", "Thunderstorm"],
  99: ["cloud-bolt", "Thunderstorm"],
};
export const getIconName = (icon: number) => {
  return getIcon[icon] ? getIcon[icon] : ["", ""];
};
