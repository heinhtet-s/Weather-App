import { FetchCityType } from "@/dto/CityTypes";
import { WeatherApiDataType } from "@/dto/WeatherTypes";
import {
  parseCurrentWeather,
  parseDailyWeather,
  parseHourlyWeather,
} from "@/utils/helper";
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
