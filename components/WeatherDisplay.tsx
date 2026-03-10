import React from 'react';
import type WeatherData from '../types/weatherData.ts';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card"
import { Field, FieldLabel } from "@/components/ui/field"
import { Progress } from "@/components/ui/progress"

function calculateTemperature(temp: number): number {
    const celsius = (temp - 32) * (5/9);
    const percentage = (celsius / 100) * 100;

    return percentage;
}

function calculateWindSpeed(wind: number): number {
    const percentage = (wind / 40) * 100;
    return percentage;
}

export default function WeatherDisplay({ date, temperature, windSpeed, rainChance, generalWeather }: WeatherData) {
    return (
        <div className="text-center p-4">
            <Card>
                <CardHeader>
                    <CardTitle>{date}</CardTitle>
                    <CardDescription>The details of the weather on {date}.</CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col items-center justify-center gap-3">
                        {/* Temperature */}
                        <Field className="w-full max-w-sm">
                            <FieldLabel htmlFor="progress-upload">
                                <span>Temperature</span>
                                <span className="ml-auto">{temperature}° F</span>
                            </FieldLabel>
                            <Progress value={calculateTemperature(temperature)} id="progress-upload" />
                        </Field>
                        {/* Wind Speed */}
                        <Field className="w-full max-w-sm">
                            <FieldLabel htmlFor="progress-upload">
                                <span>Wind Speed</span>
                                <span className="ml-auto">{windSpeed} mph</span>
                            </FieldLabel>
                            <Progress value={calculateWindSpeed(windSpeed)} id="progress-upload" />
                        </Field>
                        {/* Precipitation Percentage */}
                        <Field className="w-full max-w-sm">
                            <FieldLabel htmlFor="progress-upload">
                                <span>Precipitation</span>
                                <span className="ml-auto">{rainChance}%</span>
                            </FieldLabel>
                            <Progress value={rainChance} id="progress-upload" />
                        </Field>
                </CardContent>
                <CardFooter>
                    <p>{generalWeather}</p>
                </CardFooter>
            </Card>
        </div>
    )
}