import { NextRequest, NextResponse } from 'next/server';

import type WeatherData from '../../../types/weatherData.ts';

const API_KEY = process.env.VISUAL_CROSSING_API_KEY;

// https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/[location]/[date1]/[date2]?key=YOUR_API_KEY

// location (required) – is the address, partial address or latitude,longitude location for which to retrieve weather data. You can also use US ZIP Codes.

// date1 (optional) – is the start date for which to retrieve weather data. If a date2 value is also given, then it represents the first date for which to retrieve weather data. 
// If no date2 is specified then weather data for a single day is retrieved, and that date is specified in date1. All dates and times are in local time of the location specified. 
// Dates should be in the format yyyy-MM-dd. For example 2020-10-19 for October 19th, 2020 or 2017-02-03 for February 3rd, 2017.
// You can also request the information for a specific time for a single date by including time into the date1 field using the format yyyy-MM-ddTHH:mm:ss. For example 2020-10-19T13:00:00.

// GET /api/weather?location={}&date1={}&date2={}
// Params should only be added onto the API endpoint string if they exist.
export async function GET( request: NextRequest ) {
    const params = request.nextUrl.searchParams;
    const location = params.get("location");

    // Build API Endpoint URL
    let ENDPOINT_URL = "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/"

    if (location) {
        ENDPOINT_URL += `${location}`;
    }

    try {
        const result: WeatherData[] = [];
        const periods: string[] = ["yesterday", "today", "tomorrow"];

        for (let i = 0; i < periods.length; i++) {
            const res = await fetch(
                `${ENDPOINT_URL}/${periods[i]}?key=${API_KEY}`
            );
            
            if (res) {
                const data = await res.json();
                const periodData: WeatherData = {
                    date: data.days[0].datetime,
                    temperature: data.days[0].temp,
                    windSpeed: data.days[0].windspeed,
                    rainChance: data.days[0].precipprob,
                    generalWeather: data.days[0].description
                }
                console.log(periodData);
                result.push(periodData);
                
            } else {
                return NextResponse.json({error: 'No Valid Respone.'}, {status: 400});
            }
        }

        console.log(result);
        return NextResponse.json({result}, {status: 200});

    } catch (err) {
        return NextResponse.json({error: err}, {status: 500});
    }
}