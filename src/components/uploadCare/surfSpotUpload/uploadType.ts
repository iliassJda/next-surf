import {uploadFile} from "@uploadcare/upload-client";
import {showToast} from "@/components/toast/toast";

export async function externalUploader(country: string, city: string, title: string, longitude: number | undefined, latitude: number | undefined, file: File | null, userEmail: string | undefined): Promise<void> {
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
        data.append("title", title);
        data.append("longitude", longitude as unknown as string); //will be cast to a string.
        data.append("latitude", latitude as unknown as string); //will be cast to a string.
        data.append("surfSpotURL", fileUrl);
        data.append("userEmail", userEmail as unknown as string);


        const uploadRequest = await fetch("/api/uploadCare/uploadSurfSpot", {
            method: "POST",
            body: data,
        })

        showToast("success", "Surf spot uploaded successfully");
        console.log(fileUrl);

    } catch (err) {
        showToast("error", "Surf spot didn't upload");
    } finally {
    }
}
