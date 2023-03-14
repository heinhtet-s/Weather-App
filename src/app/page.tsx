"use client";
import React from "react";
import "./page.css";
import { FetchUserCity, FetchWeather } from "@/service/ApiService";

import { getIconName } from "@/constant/IconConstant";
import {
  DailyForcast,
  InitalLoading,
  SearchCity,
  WeatherCard,
} from "@/components";
import {
  CurrentWeatherType,
  DailyWeatherType,
  HourlyWeatherType,
  WeatherApiDataType,
} from "@/dto/WeatherTypes";

const HourlyWeatherCard = ({ item }: { item: HourlyWeatherType }) => {
  return (
    <div className="flex items-center justify-between w-full px-2 py-5 mb-3 bg-gray-100 rounded-lg h-fit ">
      <div className="text-center">
        <h1 className="mb-2 font-bold text-md "> Today </h1>
        <h1 className="mb-2 text-sm font-bold ">
          {" "}
          {new Intl.DateTimeFormat(undefined, {
            hour: "numeric",
          }).format(item.timestamp)}{" "}
        </h1>
      </div>
      <div>
        <img
          alt="weather"
          className="w-10"
          src={`icons/${getIconName(item?.iconCode)[0]}.svg`}
        />
      </div>
      <div className="text-center">
        <p className="mb-2 font-bold text-md "> TEMP </p>
        <p className="mb-2 text-sm font-bold ">
          {" "}
          {item.temp} <sup>o</sup>{" "}
        </p>
      </div>
      <div className="text-center">
        <p className="mb-2 font-bold text-md "> FL TEMP </p>
        <p className="mb-2 text-sm font-bold ">
          {" "}
          {item?.feelsLike}
          <sup>o</sup>
        </p>
      </div>
      <div className="text-center">
        <p className="mb-2 font-bold text-md "> WIND </p>
        <p className="mb-2 text-sm font-bold">
          {" "}
          {item?.windSpeed}
          mph
        </p>
      </div>
      <div className="text-center">
        <p className="mb-2 font-bold text-md "> PRECIP </p>
        <p className="mb-2 text-sm font-bold">
          {" "}
          {item?.precip}
          in
        </p>
      </div>
    </div>
  );
};

export default function Home() {
  const [searchCity, setSearchCity] = React.useState<string>("");
  const [loading, setLoading] = React.useState<boolean>(true);
  const [currentWeather, setCurrentWeather] =
    React.useState<CurrentWeatherType>({
      currentTemp: 0,
      highTemp: 0,
      lowTemp: 0,
      highFeelsLike: 0,
      lowFeelsLike: 0,
      windSpeed: 0,
      precip: 0,
      iconCode: 0,
    });
  const [forecast, setForecast] = React.useState<DailyWeatherType[] | []>([]);
  const [forecastByHour, setForecastByHour] = React.useState<
    HourlyWeatherType[] | []
  >([]);
  const WeatherApiHandler = async ({
    lat,
    log,
  }: {
    lat: number;
    log: number;
  }) => {
    FetchWeather(lat, log)
      .then((data: WeatherApiDataType) => {
        setCurrentWeather(data.current);
        console.log(data, "feefw");
        setForecast(data.daily);
        setForecastByHour(data.hourly);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  React.useEffect(() => {
    navigator.geolocation.getCurrentPosition(function (position) {
      FetchUserCity(position.coords.latitude, position.coords.longitude).then(
        (data) => {
          setSearchCity(data.city);
        }
      );
      WeatherApiHandler({
        lat: position.coords.latitude,
        log: position.coords.longitude,
      });
    });
  }, []);

  const OnSearchChange = (searchData: { value: string; label: string }) => {
    const [lat, lon] = searchData.value.split(" ");
    setSearchCity(searchData.label);
    WeatherApiHandler({
      lat: parseFloat(lat),
      log: parseFloat(lon),
    });
  };
  return (
    <>
      {loading ? (
        <InitalLoading />
      ) : (
        <div className="flex flex-wrap p-2 text-gray-700 lg:p-4 ">
          <div className="w-full lg:w-2/3">
            <SearchCity OnSearchChange={OnSearchChange} />
            <div className="flex flex-wrap mt-5 ">
              <div className="w-full mb-5 sm:mb-0 sm:mr-3 sm:w-3/5">
                {
                  <WeatherCard
                    data={currentWeather}
                    city={searchCity}
                    fontSize={["text-4xl", "text-2xl", "text-6xl"]}
                  />
                }
              </div>
              <div className="w-full sm:ml-3 sm:w-fit sm:grow ">
                <div className="flex flex-row items-center w-full h-full p-5 bg-gray-100 rounded-lg ">
                  <div className="w-full h-fit ">
                    <h1 className="text-3xl font-bold mb-7 ">Detail</h1>
                    <div className="flex my-auto ">
                      <div className="w-1/2 ">
                        <p className="mb-2 font-bold text-md">Low </p>
                        <p className="mb-2 font-bold text-md">Height </p>
                        <p className="mb-2 font-bold text-md">FL Low </p>
                        <p className="mb-2 font-bold text-md">FL Height</p>
                        <p className="mb-2 font-bold text-md">WIND</p>
                        <p className="mb-2 font-bold text-md ">PRECIP</p>
                      </div>
                      <div className="w-1/2 text-right">
                        <p className="mb-2 font-bold text-md">
                          {currentWeather?.highTemp}
                          <sup>o</sup>
                        </p>
                        <p className="mb-2 font-bold text-md">
                          {currentWeather?.lowTemp}
                          <sup>o</sup>
                        </p>
                        <p className="mb-2 font-bold text-md">
                          {currentWeather?.highFeelsLike}
                          <sup>o</sup>
                        </p>
                        <p className="mb-2 font-bold text-md">
                          {currentWeather?.lowFeelsLike}
                          <sup>o</sup>
                        </p>
                        <p className="mb-2 font-bold text-md">
                          {currentWeather?.windSpeed} mph
                        </p>
                        <p className="mb-2 font-bold text-md">
                          {currentWeather?.precip}
                          in
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <DailyForcast forecast={forecast} />
          </div>

          <div
            className="w-full h-full pt-0 pl-4 pr-3 overflow-y-auto lg:w-1/3 "
            style={{ maxHeight: "880px" }}
          >
            <h3 className="mb-3 text-3xl font-bold ">
              Hourly Weather Forecast
            </h3>
            {forecastByHour?.map((item: HourlyWeatherType, index: number) => {
              return <HourlyWeatherCard key={index} item={item} />;
            })}
          </div>
        </div>
      )}
    </>
  );
}
