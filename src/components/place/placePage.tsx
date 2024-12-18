"use client";

import { SetStateAction, useEffect, useRef, useState } from "react";
import { getWeatherData } from "@/components/place/getWeatherData";
import Styles from "@/components/place/place.module.css";
import * as React from "react";
import WavesIcon from "@mui/icons-material/Waves";
import WaterDropIcon from "@mui/icons-material/WaterDrop";
import ThermostatIcon from "@mui/icons-material/Thermostat";
import AirIcon from "@mui/icons-material/Air";
import WaterIcon from "@mui/icons-material/Water";
import NorthEastIcon from "@mui/icons-material/NorthEast";

import RemoveReview from "../button/removeReview/removeReview";

import ReviewButton from "../button/review/review";

import HourglassBottomIcon from "@mui/icons-material/HourglassBottom";

import Map from "@/components/place/map";

import HeightIcon from "@mui/icons-material/Height";

import BootstrapCarouselWithoutArrows from "@/components/place/carousel";
import SurfingIcon from "@mui/icons-material/Surfing";

import GetDirectionIcon from "@/components/place/directionArrow";
import { getReviews } from "@/action/review";
import { getUser, SavePlace, isPlaceSaved, UnsavePlace } from "@/action/user";
import { Review } from "@prisma/client";

import {
  getSpotImages,
  handleSpotImage,
} from "@/components/place/handleSpotImage";
import Button2 from "@/components/materialUIButtons/button2";
import Style from "@/components/uploadCare/profilePictureUpload/upload.module.css";
import { uploadFile } from "@uploadcare/upload-client";
import { showToast } from "@/components/toast/toast";
import { useSession } from "next-auth/react";

import SpotDelete from "@/components/place/postDeletePopUp";
import prisma from "@/lib/db";

import DeleteIcon from "@mui/icons-material/Delete";
import { User } from "next-auth";

import { verifyUser } from "@/components/place/verifyUser";

import { amber } from "@mui/material/colors";

export default function Spot({
  country,
  city,
  title,
  longitude,
  latitude,
}: {
  country: string;
  city: string;
  title: string;
  longitude: number;
  latitude: number;
}) {
  const [waterTemperatures, setWaterTemperatures] = useState([]);
  const [airTemperatures, setAirTemperatures] = useState([]);
  const [swellDirections, setSwellDirections] = useState([]);
  const [swellHeights, setSwellHeights] = useState([]);
  const [waveDirections, setWaveDirections] = useState([]);
  const [waveHeights, setWaveHeights] = useState([]);
  const [wavePeriods, setWavePeriods] = useState([]);
  const [windWaveDirections, setWindWaveDirections] = useState([]);
  const [windDirections, setWindDirections] = useState([]);
  const [windSpeeds, setWindSpeeds] = useState([]);
  const [precipitations, setPrecipitations] = useState([]);
  const [imageUrls, setImageUrl] = useState([]);

  const [username, setUsername] = useState(() => {
    const savedState = sessionStorage.getItem("username");
    return savedState !== null ? JSON.parse(savedState) : false;
  });

  const [userId, setUserId] = useState(() => {
    const savedState = sessionStorage.getItem("userId");
    return savedState !== null ? JSON.parse(savedState) : false;
  });

  const [reviews, setReviews] = useState([]);
  const [spotRating, setSpotRating] = useState(0);
  const [saved, setSaved] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const { data: session, status } = useSession();
  const user = session?.user;
  const userEmail = user?.email;

  const start = new Date().toISOString();

  const [adminUser, setAdminUser] = useState(() => {
    const savedState = sessionStorage.getItem("adminStatus");
    return savedState !== null ? JSON.parse(savedState) : false;
  });

  useEffect(() => {
    const reviews = async () => {
      const data = await getReviews(city, title);
      setReviews(data?.review);
      setSpotRating(data?.spotRating as number);
    };

    const user = async () => {
      const user = session?.user;
      const userEmail = user?.email;
      if (userEmail) {
        const newUser = await getUser(userEmail as string);
        console.log(
          "This is what the current user ID should be: ",
          newUser?.id
        );
        sessionStorage.setItem("username", JSON.stringify(newUser?.username));
        setUsername(newUser?.username);
        // console.log("This is the current user ID: ", userId);
        sessionStorage.setItem("userId", JSON.stringify(newUser?.id));
        setUsername(newUser?.id);
      }
    };

    const weatherData = async () => {
      const data = await getWeatherData(
        latitude,
        longitude,
        [
          "waterTemperature",
          "airTemperature",
          "swellDirection",
          "swellHeight",
          "waveDirection",
          "waveHeight",
          "wavePeriod",
          "windWaveDirection",
          "windDirection",
          "windSpeed",
          "precipitation",
        ],
        start,
        start
      );

      setWaterTemperatures(
        data.hours?.map(
          (hour: {
            waterTemperature: {
              noaa: any;
              value: any;
            };
          }) => hour?.waterTemperature?.noaa || []
        ) || []
      );

      setAirTemperatures(
        data.hours?.map(
          (hour: {
            airTemperature: {
              noaa: any;
              value: any;
            };
          }) => hour?.airTemperature?.noaa || []
        ) || []
      );

      setSwellDirections(
        data.hours?.map(
          (hour: {
            swellDirection: {
              noaa: any;
              value: any;
            };
          }) => hour?.swellDirection?.noaa || []
        ) || []
      );

      setSwellHeights(
        data.hours?.map(
          (hour: {
            swellHeight: {
              noaa: any;
              value: any;
            };
          }) => hour?.swellHeight?.noaa || []
        ) || []
      );

      setWaveDirections(
        data.hours?.map(
          (hour: {
            waveDirection: {
              noaa: any;
              value: any;
            };
          }) => hour?.waveDirection?.noaa || []
        ) || []
      );

      setWaveHeights(
        data.hours?.map(
          (hour: {
            waveHeight: {
              noaa: any;
              value: any;
            };
          }) => hour?.waveHeight?.noaa || []
        ) || []
      );

      setWavePeriods(
        data.hours?.map(
          (hour: {
            wavePeriod: {
              noaa: any;
              value: any;
            };
          }) => hour?.wavePeriod?.noaa || []
        ) || []
      );

      setWindWaveDirections(
        data.hours?.map(
          (hour: {
            windWaveDirection: {
              noaa: any;
              value: any;
            };
          }) => hour?.windWaveDirection?.noaa || []
        ) || []
      );

      setWindDirections(
        data.hours?.map(
          (hour: {
            windDirection: {
              noaa: any;
              value: any;
            };
          }) => hour?.windDirection?.noaa || []
        ) || []
      );

      setWindSpeeds(
        data.hours?.map(
          (hour: {
            windSpeed: {
              noaa: any;
              value: any;
            };
          }) => hour?.windSpeed?.noaa || []
        ) || []
      );

      setPrecipitations(
        data.hours?.map(
          (hour: {
            precipitation: {
              noaa: any;
              value: any;
            };
          }) => hour?.precipitation?.noaa || []
        ) || []
      );
    };

    const getImageUrl = async () => {
      const imageUrls = await getSpotImages(city, title);
      // @ts-ignore
      setImageUrl(
        imageUrls.map((imageUrl) => {
          if (imageUrl.imageURL === "none") {
            return "/images/defaultProfile.png";
          } else {
            return imageUrl.imageURL;
          }
        })
      );
    };

    const isAdmin = async () => {
      if (await verifyUser(city, title, userEmail as string)) {
        sessionStorage.setItem("adminStatus", JSON.stringify(true));
        setAdminUser(true);
      } else {
        sessionStorage.setItem("adminStatus", JSON.stringify(false));
        setAdminUser(false);
      }
    };

    void weatherData();
    void getImageUrl();
    void reviews();
    void isAdmin();
    void user();
  }, []);

  const handleSave = async () => {
    if (!saved) {
      const res = await SavePlace(userId, latitude, longitude);
      setSaved(true);
    }
    if (saved) {
      const res = await UnsavePlace(userId, latitude, longitude);
      setSaved(false);
    }
  };
  useEffect(() => {
    const isSaved = async () => {
      if (userId || typeof userId == 'number') {
        if (await isPlaceSaved(userId, latitude, longitude)) setSaved(true);
        else setSaved(false);
      }
    };
    isSaved();
  }, [userId, latitude, longitude]);

  return (
    <div className={Styles.mainContainer}>
      <div className={Styles.titleContainer}>
        <div className={Styles.ratingContainer}>
          <h1>
            {title} | {spotRating} <SurfingIcon fontSize="large" />
          </h1>
        </div>
        <div className={Styles.SaveAndDelete}>
          <div className={Styles.saveContainer} onClick={handleSave}>
            {saved ? (
              <i className="bi bi-bookmark-fill"> Remove</i>
            ) : (
              <i className="bi bi-bookmark"> Save</i>
            )}
          </div>
          {adminUser && session ? (
            <SpotDelete
              spotCity={city}
              spotTitle={title}
              longitude={longitude}
              latitude={latitude}
            ></SpotDelete>
          ) : null}
        </div>
      </div>
      <div className={Styles.map}>
        <Map
          city={city}
          country={country}
          title={title}
          longitude={longitude}
          latitude={latitude}
        />
      </div>
      <div className={Styles.twoCardContainer}>
        <div className={Styles.weatherImages}>
          <div className={Styles.weatherData}>
            <div className={Styles.dataGroup}>
              <div className={Styles.waterData}>
                <div>
                  <WaterDropIcon />
                  Water Temperature: {waterTemperatures} °C
                </div>
                <div>
                  <WaterDropIcon />
                  Precipitation: {precipitations} mm/h
                </div>
              </div>
              <div className={Styles.airData}>
                <div>
                  <ThermostatIcon />
                  Temperature: {airTemperatures} °C
                </div>
                <GetDirectionIcon
                  degrees={windDirections[0]}
                  text={"Wind Direction"}
                />
                <div>
                  <AirIcon />
                  Wind Speed:{windSpeeds} m/s
                </div>
              </div>
            </div>
            <div className={Styles.waveData}>
              <div className={Styles.directionData}>
                <GetDirectionIcon
                  degrees={swellDirections[0]}
                  text={"Swell Direction"}
                />
                <GetDirectionIcon
                  degrees={waveDirections[0]}
                  text={"Wave Direction"}
                />
                <GetDirectionIcon
                  degrees={windWaveDirections[0]}
                  text={"Wind Wave Direction"}
                />
              </div>
              <div className={Styles.heights}>
                <div>
                  <HourglassBottomIcon />
                  Wave Period: {wavePeriods}s
                </div>
                <div>
                  <HeightIcon />
                  Wave Height: {waveHeights}m
                </div>
                <div>
                  <HeightIcon />
                  Swell Height: {swellHeights}m
                </div>
              </div>
            </div>
            <div className={Styles.greyContainer}>
              <BootstrapCarouselWithoutArrows
                imageURLS={imageUrls}
              ></BootstrapCarouselWithoutArrows>
              <input
                className={Style.input}
                type="file"
                accept="image/*"
                ref={fileInputRef}
                onChange={async (event) => {
                  const file = event.target.files?.[0];
                  if (!file) return;

                  try {
                    // Upload the file to Uploadcare
                    const uploadedFile = await uploadFile(file, {
                      publicKey: process.env
                        .NEXT_PUBLIC_UPLOADCARE_PUBLIC_KEY as string,
                    });

                    // Construct the file URL
                    const fileUrl = `https://ucarecdn.com/${uploadedFile.uuid}/`;
                    await handleSpotImage(city, title, userEmail, fileUrl);

                    showToast("success", "Image Uploaded Successfully");
                  } catch (err) {
                    console.log(err);
                  }
                }}
              />
              {session ? (
                <button
                  className={Styles.customButton}
                  onClick={() => {
                    fileInputRef.current?.click();
                  }}
                >
                  Upload your experience!
                </button>
              ) : null}
            </div>
          </div>
        </div>
        {/* ${Styles.greyContainer} */}
        <div className={Styles.reviewContainer}>
          <h1>Reviews</h1>
          <div className={` ${Styles.commentsContainer}`}>
            {reviews.map((review: Review, index) => (
              <div key={index} className={Styles.singleReview}>
                <div className={Styles.reviewHeader}>
                  <div className={Styles.reviewTopRow}>
                    {review.username}
                    {username == review.username ? (
                      <RemoveReview reviewId={review.id} />
                    ) : null}
                  </div>{" "}
                  <br />
                  <span className={Styles.reviewRating}>{review.rating}/5</span>
                </div>
                <p className={Styles.reviewText}>{review.description}</p>
                {/* <div className={Styles.reviewFooter}>
                  <span className={Styles.reviewDate}>{review.date}</span>
                </div> */}
              </div>
            ))}
          </div>
          {session ? <ReviewButton title={title} city={city} /> : null}
        </div>
      </div>
    </div>
  );
}
