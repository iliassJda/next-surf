import {uploadFile} from "@uploadcare/upload-client";
import {showToast} from "@/components/toast/toast";

export async function externalUploader(country: string, city:string, longitude: number, latitude: number,file: File | null, userEmail: string): Promise<void> {
    if (!file) return;

    try {
        // Upload the file to Uploadcare
        const uploadedFile = await uploadFile(
            file,
            {
                publicKey: process.env.NEXT_PUBLIC_UPLOADCARE_PUBLIC_KEY as string,
            }
        );

        // Construct the file URL
        const fileUrl = `https://ucarecdn.com/${uploadedFile.uuid}/`;

        const data = new FormData();
        data.append("country", country);
        data.append("city", city);
        data.append("longitude", longitude); //will be cast to a string.
        data.append("latitude", latitude); //will be cast to a string.
        data.append("surfSpotURL", fileUrl);
        data.append("userEmail", userEmail);


        const uploadRequest = await fetch("/api/uploadCare/uploadSurfSpot", {
            method: "POST",
            body: data,
        })

        showToast("success", "Image Uploaded Successfully");
        console.log(fileUrl);

    } catch (err) {
        showToast("error", "Image didn't upload");
    } finally {
    }
}
