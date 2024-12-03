"use client"



import {SetStateAction, useEffect, useState} from "react";
import {getWeatherData} from "@/components/place/getWeatherData";
import SimpleLineChart from "@/components/place/chartExample";
import WindDirectionPlot from "@/components/place/windDirectionPlot";
import Form from 'react-bootstrap/Form';
import Styles from "@/components/place/place.module.css"
import { LineChart, Line, ResponsiveContainer, XAxis, YAxis } from 'recharts';

export default function Spot({country, city, title, longitude, latitude}: {
    country: string,
    city: string,
    title: string,
    longitude: number,
    latitude: number
}) {

    const [waterTemperatures, setWaterTemperatures] = useState([]);
    const [airTemperatures, setAirTemperatures] = useState([]);
    const [swellDirections, setSwellDirections] = useState([]);
    const [swellHeights, setSwellHeights] = useState([]);
    const [waveDirections, setWaveDirections] = useState([]);
    const [waveHeights, setWaveHeights] = useState([]);
    const [wavePeriods, setWavePeriods] = useState([]);
    const [windWaveDirections, setWindWaveDirections] = useState([]);
    const [windDirections, setWindDirections] = useState([]);
    const [windSpeeds, setWindSpeeds] = useState([]);
    const [selectedChart, setSelectedChart] = useState('waterTemperature');

    const startDate = new Date()
    //*1000 because in milliseconds
    const endDate = new Date(new Date(startDate).getTime() + 24 * 60 * 60 * 1000);

    const start = new Date().toISOString()
    const end = new Date(new Date(start).getTime() + 24 * 60 * 60 * 1000).toISOString()


    function getHours() {
        const hours: number[] = [];


        for (
            let currentDate = startDate;
            currentDate < endDate;
            currentDate.setHours(currentDate.getHours() + 1)
        ) {
            const currentHour = currentDate.getHours();

            hours.push(currentHour);


        }
        return hours;
    }

    useEffect(() => {
        /*
        const weatherData = async () => {
            const data = await getWeatherData(longitude, latitude,
                [
                    "waterTemperature",
                    "airTemperature",
                    "swellDirection",
                    "swellHeight",
                    "waveDirection",
                    "waveHeight",
                    "wavePeriod",
                    "windWaveDirection",
                    "windDirection",
                    "windSpeed",
                ],
                start, end);

            setWaterTemperatures(data.hours?.map((hour: {
                waterTemperature: {
                    noaa: any;
                    value: any;
                };
            }) => hour?.waterTemperature?.noaa || []) || []);

            setAirTemperatures(data.hours?.map((hour: {
                airTemperature: {
                    noaa: any;
                    value: any;
                };
            }) => hour?.airTemperature?.noaa || []) || []);

            setSwellDirections(data.hours?.map((hour: {
                swellDirection: {
                    noaa: any;
                    value: any;
                };
            }) => hour?.swellDirection?.noaa || []) || []);

            setSwellHeights(data.hours?.map((hour: {
                swellHeight: {
                    noaa: any;
                    value: any;
                };
            }) => hour?.swellHeight?.noaa || []) || []);

            setWaveDirections(data.hours?.map((hour: {
                waveDirection: {
                    noaa: any;
                    value: any;
                };
            }) => hour?.waveDirection?.noaa || []) || []);

            setWaveHeights(data.hours?.map((hour: {
                waveHeight: {
                    noaa: any;
                    value: any;
                };
            }) => hour?.waveHeight?.noaa || []) || []);

            setWavePeriods(data.hours?.map((hour: {
                wavePeriod: {
                    noaa: any;
                    value: any;
                };
            }) => hour?.wavePeriod?.noaa || []) || []);

            setWindWaveDirections(data.hours?.map((hour: {
                windWaveDirection: {
                    noaa: any;
                    value: any;
                };
            }) => hour?.windWaveDirection?.noaa || []) || []);

            setWindDirections(data.hours?.map((hour: {
                windDirection: {
                    noaa: any;
                    value: any;
                };
            }) => hour?.windDirection?.noaa || []) || []);

            setWindSpeeds(data.hours?.map((hour: {
                windSpeed: {
                    noaa: any;
                    value: any;
                };
            }) => hour?.windSpeed?.noaa || []) || []);


        }

        void weatherData()
        */

    }, []);


    const chartConfig = {
        'waterTemperature': {
            data: waterTemperatures,
            label: 'Water Temperature'
        },
        'airTemperature': {
            data: airTemperatures,
            label: 'Air Temperatures'
        },
        'swellDirection': {
            data: swellDirections,
            label: 'Swell Directions'
        },
        'swellHeight': {
            data: swellHeights,
            label: 'Swell Heights'
        },
        'waveDirection': {
            data: waveDirections,
            label: 'Wave Directions'
        },
        'waveHeight': {
            data: waveHeights,
            label: 'Wave Heights'
        },
        'wavePeriod': {
            data: wavePeriods,
            label: 'Wave Periods'
        },
        'windWaveDirection': {
            data: windWaveDirections,
            label: 'Wind Wave Directions'
        },
        'windDirection': {
            data: windDirections,
            label: 'Wind Directions'
        },
        'windSpeed': {
            data: windSpeeds,
            label: 'Wind Speeds'
        }
    };

    const renderSelectedChart = () => {
        const chartData = chartConfig[selectedChart];
        return (
            <ResponsiveContainer width="100%">
            <SimpleLineChart
                xLabels={hourLabels.map((hour: number) => hour.toString() + "h")}
                xData={chartData.data.slice(0, chartData.data.length - 2)}
                dataLabel={chartData.label}
            />
            </ResponsiveContainer>
        );
    };

    const handleChartChange = (e: { target: { value: SetStateAction<string>; }; }) => {
        setSelectedChart(e.target.value);
    };

    const hourLabels = getHours();

    return (
        <div className={Styles.greyContainer}>
            <Form.Select aria-label="Select Weather Data" onChange={handleChartChange}
                         value={selectedChart} size="sm" className="w-25">
                <option value="waterTemperature">Water Temperature</option>
                <option value="airTemperature">Air Temperature</option>
                <option value="swellDirection">Swell Direction</option>
                <option value="swellHeight">Swell Height</option>
                <option value="waveDirection">Wave Direction</option>
                <option value="waveHeight">Wave Height</option>
                <option value="wavePeriod">Wave Period</option>
                <option value="windWaveDirection">Wind Wave Direction</option>
                <option value="windDirection">Wind Direction</option>
                <option value="windSpeed">Wind Speed</option>

            </Form.Select>

            {renderSelectedChart()}

        </div>
    )
}