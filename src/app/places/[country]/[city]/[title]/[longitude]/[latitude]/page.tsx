"use client";
import Spot from "@/components/place/placePage";
import React, { use, useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import FloatingActionButton from "@/components/floatingButtons/floatingActionButton/floatAction";

export default function PlacePage({
  params,
}: {
  params: {
    country: string;
    city: string;
    title: string;
    longitude: number;
    latitude: number;
  };
}) {
  const [country, setCountry] = useState<string>();
  const [city, setCity] = useState<string>();
  const [title, setTitle] = useState<string>();
  const [latitude, setLatitude] = useState<number>();
  const [longitude, setLongitude] = useState<number>();
  useEffect(() => {
    const getParams = async () => {
      const resolvedParams = await Promise.resolve(params);
      setCountry(decodeURI(resolvedParams.country));
      setCity(decodeURI(resolvedParams.city));
      setTitle(decodeURI(resolvedParams.title));
      setLatitude(resolvedParams.latitude);
      setLongitude(resolvedParams.longitude);
    };
    void getParams();
  }, []);
  const { data: session, status } = useSession();
  return (
    <div>
      {city && country && title && longitude && latitude ? (
        <Spot
          country={country}
          city={city}
          title={title}
          longitude={longitude}
          latitude={latitude}
        />
      ) : null}
      {session ? <FloatingActionButton /> : null}
    </div>
  );
}
