import {
  CurrentWeatherType,
  DailyWeatherArgType,
  DailyWeatherType,
  HourlyWeatherArgType,
  HourlyWeatherType,
  parseCurrentWeatherType,
} from "@/dto/WeatherTypes";

function parseCurrentWeather({
  current_weather,
  daily,
}: parseCurrentWeatherType): CurrentWeatherType {
  const {
    temperature: currentTemp,
    windspeed: windSpeed,
    weathercode: iconCode,
  } = current_weather;
  const {
    temperature_2m_max: [maxTemp],
    temperature_2m_min: [minTemp],
    apparent_temperature_max: [maxFeelsLike],
    apparent_temperature_min: [minFeelsLike],
    precipitation_sum: [precip],
  } = daily;

  return {
    currentTemp: Math.round(currentTemp),
    highTemp: Math.round(maxTemp),
    lowTemp: Math.round(minTemp),
    highFeelsLike: Math.round(maxFeelsLike),
    lowFeelsLike: Math.round(minFeelsLike),
    windSpeed: Math.round(windSpeed),
    precip: Math.round(precip * 100) / 100,
    iconCode,
  };
}
function parseDailyWeather({
  daily,
}: {
  daily: DailyWeatherArgType;
}): DailyWeatherType[] {
  const WEEK_DAYS = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];
  console.log(daily);
  const dayInAWeek = new Date().getDay();
  const forecastDays = WEEK_DAYS.slice(dayInAWeek, WEEK_DAYS.length).concat(
    WEEK_DAYS.slice(0, dayInAWeek)
  );

  return daily.time.map((key, index: number) => {
    return {
      day: forecastDays[index],
      iconCode: daily.weathercode[index],
      maxTemp: Math.round(daily.temperature_2m_max[index]),
    };
  });
}

function parseHourlyWeather({
  hourly,
  current_weather,
}: HourlyWeatherArgType): HourlyWeatherType[] {
  const today = new Date();
  let tomorrow = new Date();
  tomorrow.setDate(today.getDate() + 1);
  tomorrow.setHours(0, 0, 0, 0);
  return hourly.time
    .map((time: any, index: any) => {
      return {
        timestamp: time * 1000,
        iconCode: hourly.weathercode[index],
        temp: Math.round(hourly.temperature_2m[index]),
        feelsLike: Math.round(hourly.apparent_temperature[index]),
        windSpeed: Math.round(hourly.windspeed_10m[index]),
        precip: Math.round(hourly.precipitation[index] * 100) / 100,
      };
    })
    .filter(
      ({ timestamp }: any) =>
        timestamp >= current_weather.time && timestamp <= tomorrow.getTime()
    );
}
export { parseCurrentWeather, parseDailyWeather, parseHourlyWeather };
