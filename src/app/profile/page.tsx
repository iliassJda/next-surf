// import { useSession } from "next-auth/react";
// import { getServerSession } from "next-auth";
import ProfilePictureUploader from "@/components/profilePicture/uploadPicture/profilePictureUploader";
export default async function Profile() {
    // const session = await getServerSession();

    return (
        <>
            <ProfilePictureUploader/>
        </>
    );
}
