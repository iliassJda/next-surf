"use client";
import Spot from "@/components/place/placePage";
import React from "react";
import { useSession } from "next-auth/react";
import FloatingActionButton from "@/components/floatingButtons/floatingActionButton/floatAction";

export default function PlacePage({
                                      params,
                                  }: {
    params: { country: string; city: string; title: string; longitude: number; latitude: number };
}) {
    const { data: session } = useSession();

    return (
        <div>
            <Spot
                country={params.country}
                city={params.city}
                title={params.title}
                longitude={params.longitude}
                latitude={params.latitude}
            />
            {session && <FloatingActionButton />}
        </div>
    );
}
