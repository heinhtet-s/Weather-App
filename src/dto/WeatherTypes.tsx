export type parseCurrentWeatherType = {
  current_weather: {
    temperature: number;
    windspeed: number;
    weathercode: number;
  };
  daily: DailyWeatherArgType;
};

export type DailyWeatherArgType = {
  time: number[];
  weathercode: number[];
  temperature_2m_max: number[];
  temperature_2m_min: number[];
  apparent_temperature_max: number[];
  apparent_temperature_min: number[];
  precipitation_sum: number[];
};
export type HourlyWeatherArgType = {
  hourly: {
    time: number[];
    weathercode: number[];
    temperature_2m: number[];
    apparent_temperature: number[];
    windspeed_10m: number[];
    precipitation: number[];
  };
  current_weather: {
    time: number;
  };
};
export type CurrentWeatherType = {
  currentTemp: number;
  highTemp: number;
  lowTemp: number;
  highFeelsLike: number;
  lowFeelsLike: number;
  windSpeed: number;
  precip: number;
  iconCode: number;
};
export type HourlyWeatherType = {
  timestamp: number;
  iconCode: number;
  temp: number;
  feelsLike: number;
  windSpeed: number;
  precip: number;
};
export type DailyWeatherType = {
  day: string;
  iconCode: number;
  maxTemp: number;
};
export type WeatherApiDataType = {
  current:
    | CurrentWeatherType
    | {
        currentTemp: 0;
        highTemp: 0;
        lowTemp: 0;
        highFeelsLike: 0;
        lowFeelsLike: 0;
        windSpeed: 0;
        precip: 0;
        iconCode: 0;
      };
  daily: DailyWeatherType[] | [];
  hourly: HourlyWeatherType[] | [];
};
