import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { CitiesStore } from "@/interfaces";

const initState = ['Medellín', 'Bogotá', 'Cali'];

export const useCitiesStore = create<CitiesStore>()(
  persist(
    (set, get) => ({
      cities: initState,

      add: (item: string) => set(state => {
        if (state.cities.includes(item))
          return state;
        else
          return { cities: [...state.cities, item] };
      }),
      remove: (item: string) => set(state => ({
        cities: state.cities.filter(city => city !== item)
      }))
    }),
    { name: 'cities-store' }
  )

);