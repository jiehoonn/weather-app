"use client";

import { useState } from 'react';

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Field, FieldLabel, FieldGroup } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import WeatherDisplay from "@/components/WeatherDisplay";

import type WeatherData from "../types/weatherData.ts"

export default function Home() {
  const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

  const [address, setAddress] = useState<string>('');

  // Temperature, Wind Speed, Likelihood of Rain, General Weather
  const [yesterdayData, setYesterdayData] = useState<WeatherData>();
  const [todayData, setTodayData] = useState<WeatherData>();
  const [tomorrowData, setTomorrowData] = useState<WeatherData>();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formattedString: string = address.replaceAll(' ', '');
    setAddress(formattedString);

    try {
      const fetchData = async () => {
        const response = await fetch(`${BASE_URL}?location=${address}`);

        if (!response.ok) {
          throw new Error('Response not ok!');
        }

        const data = await response.json();

        setYesterdayData(data.result[0]);
        setTodayData(data.result[1]);
        setTomorrowData(data.result[2]);
      };

      fetchData();
    } catch (err) {
      throw err
    };

  }

  const handleReset = () => {
    setAddress('');
  }

  return (
    <div className="p-8">
      <h1 className="font-bold text-4xl text-center">
        Weather App
      </h1>

      {/* Form */}
      <form onSubmit={handleSubmit}>
        <FieldGroup>
          <Field>
            <FieldLabel htmlFor="address">
              Address
            </FieldLabel>
            <Input 
              id="address" 
              placeholder="Boston, MA"
              value={address}
              onChange={(e) => {setAddress(e.target.value)}}
            />
          </Field>
          <Field orientation="horizontal">
            <Button type="reset" variant="outline" onClick={handleReset}>
              Reset
            </Button>
            <Button type="submit">Submit</Button>
          </Field>
        </FieldGroup>
      </form>

      {/* Weather Data */}
      {(yesterdayData) && (todayData) && (tomorrowData) ? 
        <div className="grid grid-cols-3 gap-4">
          <WeatherDisplay 
            date={yesterdayData.date} 
            temperature={yesterdayData.temperature} 
            windSpeed={yesterdayData.windSpeed} 
            rainChance={yesterdayData.rainChance} 
            generalWeather={yesterdayData.generalWeather}
          />
          <WeatherDisplay 
            date={todayData.date} 
            temperature={todayData.temperature} 
            windSpeed={todayData.windSpeed} 
            rainChance={todayData.rainChance} 
            generalWeather={todayData.generalWeather}
          />
          <WeatherDisplay 
            date={tomorrowData.date} 
            temperature={tomorrowData.temperature} 
            windSpeed={tomorrowData.windSpeed} 
            rainChance={tomorrowData.rainChance} 
            generalWeather={tomorrowData.generalWeather}
          />
        </div>
      :
        <div className="p-4">
          <Card>
            <CardHeader>
              <CardTitle>
                Weather Data Details
              </CardTitle>
              <CardDescription>
                Enter the location of a city in the U.S. in the form of City, State Abbreviation.
              </CardDescription>
            </CardHeader>
            <CardContent>Currently Empty</CardContent>
            <CardFooter></CardFooter>
          </Card>
        </div>
      }
    </div>
  );
}
