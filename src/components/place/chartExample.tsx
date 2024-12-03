import * as React from 'react';
import { LineChart } from '@mui/x-charts/LineChart';

const uData = [4000, 3000, 2000, 2780, 1890, 2390, 3490];
const pData = [2400, 1398, 9800, 3908, 4800, 3800, 4300];

interface SimpleLineChartProps {
    xLabels: string[]; // Define the prop type
    xData: number[];
    dataLabel: string;
}


export default function SimpleLineChart({ xLabels, xData, dataLabel }: SimpleLineChartProps) {

    return (
        <LineChart
            width={1200}
            height={300}
            series={[
                { data: xData, label: dataLabel },
            ]}
            xAxis={[{ scaleType: 'point', data: xLabels}]}
        />
    );
}