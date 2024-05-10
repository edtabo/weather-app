export interface WeatherItem {
  country: string;
  city: string;
  temp: string;
  relativeHumidity: string;
  pressure: string;
  weather: string;
  icon: string;
  time: string;
  img: string;
};


export interface FormData {
  term: string;
}

export interface RequestProps {
  params: {
    term: string;
  };
};

export interface CitiesStore {
  cities: string[];
  add: (item: string) => void;
  remove: (item: string) => void;
}