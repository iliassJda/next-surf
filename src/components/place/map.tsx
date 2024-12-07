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
    const [center, setCenter] = useState<[number, number]>([0, 0]);

    const [dimensions, setDimensions] = useState({
        width: window.innerWidth,
        height: window.innerHeight
    });


    const map = useRef(null);
    const { data: session, status } = useSession();
    const user = session?.user


    useEffect(() => {
        // Handle window resize
        const handleResize = () => {
            setDimensions({
                width: window.innerWidth,
                height: window.innerHeight
            });

            if (map.current) {
                map.current.resize();
            }
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);



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
        map.current.flyTo({ center: [longitude, latitude], zoom: 14 });
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


    }, [dimensions]);





    return (
        <div ref={mapContainerRef}
             style={{
                 width: '100%',
                 height: `${dimensions.height * 0.45}px`, // 70% of viewport height
                 maxWidth: '100%',
                 borderRadius: '20px'
        }}>
        </div>


    )

}