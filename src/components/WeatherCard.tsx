import { getIconName } from "@/constant/IconConstant";
import { CurrentWeatherType, DailyWeatherType } from "@/dto/WeatherTypes";
import Image from "next/image";
import React from "react";

const WeatherCard = ({
  data,
  city,
  fontSize,
}: {
  data: {
    day?: string;
    iconCode: number;
    maxTemp?: number;
    currentTemp?: number;
  };
  city?: string;
  fontSize: string[];
}) => {
  return (
    <div className="flex items-center justify-between h-full p-5 mb-3 mr-3 bg-gray-100 rounded-lg ">
      <div className="w-2/3">
        <h1 className={` font-bold ${fontSize[0]} `}>{city || data?.day}</h1>
        <div className="h-20">
          {" "}
          <h3 className={`mt-2  font-bold opacity-50 ${fontSize[1]}`}>
            {getIconName(data?.iconCode)[1]}
          </h3>
        </div>

        <p className={`font-bold ${fontSize[2]} `}>
          {data?.currentTemp || data?.maxTemp}
          <sup>o</sup>
        </p>
      </div>
      <div className="w-1/3">
        <Image
          alt="weather"
          className="w-full"
          width={100}
          height={100}
          src={`icons/${getIconName(data?.iconCode)[0]}.svg`}
        />
      </div>
    </div>
  );
};

export default WeatherCard;
