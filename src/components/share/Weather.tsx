import Image from "next/image";
import moment from "moment";
import "moment/locale/es";

import { WeatherItem } from "@/interfaces";

interface Props {
  data: WeatherItem;
}
export const Weather = ({ data }: Props) => {
  const fullDate = moment(data.time);
  const dayOfWeek = fullDate.format("dddd") || "";
  const date = fullDate.format("DD-MM-YYYY");

  return (
    <>
      <div className="max-w-xs overflow-hidden rounded-lg shadow-lg bg-white mx-auto w-[70%]">
        <div
          className="flex items-end justify-end h-32 p-4 bg-center bg-cover"
          style={{
            backgroundImage: `url(${data.img})`,
          }}
        >
          <p className="px-2 py-1 text-sm tracking-widest uppercase bg-opacity-75 rounded shadow-lg bg-white">
            {`${data.city}, ${data.country}`}
          </p>
        </div>
        <div className="flex justify-between p-4">
          <div className="flex flex-col flex-1 gap-4">
            <div className="flex justify-between">
              <div className="flex gap-2">
                <span className="text-5xl font-semibold">{data.temp}</span>
              </div>
              <Image
                src={`https://cdn.weatherbit.io/static/img/icons/${data.icon}.png`}
                alt={`${data.city}, ${data.country}`}
                width={50}
                height={50}
              />
            </div>
            <p className="text-sm capitalize">
              <strong className="block">{data.weather}</strong>
              {`${dayOfWeek}, ${date}`}
            </p>
          </div>
          <div className="text-sm leading-loose">
            <div className="flex items-center"></div>
          </div>
        </div>
        <div className="flex items-center justify-center gap-8 py-4 border-t text-center">
          <div>
            <span className="text-xl block font-bold">
              {data.relativeHumidity}
            </span>
            <small className="text-[9px] leading-[9px]">Humedad relativa</small>
          </div>
          <div>
            <span className="text-xl block font-bold">{data.pressure}</span>
            <small className="text-[9px] leading-[9px]">Presión</small>
          </div>
        </div>
      </div>
    </>
  );
};
