"use client";

import React, { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import Styles from "@/components/map/map.module.css";
import "mapbox-gl/dist/mapbox-gl.css";
import Button from "react-bootstrap/Button";
import Button2 from "@/components/materialUIButtons/button2";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Style from "@/components/uploadCare/surfSpotUpload/upload.module.css";
import { doToast } from "@/components/toast/toast";
import { externalUploader } from "@/components/uploadCare/surfSpotUpload/uploadType";
import { useSession } from "next-auth/react";
import {
  getLocationData,
  submittedCountry,
} from "@/components/map/getLocationData";
import { getExistingSurfSpots } from "@/components/map/getExistingSpots";

export default function Map() {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const zoom = 1;
  const accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN as string;


  const center = [0, 0];//center of the map
  const [location, setLocation] = useState("");//location the user typed as input or clicked on the map
  const [continent, setContinent] = useState<string>();//current continent, used in the info of a marker and to save to the database.
  const [country, setCountry] = useState<string>();//for marker and database
  const [city, setCity] = useState<string>();//for marker and database
  const [title, setTitle] = useState<string>();//for marker and database
  const [file, setFile] = useState<File | null>(null);//will be the picture uploaded by the user.
  const [fileName, setFileName] = useState<string>();//displays in the upload button of a picture.
  const [longitude, setLongitude] = useState<number>(0);//used in marker and database
  const [latitude, setLatitude] = useState<number>(0);//used in marker and database
  const markerRef = useRef<mapboxgl.Marker | null>(null); //used to remove previous marker.

  const [loaded, setLoaded] = useState(true);//used when mapbox loads
  //used for resizing the map
  const [dimensions, setDimensions] = useState({
    height: window.innerHeight,
  });

  const map = useRef(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  //the page only displays all the content if the user is logged in, can be checked if a session is running.
  const { data: session, status } = useSession();
  const user = session?.user;
  const userEmail = user?.email;





  //when user clicks on "find me", let map fly to that location if geolocation is supported by the browser.
  function getUserLocation() {
    // Check if geolocation is supported
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            map.current.flyTo({ center: [longitude, latitude], zoom: 14 });
          },
          (error) => {
            console.error("Error getting location:", error.message);
          },
          {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 0
          }
      );
    } else {
      console.log("Geolocation is not supported by this browser");
    }
  }

  //use effect used for resizing the map's height when the height of the window changes.
  useEffect(() => {
    if(typeof window !== "undefined") {
      const handleResize = () => {
        setDimensions({
          height: window.innerHeight
        });

        setLoaded(true);

        if (map.current) {
          map.current.resize();
        }
      };

      handleResize()
      window.addEventListener('resize', handleResize);

      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }
  }, []);





  useEffect(() => {
    //if there is no current map, do nothing
    if (!mapContainerRef.current) return;

    //remove mapbox logo, only left logo works.
    const style = document.createElement("style");
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

    // Initialize the map with base config.
    // @ts-ignore
    map.current = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/mapbox/streets-v12", // Map style
      center: center, // Initial map center [lng, lat]
      zoom, // Initial zoom level
      config: {
        basemap: {
          lightPreset: "night",
        },
      },
    });

    //when the map loads => add markers for every spot that is already in the database.
    map.current.on("load", async () => {
      const spots = await getExistingSurfSpots();

      spots.forEach(
          (spot: {
            longitude: number;
            latitude: number;
            country: any;
            title: string;
          }) => {
            const newMarker = new mapboxgl.Marker({
              color: "#0B314D",
              draggable: false,
            });
            const popup = new mapboxgl.Popup({ offset: 25 }).setHTML(`
                              <div>
                                <h3>Surf Spot</h3>
                                <p>Longitude: ${spot.longitude.toFixed(4)}</p>
                                <p>Latitude: ${spot.latitude.toFixed(4)}</p>
                                <p>Country: ${spot.country}</p>
                                <p>Title: ${spot.title}</p>
                                <a href="/places/${spot.country}/${spot.city}/${spot.title}/${spot.longitude}/${spot.latitude}">View Details</a>
                              </div>
                            `);
            const lngLat = [spot.longitude, spot.latitude];
            newMarker.setPopup(popup);//make new marker
            newMarker.setLngLat(lngLat).addTo(map.current);//add marker to the map
          }
      );
    });

    //event when user clicks on the map. A user can click on a place that already has a marker of click on a place that does not have a marker. Makes sure another anchor is not places when a user clicks on an existing anchor.
    map.current.on("click", async (event) => {
      const features = map.current.queryRenderedFeatures(event.point);
      const isMarkerClicked = features.some(
          (feature: { layer: { type: string } }) =>
              feature.layer.type === "symbol"
      );
      //only one new marker should be added to the map when a user clicks. A user can only add one place at a time.
      if (!isMarkerClicked) {
        if (markerRef.current) {
          markerRef.current.remove();
        }
        const { lng, lat } = event.lngLat;

        const newMarker = new mapboxgl.Marker({
          color: "#3285a8",
          draggable: true,
        });

        setLatitude(event.lngLat.lat);
        setLongitude(event.lngLat.lng);
``
        //get location based on longitude and latitude. use the location result to update the relevant states.
        const locationData = await getLocationData(
            event.lngLat.lng,
            event.lngLat.lat,
            mapboxgl.accessToken
        );

        setContinent(locationData.continent);
        setCountry(locationData.country);
        setCity(locationData.city);

        setLocation(locationData.country + locationData.city);

        const popup = new mapboxgl.Popup({ offset: 25 }).setHTML(`
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


        //add onDrag action to marker. Updates all the relevant information.
        newMarker.on("dragend", async (event) => {
          const longLatOnDrag = newMarker.getLngLat();
          const longer: [number, number] = [
            longLatOnDrag.lng,
            longLatOnDrag.lat,
          ];

          setLongitude(longer[0]);
          setLatitude(longer[1]);

          //I can't use the updated values because they are not available yet.
          const locationDataOnDrag = await getLocationData(
              longer[0],
              longer[1],
              mapboxgl.accessToken
          );
          setCountry(locationDataOnDrag.country);
          setCity(locationDataOnDrag.city);
          setLocation(locationDataOnDrag.country + locationDataOnDrag.city);
        });

        newMarker.getElement().addEventListener("click", (e) => {
          e.stopPropagation(); // Prevent the map's click event from being triggered
          newMarker.togglePopup();
        });

        map.current.flyTo({ center: [lng, lat], zoom: map.current.getZoom() });
      }
    });

    // Clean up on unmount
    // @ts-ignore
    return () => map.current.remove();
  }, [accessToken, center, zoom, dimensions]);


  //if image title is too long => cut it short and add three points to indicate there is more of the title left.
  function getTitle() {
    if (fileName?.length > 20) {
      return fileName?.substring(0, 20) + "...";
    } else {
      return fileName;
    }
  }

  //search for the location the user enters in the input field.
  async function searchLocation() {
    try {
      const mapResponse = await fetch(
          `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
              location
          )}.json?access_token=${mapboxgl.accessToken}`
      );
      const data = await mapResponse.json();
      let placeZoom;

      //two levels of zoom depending on if the location is a country or something else. Provides a better overview when the user searches for a country.
      const locationIsCountry = submittedCountry(location);
      if (locationIsCountry) {
        placeZoom = 4;
      } else {
        placeZoom = 13;
      }

      if (data && data.features.length > 0) {
        const firstResult = data.features[0];
        const [longitude, latitude] = firstResult.center;

        map.current.flyTo({ center: [longitude, latitude], zoom: placeZoom });
      }
    } catch (error) {
      console.log(error);
    }
  }

  if(!loaded){
    return  <div>Loading...</div>;
  }

  return (
      <div className={Styles.page}>
        {session ? (
            <div className={Styles.greyContainer}>
              <div
                  ref={mapContainerRef}
                  style={{
                    width: "100%",
                    height: `${dimensions.height * 0.40}px`,
                    maxWidth: '100%',
                    borderRadius: "20px",
                  }}
              >

              </div>

              <div className={Styles.inputContainer}>


                <InputGroup className={Styles.locationInput}>
                  <Form.Control
                      type="text"

                      onKeyDown={async (e) => {
                        if (e.key === "Enter") {
                          await searchLocation();
                        }
                      }}
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      placeholder="Enter location and pin it (e.g., Pipeline)"
                  />
                  <Button
                      variant="secondary"
                      id="button-addon2"
                      onClick={searchLocation}
                  >
                    Search
                  </Button>
                </InputGroup>
                <Button2 title="Find me" onClick={getUserLocation} > </Button2>




                <div className={Style.container}>
                  <input
                      className={Style.input}
                      type="file"
                      accept="image/*"
                      ref={fileInputRef}
                      onChange={async (event) => {
                        setFile(event.target.files[0]);
                        setFileName(event.target.files[0].name);
                      }}
                  />



                  <InputGroup className="mb-3">
                    <Form.Control
                        type="text"
                        placeholder="Enter title (e.g., Pipeline)"
                        onChange={(e) => {
                          setTitle(e.target.value);
                        }}
                    />
                  </InputGroup>

                  <Button2
                      title={getTitle() || "Select picture"}
                      onClick={() => {
                        fileInputRef.current?.click();
                      }}
                  ></Button2>


                </div>

                <Button2
                    title={"upload"}
                    onClick={async () => {
                      if (city && country && title) {
                        console.log(continent);
                        await externalUploader(
                            continent as string,
                            country as string,
                            city as string,
                            title as string,
                            longitude,
                            latitude,
                            file,
                            userEmail
                        );
                      } else {
                        doToast({
                          status: "error",
                          message: "please provide a valid location",
                        });
                      }
                    }}
                    style={{
                      position: "absolute",
                      bottom: 0,
                      right: 0,
                      marginRight: "10px",
                      marginBottom: "10px",
                    }}
                ></Button2>
              </div>
            </div>
        ) : null}
      </div>
  );
}