import React from 'react';
import { PolarAngleAxis, PolarGrid, PolarRadiusAxis, Radar, RadarChart } from 'recharts';
import { Card, CardContent, Typography } from '@mui/material';

// Utility function to convert degrees to cardinal/intercardinal directions
const degreesToDirection = (degrees: number) => {
  const directions = [
    { name: 'N', min: 337.5, max: 22.5 },
    { name: 'NNE', min: 22.5, max: 67.5 },
    { name: 'NE', min: 67.5, max: 112.5 },
    { name: 'ENE', min: 112.5, max: 157.5 },
    { name: 'E', min: 157.5, max: 202.5 },
    { name: 'ESE', min: 202.5, max: 247.5 },
    { name: 'SE', min: 247.5, max: 292.5 },
    { name: 'SSE', min: 292.5, max: 337.5 }
  ];

  // Handle wrap-around for North
  const normalizedDegrees = degrees % 360;

  return directions.find(dir =>
      normalizedDegrees >= dir.min || normalizedDegrees < dir.max
  )?.name || 'N';
};

// Example wind data with degrees
const windData = [
  { degrees: 0, frequency: 0, speed: 10 },
  { degrees: 45, frequency: 0, speed: 8 },
  { degrees: 90, frequency: 0, speed: 7 },
  { degrees: 135, frequency: 0, speed: 6 },
  { degrees: 140, frequency: 0, speed: 5 },
].map(item => ({
  ...item,
  direction: degreesToDirection(item.degrees)
}));

const WindDirectionPlot = () => {
  return (
      <div>
          <Typography variant="h6" gutterBottom>
            Wind Direction Frequency
          </Typography>
          <RadarChart
              width={400}
              height={400}
              data={windData}
          >
            <PolarGrid />
            <PolarAngleAxis dataKey="direction" />
            <PolarRadiusAxis
                angle={90}
                domain={[0, 15]}
                label={{ position: 'inside' }}
            />
            <Radar
                name="Wind Frequency"
                dataKey="frequency"
                stroke="#8884d8"
                fill="#8884d8"
                fillOpacity={0.6}
            />
          </RadarChart>
      </div>
  )
};

  export default WindDirectionPlot;