"use client"

import React, {useEffect, useRef, useState} from 'react';
import mapboxgl from 'mapbox-gl';
import Styles from "@/components/map/map.module.css"
import 'mapbox-gl/dist/mapbox-gl.css';
import {useSession} from "next-auth/react";



export default function Map({ country, city, title, longitude, latitude }: { country: string, city:string, title:string,longitude: number, latitude: number }) {
    const mapContainerRef = useRef<HTMLDivElement>(null);
    const zoom = 1;
    const accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN as string;

    const [markers, setMarkers] = useState<mapboxgl.Marker[]>([]);
    const [center, setCenter] = useState<[number, number]>([0, 0]);
    const [location, setLocation] = useState("")
    const [continent, setContinent] = useState<string>();
    const [file, setFile] = useState<File | null>(null);
    const [fileName, setFileName] = useState<string>();
    const markerRef = useRef<mapboxgl.Marker | null>(null);//used to remove previous marker.


    const map = useRef(null);
    const { data: session, status } = useSession();
    const user = session?.user



    useEffect(() => {
        if (!mapContainerRef.current) return;

        //remove mapbox logo, only right once works.
        const style = document.createElement('style');
        style.innerHTML = `
          .mapboxgl-ctrl-attrib.mapboxgl-compact {
            display: none !important;
          }
          .mapboxgl-ctrl-logo {
            display: none !important;
          }
        `;
        document.head.appendChild(style);

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
                    lightPreset: 'night'
                }
            }
        });
        map.current.flyTo({ center: [longitude, latitude], zoom: 11 });
        const newMarker = new mapboxgl.Marker({
            color: "#3285a8",
            draggable: false
        });
        const popup = new mapboxgl.Popup({offset: 25})
            .setHTML(`
                      <div>
                       <h3>Surf Spot</h3>
                       <p>Longitude: ${longitude}</p>
                       <p>Latitude: ${latitude}</p>
                       <p>Country: ${country}</p>
                       <p>City: ${city}</p>
                       </div>
            `);
        newMarker.setPopup(popup);

        const lngLat:[number, number] = [longitude, latitude];
        newMarker.setLngLat(lngLat).addTo(map.current);

        return () => map.current.remove();


    }, []);





    return (
        <div className={Styles.page}>

                <div ref={mapContainerRef} style={{
                    width: '1740px',
                    height: '500px',
                    borderRadius: '20px'
                }}>

                </div>
        </div>


    )

}