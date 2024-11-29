"use client"

import React, {useEffect, useRef, useState} from 'react';
import mapboxgl from 'mapbox-gl';
import Styles from "@/components/map/map.module.css"
import 'mapbox-gl/dist/mapbox-gl.css';
import Button from 'react-bootstrap/Button';
import Button2 from "@/components/materialUIButtons/button2";
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import SurfSpotUploader from "@/components/uploadCare/surfSpotUpload/uploader";
import Style from "@/components/uploadCare/surfSpotUpload/upload.module.css";
import {uploadFile} from "@uploadcare/upload-client";
import {showToast} from "@/components/toast/toast";
import {externalUploader} from "@/components/uploadCare/surfSpotUpload/uploadType";
import {useSession} from "next-auth/react";



export default function Map() {
    const mapContainerRef = useRef<HTMLDivElement>(null);
    const zoom = 1;
    const accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN as string;

    const [markers, setMarkers] = useState<mapboxgl.Marker[]>([]);
    const [center, setCenter] = useState<[number, number]>([0, 0]);
    const [location, setLocation] = useState("")
    const [country, setCountry] = useState<string>();
    const [city, setCity] = useState<string>();
    const [file, setFile] = useState<File | null>(null);
    const [longLat, setLongLat] = useState<[number, number]>([0, 0]);

    const map = useRef(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const { data: session, status } = useSession();
    const user = session?.user
    const userEmail = user?.email as string;


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

        // @ts-ignore
        map.current.on('click', (event) =>{
            const { lng, lat } = event.lngLat;
            const newMarker = new mapboxgl.Marker()
            // @ts-ignore
            newMarker.setLngLat(event.lngLat).addTo(map.current);
            fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${lng},${lat}.json?access_token=${mapboxgl.accessToken}`)
                .then(response => response.json())
                .then(data => {

                    const countryFeature = data.features.find(
                        (feature: { place_type: string | string[]; }) => feature.place_type.includes('country')
                    );
                    const cityFeature = data.features.find(
                        (feature: { place_type: string | string[]; }) => feature.place_type.includes('place')
                    );

                    if (countryFeature) {
                        setCountry(countryFeature.text);
                    }
                    if(cityFeature) {
                        setCity(cityFeature.text);
                    }
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
                const firstResult = data.features[0];
                const [longitude, latitude] = firstResult.center;
                setLongLat([longitude, latitude]);

                map.current.flyTo({ center: [longitude, latitude], zoom: 15 });
            }
        }

        catch (error) {
            console.log(error);
        }
    }

    return (
        <div className={Styles.page}>
            <div className={Styles.greyContainer}>

                        <div ref={mapContainerRef} style={{
                            width: '1000px',
                            height: '500px' }}>

                        </div>
                <div className={Styles.inputContainer}>
                    <InputGroup className="mb-3">
                        <Form.Control
                            type="text"
                            onKeyDown={async (e) => {
                                if (e.key === 'Enter') {
                                    await searchLocation();
                                }
                            }}
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                            placeholder="Enter location (e.g., Paris, Eiffel Tower)"
                        />
                        <Button variant="secondary" id="button-addon2" onClick={searchLocation}>
                            Search
                        </Button>

                    </InputGroup>

                    <div className={Style.container}>
                        <input
                            className={Style.input}
                            type="file"
                            accept="image/*"
                            ref={fileInputRef}
                            onChange={async (event) => {
                                setFile(event.target.files[0])
                            }}
                        />


                        <Button2 title={"Select Photo"}
                                 onClick={() => {
                                     fileInputRef.current?.click();
                                 }}>
                        </Button2>


                        <Button2 title={"upload"}
                                 onClick={async() => {
                                     const [longitude, latitude] = longLat;
                                     await externalUploader(country as string, city as string, longitude, latitude, file, userEmail)
                                 }}>
                        </Button2>

                    </div>
                </div>
            </div>
        </div>


    )

}