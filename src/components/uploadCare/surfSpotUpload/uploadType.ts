import { uploadFile } from "@uploadcare/upload-client";
import {doToast, showToast} from "@/components/toast/toast";
import { toast } from "react-toastify";
import error = toast.error;

export async function externalUploader(
  continent: string,
  country: string,
  city: string,
  title: string,
  longitude: number | undefined,
  latitude: number | undefined,
  file: File | null,
  userEmail: string | null | undefined
): Promise<void> {
  if (!file) {
    showToast("error", "please provide an image")
    return;
  }
  try {
    const data = new FormData();
    data.append("continent", continent);
    data.append("country", country);
    data.append("city", city);
    data.append("title", title);
    data.append("longitude", longitude as unknown as string); //will be cast to a string.
    data.append("latitude", latitude as unknown as string); //will be cast to a string.
    data.append("userEmail", userEmail as unknown as string);

    const uploadRequest = await fetch("/api/uploadCare/uploadSurfSpot", {
      method: "POST",
      body: data,
    });

    const response = await uploadRequest.json();

    const postID = response.postMessage;
    if (postID >= 0) {

      //upload file to uploadcare.
      const uploadedFile = await uploadFile(file, {
        publicKey: process.env.NEXT_PUBLIC_UPLOADCARE_PUBLIC_KEY as string,
      });
      const newData = new FormData();

      // Construct the file URL
      const fileUrl = `https://ucarecdn.com/${uploadedFile.uuid}/`;
      newData.append("fileUrl", fileUrl);
      newData.append("postsID", postID);

      await fetch("/api/uploadCare/updateSurfSpot", {
        method: "POST",
        body: newData,
      });

      doToast({ toast: "success", message: "Surf spot uploaded successfully" });
    } else {
      throw error;
    }
  } catch (err) {
    doToast({ toast: "error", message: "Surf spot didn't upload" });
  } finally {
  }
}
