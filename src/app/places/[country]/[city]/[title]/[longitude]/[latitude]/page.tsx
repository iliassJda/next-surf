"use client";
import Spot from "@/components/place/placePage";
import React from "react";
import { useSession } from "next-auth/react";
import FloatingActionButton from "@/components/floatingButtons/floatingActionButton/floatAction";

interface PlacePageProps {
    params: {
        country: string;
        city: string;
        title: string;
        longitude: string;
        latitude: string;
    };
}

export default function PlacePage({ params }: PlacePageProps) {
    const { data: session } = useSession();
    return (
        <div>
            <Spot
                country={params.country}
                city={params.city}
                title={params.title}
                longitude={parseFloat(params.longitude)}
                latitude={parseFloat(params.latitude)}
            />
            {session && <FloatingActionButton />}
        </div>
    );
}
