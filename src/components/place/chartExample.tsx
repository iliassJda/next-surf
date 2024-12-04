import * as React from 'react';
import { LineChart } from '@mui/x-charts/LineChart';
import {Line, ResponsiveContainer, XAxis, YAxis } from 'recharts';

const uData = [4000, 3000, 2000, 2780, 1890, 2390, 3490];
const pData = [2400, 1398, 9800, 3908, 4800, 3800, 4300];

interface SimpleLineChartProps {
    xLabels: string[]; // Define the prop type
    xData: number[];
    dataLabel: string;
}


export default function SimpleLineChart({ xLabels, xData, dataLabel }: SimpleLineChartProps) {

    return (
        <ResponsiveContainer width="100%" height="40%">
            <LineChart
                width={1200}
                height={300}
                series={[
                    { data: xData, label: dataLabel,  color: '#a56dbd',},
                ]}
                xAxis={
                [{ scaleType: 'point',
                    data: xLabels,
                    stroke: "white",  // x-axis line color
                }]}
                yAxis={[
                    {
                        style: {
                            axisLine: { stroke: '#a56dbd' },
                            tickLine: { stroke: '#C70039' },
                            label: { fill: '#900C3F' },
                        },
                    },
                ]}
            />
        </ResponsiveContainer>
    );
}