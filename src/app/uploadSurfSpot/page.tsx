"use client"

// import { useSession } from "next-auth/react";
// import { getServerSession } from "next-auth";
import dynamic from 'next/dynamic'

const Mapbox = dynamic(() => import("@/components/map/mapbox"), {
    ssr: false
});

export default function Test() {
    // const session = await getServerSession();

    return (
        <>
            <Mapbox/>
        </>
    );
}
