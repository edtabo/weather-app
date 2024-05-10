import { NextRequest, NextResponse } from "next/server";
import { getJson } from "serpapi";

import { RequestProps } from '@/interfaces';
import { WEATHERBIT_API_URL } from '@/constants';
import { request } from '@/utils/request';

export async function GET(req: Request, { params: { term } }: RequestProps) {
  try {
    if (term || typeof (term) == 'string') {
      const key = process.env.WEATHERBIT_KEY;
      const url = `${WEATHERBIT_API_URL}&key=${key}&city=${term}`;
      const req = await request({ url });
      if (req && req.data[0]) {
        const city = `${req.data[0].city_name}, ${req.data[0].country_code}`;
        const image = await cityImage(city);
        return NextResponse.json({ data: req, image }, { status: 200 });
      }
      else
        return NextResponse.json({ error: true }, { status: 500 });
    }
    return NextResponse.json({ error: true }, { status: 500 });
  } catch (error) {
    return NextResponse.json({ error: true }, { status: 500 });
  }
}

const cityImage = async (term: string): Promise<string> => {
  try {
    const response = await getJson({
      q: `city ${term}`,
      engine: "google_images",
      ijn: "0",
      api_key: process.env.SERPAPI_KEY
    });
    return response["images_results"][0].thumbnail || "";
  } catch (error) {
    return "";
  }
};