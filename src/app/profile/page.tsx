// import { useSession } from "next-auth/react";
// import { getServerSession } from "next-auth";
import Uploader from "@/components/uploadCare/profilePictureUpload/uploader";

export default async function Profile() {
    // const session = await getServerSession();

    return (
        <>
            <Uploader/>
        </>
    );
}
