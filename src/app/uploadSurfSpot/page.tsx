// import { useSession } from "next-auth/react";
// import { getServerSession } from "next-auth";
import Mapbox from "@/components/map/mapbox";

export default async function Test() {
    // const session = await getServerSession();

    return (
        <>
            <Mapbox/>
        </>
    );
}
