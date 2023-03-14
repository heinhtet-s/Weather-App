import { FetchCityResponseType, FetchCityType } from "@/dto/CityTypes";
import {
  CurrentWeatherType,
  DailyWeatherArgType,
  DailyWeatherType,
  HourlyWeatherArgType,
  HourlyWeatherType,
  WeatherApiDataType,
  parseCurrentWeatherType,
} from "@/dto/WeatherTypes";
import axios from "axios";
export const WEATHER_API_URL = "https://api.openweathermap.org/data/2.5";
export const WEATHER_API_KEY = "fa7ef679580040d3aa8f367939740ea6";
const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "967c1e5134mshf3815fff7fe2b26p1e204djsn19eb53d54b11",
    "X-RapidAPI-Host": "wft-geo-db.p.rapidapi.com",
  },
};
export const FetchCity = async (city: string) => {
  try {
    const response = await axios(
      "https://wft-geo-db.p.rapidapi.com/v1/geo/cities?namePrefix=" +
        city +
        "&types=CITY&limit=10",
      options
    );

    return {
      options: response.data.data.map(
        (city: {
          latitude: number;
          longitude: number;
          city: string;
          country: string;
        }) => {
          return {
            value: `${city.latitude} ${city.longitude}`,
            label: `${city.city} (${city.country} )`,
          };
        }
      ),
    };
  } catch (e) {
    console.log(e);
    return {
      options: [],
    };
  }
};
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

export const FetchWeather = async (
  lat: number,
  lon: number
): Promise<WeatherApiDataType> => {
  try {
    const data = await axios.get(
      "https://api.open-meteo.com/v1/forecast?hourly=temperature_2m,apparent_temperature,precipitation,weathercode,windspeed_10m&daily=weathercode,temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,precipitation_sum&current_weather=true&temperature_unit=fahrenheit&windspeed_unit=mph&precipitation_unit=inch&timeformat=unixtime",
      {
        params: {
          latitude: lat,
          longitude: lon,
          timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        },
      }
    );
    return {
      current: parseCurrentWeather(data.data),
      daily: parseDailyWeather(data.data),
      hourly: parseHourlyWeather(data.data),
    };
  } catch (e) {
    console.log(e);
    return {
      current: {
        currentTemp: 0,
        highTemp: 0,
        lowTemp: 0,
        highFeelsLike: 0,
        lowFeelsLike: 0,
        windSpeed: 0,
        precip: 0,
        iconCode: 0,
      },
      daily: [],
      hourly: [],
    };
  }
};
export const FetchUserCity = async (
  lat: number,
  lon: number
): Promise<FetchCityType> => {
  try {
    const response = await axios.get(
      `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}&localityLanguage=en`
    );
    return {
      city: response.data.city,
      country: response.data.countryName,
    };
  } catch (e) {
    console.log(e);
    return {
      city: "",
      country: "",
    };
  }
};
