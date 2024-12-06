"use client";

import { SetStateAction, useEffect, useState } from "react";
import { getWeatherData } from "@/components/place/getWeatherData";
import Styles from "@/components/place/place.module.css";
import * as React from "react";
import WavesIcon from "@mui/icons-material/Waves";
import WaterDropIcon from "@mui/icons-material/WaterDrop";
import ThermostatIcon from "@mui/icons-material/Thermostat";
import AirIcon from "@mui/icons-material/Air";
import WaterIcon from "@mui/icons-material/Water";
import NorthEastIcon from "@mui/icons-material/NorthEast";

import ReviewButton from "../button/review/review";

import HourglassBottomIcon from "@mui/icons-material/HourglassBottom";

import EastIcon from "@mui/icons-material/East";

import WestIcon from "@mui/icons-material/West";

import HeightIcon from "@mui/icons-material/Height";

import Map from "@/components/place/map";

import BootstrapCarouselWithoutArrows from "@/components/place/carousel";

import GetDirectionIcon from "@/components/place/directionArrow";
import { getReviews } from "@/action/review";
import { Review } from "@prisma/client";

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
  const [selectedChart, setSelectedChart] = useState("waterTemperature");
  const [imageUrl, setImageUrl] = useState("/images/defaultProfile.png");

  const [reviews, setReviews] = useState([]);

  const startDate = new Date();
  //*1000 because in milliseconds
  const endDate = new Date(new Date(startDate).getTime() + 24 * 60 * 60 * 1000);

  const start = new Date().toISOString();
  const end = new Date(
    new Date(start).getTime() + 24 * 60 * 60 * 1000
  ).toISOString();

  function getHours() {
    const hours: number[] = [];

    for (
      let currentDate = startDate;
      currentDate < endDate;
      currentDate.setHours(currentDate.getHours() + 1)
    ) {
      const currentHour = currentDate.getHours();

      hours.push(currentHour);
    }
    return hours;
  }

  useEffect(() => {
    const reviews = async () => {
      const data = await getReviews(city, title);

      data.forEach((review) => {
        console.log(`Review: ${review.id}, ${review.description}`);
      });
      setReviews(data);
    };

    const weatherData = async () => {
      const data = await getWeatherData(
        longitude,
        latitude,
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

    void weatherData();
    // void getImageUrl()
    void reviews();
  }, []);

  const handleChartChange = (e: {
    target: { value: SetStateAction<string> };
  }) => {
    setSelectedChart(e.target.value);
  };

  const hourLabels = getHours();

  console.log(latitude, longitude);

  // const reviews = [
  //   {
  //     author: "SurfBrah23",
  //     rating: 4.5,
  //     text: "Awesome waves, perfect for intermediate surfers. Great beach break with consistent swells. Water was clean and the view is incredible.",
  //     date: "2023-11-15",
  //   },
  //   {
  //     author: "OceanRider",
  //     rating: 5,
  //     text: "Absolutely stunning location! The waves were epic and the local surf community is super friendly. Definitely coming back.",
  //     date: "2023-12-02",
  //   },
  //   {
  //     author: "WindChaser",
  //     rating: 3.5,
  //     text: "Decent spot, but can get crowded during peak season. Wind conditions were tricky, but still managed to catch some good rides.",
  //     date: "2024-01-10",
  //   },
  //   {
  //     author: "BeachLover",
  //     rating: 4,
  //     text: "Beautiful scenery, clean beach, and consistent waves. Parking can be a bit challenging, but overall a great surf destination.",
  //     date: "2023-10-25",
  //   },
  //   {
  //     author: "BeachLover",
  //     rating: 4,
  //     text: "Beautiful scenery, clean beach, and consistent waves. Parking can be a bit challenging, but overall a great surf destination.",
  //     date: "2023-10-25",
  //   },
  //   {
  //     author: "BeachLover",
  //     rating: 4,
  //     text: "Beautiful scenery, clean beach, and consistent waves. Parking can be a bit challenging, but overall a great surf destination.",
  //     date: "2023-10-25",
  //   },
  //   {
  //     author: "BeachLover",
  //     rating: 4,
  //     text: "Beautiful scenery, clean beach, and consistent waves. Parking can be a bit challenging, but overall a great surf destination.",
  //     date: "2023-10-25",
  //   },
  //   {
  //     author: "BeachLover",
  //     rating: 4,
  //     text: "Beautiful scenery, clean beach, and consistent waves. Parking can be a bit challenging, but overall a great surf destination.",
  //     date: "2023-10-25",
  //   },
  //   {
  //     author: "BeachLover",
  //     rating: 4,
  //     text: "Beautiful scenery, clean beach, and consistent waves. Parking can be a bit challenging, but overall a great surf destination.",
  //     date: "2023-10-25",
  //   },
  //   {
  //     author: "BeachLover",
  //     rating: 4,
  //     text: "Beautiful scenery, clean beach, and consistent waves. Parking can be a bit challenging, but overall a great surf destination.",
  //     date: "2023-10-25",
  //   },
  //   {
  //     author: "BeachLover",
  //     rating: 4,
  //     text: "Beautiful scenery, clean beach, and consistent waves. Parking can be a bit challenging, but overall a great surf destination.",
  //     date: "2023-10-25",
  //   },
  //   {
  //     author: "BeachLover",
  //     rating: 4,
  //     text: "Beautiful scenery, clean beach, and consistent waves. Parking can be a bit challenging, but overall a great surf destination.",
  //     date: "2023-10-25",
  //   },
  //   {
  //     author: "BeachLover",
  //     rating: 4,
  //     text: "Beautiful scenery, clean beach, and consistent waves. Parking can be a bit challenging, but overall a great surf destination.",
  //     date: "2023-10-25",
  //   },
  //   {
  //     author: "BeachLover",
  //     rating: 4,
  //     text: "Beautiful scenery, clean beach, and consistent waves. Parking can be a bit challenging, but overall a great surf destination.",
  //     date: "2023-10-25",
  //   },
  //   {
  //     author: "BeachLover",
  //     rating: 4,
  //     text: "Beautiful scenery, clean beach, and consistent waves. Parking can be a bit challenging, but overall a great surf destination.",
  //     date: "2023-10-25",
  //   },
  //   {
  //     author: "BeachLover",
  //     rating: 4,
  //     text: "Beautiful scenery, clean beach, and consistent waves. Parking can be a bit challenging, but overall a great surf destination.",
  //     date: "2023-10-25",
  //   },

  //   {
  //     author: "BeachLover",
  //     rating: 4,
  //     text: "Beautiful scenery, clean beach, and consistent waves. Parking can be a bit challenging, but overall a great surf destination.",
  //     date: "2023-10-25",
  //   },
  //   {
  //     author: "SaltySurfer",
  //     rating: 4.5,
  //     text: "Perfect for longboarding. Gentle waves in the morning, more challenging breaks later in the day. Highly recommend for all skill levels.",
  //     date: "2024-02-14",
  //   },
  // ];

  useEffect;

  return (
    <div className={Styles.mainContainer}>
      <div className={Styles.titleContainer}>
        <h1>{title}</h1>
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
            <BootstrapCarouselWithoutArrows></BootstrapCarouselWithoutArrows>
          </div>
        </div>
        {/* ${Styles.greyContainer} */}
        <div className={Styles.reviewContainer}>
          <h1>Reviews</h1>
          <div className={` ${Styles.commentsContainer}`}>
            {reviews.map((review: Review, index) => (
              <div key={index} className={Styles.singleReview}>
                <div className={Styles.reviewHeader}>
                  <span className={Styles.reviewAuthor}>
                    {review.userFirstName}
                  </span>{" "}
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
          <ReviewButton title={title} city={city} />
          {/* <div className={Styles.buttonContainer}>
            
          </div> */}
        </div>
      </div>
    </div>
  );
}
