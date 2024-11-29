"use client"

import React, {useEffect, useRef, useState} from 'react';
import mapboxgl from 'mapbox-gl';
import Styles from "@/components/map/map.module.css"
import 'mapbox-gl/dist/mapbox-gl.css';
import Button from 'react-bootstrap/Button';
import Button2 from "@/components/materialUIButtons/button2";
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Style from "@/components/uploadCare/surfSpotUpload/upload.module.css";
import {showToast} from "@/components/toast/toast";
import {externalUploader} from "@/components/uploadCare/surfSpotUpload/uploadType";
import {useSession} from "next-auth/react";
import {getLocationData} from "@/components/map/getLocationData";



export default function Map() {
    const mapContainerRef = useRef<HTMLDivElement>(null);
    const zoom = 1;
    const accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN as string;

    const [markers, setMarkers] = useState<mapboxgl.Marker[]>([]);
    const [center, setCenter] = useState<[number, number]>([0, 0]);
    const [location, setLocation] = useState("")
    const [country, setCountry] = useState<string>();
    const [city, setCity] = useState<string>();
    const [title, setTitle] = useState<string>();
    const [file, setFile] = useState<File | null>(null);
    const [fileName, setFileName] = useState<string>();
    const [longitude, setLongitude] = useState<number>(0);
    const [latitude, setLatitude] = useState<number>(0);
    const markerRef = useRef<mapboxgl.Marker | null>(null);//used to remove previous marker.


    const map = useRef(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const { data: session, status } = useSession();
    const user = session?.user
    const userID = session?.user?.id
    const userEmail = session?.user?.email


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
        map.current.on('click', async (event) =>{
            const features = map.current.queryRenderedFeatures(event.point);
            const isMarkerClicked = features.some((feature: { layer: { type: string; }; }) => feature.layer.type === 'symbol');

            if(!isMarkerClicked) {
                if (markerRef.current) {
                    markerRef.current.remove();
                }
                const {lng, lat} = event.lngLat;
                const newMarker = new mapboxgl.Marker({
                    color: "#0B314D",
                    draggable: true
                });

                setLatitude(event.lngLat.lat);
                setLongitude(event.lngLat.lng);

                const locationData = await getLocationData(event.lngLat.lng, event.lngLat.lat, mapboxgl.accessToken);
                setCountry(locationData.country);
                setCity(locationData.city);
                setLocation(locationData.country + locationData.city)

                const popup = new mapboxgl.Popup({offset: 25})
                    .setHTML(`
                              <div>
                                <h3>Surf Spot</h3>
                                <p>Longitude: ${event.lngLat.lng.toFixed(4)}</p>
                                <p>Latitude: ${event.lngLat.lat.toFixed(4)}</p>
                                <p>Country: ${locationData.country}</p>
                                <p>City: ${locationData.city}</p>
                              </div>
                            `);

                newMarker.setPopup(popup);
                newMarker.setLngLat(event.lngLat).addTo(map.current);
                markerRef.current = newMarker;


                newMarker.on("dragend", async (event) => {
                    const longLatOnDrag = newMarker.getLngLat()
                    const longer: [number, number] = [longLatOnDrag.lng, longLatOnDrag.lat]

                    setLongitude(longer[0]);
                    setLatitude(longer[1]);

                    //I can't use the updated values because they are not available yet.
                    const locationDataOnDrag = await getLocationData(longer[0], longer[1], mapboxgl.accessToken);
                    setCountry(locationDataOnDrag.country);
                    setCity(locationDataOnDrag.city)
                    setLocation(locationDataOnDrag.country + locationDataOnDrag.city)
                })

                newMarker.getElement().addEventListener('click', (e) => {
                    e.stopPropagation(); // Prevent the map's click event from being triggered
                    newMarker.togglePopup();
                });

                setMarkers((prevMarkers) => [...prevMarkers, newMarker]);
                // @ts-ignore
                map.current.flyTo({center: [lng, lat], zoom: map.current.getZoom()});

            }
        });

        // Clean up on unmount
        // @ts-ignore
        return () => map.current.remove();
    }, [accessToken, center, zoom]);



    function getTitle(){
        if(fileName?.length > 20){
            return fileName?.substring(0, 20) + "..."
        }
        else{
            return fileName
        }
    }

    async function searchLocation() {
        try{
            const mapResponse = await fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(location)}.json?access_token=${mapboxgl.accessToken}`)
            const data = await mapResponse.json();
            if(data && data.features.length > 0){
                const firstResult = data.features[0];
                const [longitude, latitude] = firstResult.center;

                map.current.flyTo({ center: [longitude, latitude], zoom: 13 });
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
                            height: '500px',
                            borderRadius: '20px'
                        }}>

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
                            placeholder="Enter location and pin it (e.g., Pipeline)"

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
                                setFileName(event.target.files[0].name);

                            }}
                        />

                        <Button2 title={getTitle() || "Select picture"}
                            onClick={() => {
                            fileInputRef.current?.click();
                        }}
                        >
                        </Button2>

                        <InputGroup className="mb-3">
                            <Form.Control
                                type="text"
                                placeholder="Enter title (e.g., Pipeline)"
                                onChange={(e) => {
                                    setTitle(e.target.value)}
                                }
                            />
                        </InputGroup>

                        <Button2 title={"upload"}
                                 onClick={async() => {
                                     if(city && country && title) {
                                         console.log(longitude)
                                         console.log(latitude)
                                         console.log(userEmail)
                                         await externalUploader(country as string, city as string, title as string, longitude, latitude, file, userEmail);
                                     }
                                     else {
                                         showToast("error", "please provide a valid location and a title")
                                     }
                                 }}
                                 style={{
                                     position: 'absolute',
                                     bottom: 0,
                                     right: 0,
                                     marginRight: '10px',
                                     marginBottom: '10px',
                                 }}
                                 >
                        </Button2>

                    </div>
                </div>
            </div>
        </div>


    )

}