"use client";
import { getIconName } from "@/constant/IconConstant";
import React from "react";
import WeatherCard from "./WeatherCard";
import { DailyWeatherType } from "@/dto/WeatherTypes";
type DailyForcastProps = {
  forecast: {
    day: string;
    iconCode: number;
    maxTemp: number;
  }[];
};
const DailyForcast = ({ forecast }: DailyForcastProps) => {
  return (
    <div className="mt-10 ">
      <h3 className="text-3xl font-bold ">Daily Weather Forecast</h3>
      <div className="flex flex-wrap mt-5 ">
        {forecast?.map((item: DailyWeatherType, index: number) => (
          <div key={index} className="w-1/2 h-full sm:w-1/3 md:w-1/4 ">
            <WeatherCard
              data={item}
              fontSize={["text-2xl", "text-lg", "text-4xl"]}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default DailyForcast;
