
import Spot from "@/components/place/placePage";
import React, { use } from 'react';
import { AgCharts } from 'ag-charts-react';

export default function PlacePage({
                                      params
                                  }: {
    params: {
        country: string,
        city: string,
        title: string,
        longitude: number,
        latitude: number
    }
}) {

    const resolvedParams = React.use(Promise.resolve(params));
    return (
        <div>
            <Spot country={resolvedParams.country} city={resolvedParams.city} title={resolvedParams.title} longitude={resolvedParams.longitude} latitude={resolvedParams.latitude} />

        </div>
    )
}