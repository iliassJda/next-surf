"use client"

import React, {useEffect, useRef, useState} from 'react';
import mapboxgl from 'mapbox-gl';
import Styles from "@/components/map/map.module.css"
import 'mapbox-gl/dist/mapbox-gl.css';

interface MapProps {
    center?: [number, number];
}


export default function Map2() {
    const mapContainerRef = useRef<HTMLDivElement>(null);
    const zoom = 1;
    const accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN as string;
    const [markers, setMarkers] = useState<mapboxgl.Marker[]>([]);
    const [center, setCenter] = useState<[number, number]>([0, 0]);
    const [location, setLocation] = useState("Nielstraat")
    const [searchResults, setSearchResults] = useState<any[]>([]);
    let map = useRef(null);
    let mapContainer = useRef(null);

    useEffect(() => {
        if (!mapContainerRef.current) return;

        // Set the Mapbox access token
        mapboxgl.accessToken = accessToken;

        // Initialize the map
        // @ts-ignore
        map.current = new mapboxgl.Map({
            container: mapContainerRef.current,
            style: 'mapbox://styles/mapbox/streets-v12', // Map style
            center: center, // Initial map center [lng, lat]
            zoom, // Initial zoom level
            config: {
                // Initial configuration for the Mapbox Standard style set above. By default, its ID is `basemap`.
                basemap: {
                    // Here, we're setting the light preset to `night`.
                    lightPreset: 'day'
                }
            }
        });

        // @ts-ignore
        map.current.on('click', (event) =>{
            const { lng, lat } = event.lngLat;
            const newMarker = new mapboxgl.Marker()
            // @ts-ignore
            newMarker.setLngLat(event.lngLat).addTo(map.current);
            fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${lng},${lat}.json?access_token=${mapboxgl.accessToken}`)
                .then(response => response.json())
                .then(data => {
                    const address = data.features[0].place_name;
                    console.log(address);
                });

            setMarkers((prevMarkers) => [...prevMarkers, newMarker]);
            // @ts-ignore
            map.current.flyTo({ center: [lng, lat], zoom: map.current.getZoom()});
        });

        // Clean up on unmount
        // @ts-ignore
        return () => map.current.remove();
    }, [accessToken, center, zoom]);

    async function searchLocation() {
        try{
            const mapResponse = await fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(location)}.json?access_token=${mapboxgl.accessToken}`)
            const data = await mapResponse.json();
            if(data && data.features.length > 0){
                setSearchResults(data.features);
                const firstResult = data.features[0];
                const [longitude, latitude] = firstResult.center;
                console.log(latitude);
                console.log(longitude);

                map.current.flyTo({ center: [longitude, latitude], zoom: 15 });
            }
        }

        catch (error) {
            console.log(error);
        }
    }

    return (
        <div>
            <div ref={mapContainerRef} className={Styles.mapContainer}></div>
            <div className={Styles.inputContainer}>
                <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="Enter location (e.g., Paris, Eiffel Tower)"
                />
                <button
                    onClick={searchLocation}>
                    Search
                </button>
            </div>
        </div>


    )

}