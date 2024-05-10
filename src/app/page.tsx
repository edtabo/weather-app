"use client";
import { useState } from "react";
import { Resolver, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { Badge, Icons, Spinner, Weather } from "@/components/share";
import { API_URL } from "@/constants";
import { STRING_REGEX } from "@/constants/regexp";
import { CitiesStore, FormData, WeatherItem } from "@/interfaces";
import { useCitiesStore } from "@/store/useCitiesStore";
import { request } from "@/utils/request";

const formSchema = yup.object().shape({
  term: yup.string().matches(STRING_REGEX).min(4).required(),
});

export default function Home() {
  const SearchIcon = Icons["search"];

  const [data, setData] = useState<WeatherItem | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(false);

  const cities = useCitiesStore((state: CitiesStore) => state.cities);
  const { add, remove } = useCitiesStore();

  const {
    register,
    getValues,
    formState: { errors, isValid },
  } = useForm<FormData>({
    resolver: yupResolver(formSchema) as Resolver<FormData>,
  });

  const handgleOnClick = async (search: string) => {
    if (typeof search === "string") {
      try {
        setData(undefined);
        setLoading(true);
        const req = await request({ url: `${API_URL}${search}` });

        if (!req.error && req.data) {
          add(req?.data.data[0].city_name);
          const data: WeatherItem = {
            country: req?.data.data[0].country_code || "",
            city: req?.data.data[0].city_name || "",
            temp: `${Math.round(req?.data.data[0].app_temp)} °C` || "",
            relativeHumidity: `${Math.round(req?.data.data[0].rh)} °C` || "",
            pressure: `${Math.round(req?.data.data[0].pres)} °C` || "",
            weather: req?.data.data[0].weather.description || "",
            icon: req?.data.data[0].weather.icon || "",
            time: req?.data.data[0].ob_time || "",
            img: req?.image || "",
          };
          setData(data);
        }
      } catch (error) {
        toast.error("Error al procesar la solicitud, inténtelo de nuevo");
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <main className="flex min-h-screen bg-app-green-default">
      <div className="w-[80%] mx-auto items-center">
        <div className="mt-[90px] mx-auto flex rounded-full items-center bg-app-grey-900 px-2 w-full max-w-[600px] h-[56px] py-2 shadow-lg shadow-app-grey-900">
          <input
            {...register("term")}
            type="text"
            className="w-full bg-app-grey-900 flex bg-transparent pl-2 text-app-grey-100 outline-0"
            placeholder="Search name movie or select options"
          />
          {isValid && !loading && (
            <button
              type="submit"
              className="relative p-2 bg-app-grey-900 rounded-full text-white"
              onClick={(e) => handgleOnClick(getValues("term"))}
            >
              <SearchIcon className="text-2xl" />
            </button>
          )}
          {loading && <Spinner />}
        </div>

        <div className="flex justify-center gap-4 py-4">
          {cities.map((item) => (
            <Badge handle={handgleOnClick} key={item} label={item} />
          ))}
        </div>

        {data && <Weather data={data} />}
      </div>
      <ToastContainer />
    </main>

    // <main className="flex items-center justify-center min-h-screen bg-app-green-default">
    //   <div className="flex items-center flex-col w-[80%]">
    //     <div className="flex rounded-full items-center bg-app-grey-900 px-2 w-full max-w-[600px] h-[56px] py-2 shadow-lg shadow-app-grey-900">
    //       <input
    //         {...register("term")}
    //         type="text"
    //         className="w-full bg-app-grey-900 flex bg-transparent pl-2 text-app-grey-100 outline-0"
    //         placeholder="Search name movie or select options"
    //       />
    //       {isValid && !loading && (
    //         <button
    //           type="submit"
    //           className="relative p-2 bg-app-grey-900 rounded-full text-white"
    //           onClick={(e) => handgleOnClick(getValues("term"))}
    //         >
    //           <SearchIcon className="text-2xl" />
    //         </button>
    //       )}
    //       {loading && <Spinner />}
    //     </div>

    //     <div className="flex justify-center gap-4 py-4">
    //       {cities.map((item) => (
    //         <Badge handle={handgleOnClick} key={item} label={item} />
    //       ))}
    //     </div>

    //     {data && <Weather data={data} />}
    //   </div>
    //   <ToastContainer />
    // </main>
  );
}
