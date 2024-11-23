

import {useRef, useState} from "react";
import Button2 from "@/components/materialUIButtons/button2";
import Style from "./upload.module.css"
import {showToast} from "@/components/toast/toast";


export default function Home() {
    const [uploading, setUploading] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    return (
        <div>
            <input
                className={Style.input}
                type="file"
                accept="image/*"
                ref={fileInputRef}
                onChange={async (e) => {
                    const file = e.target.files?.[0] as File;
                    const data = new FormData();
                    data.set("file", file);
                    try {
                        const uploadRequest = await fetch("/api/pinata", {
                            method: "POST",
                            body: data,
                        })
                        showToast("success", "Image Uploaded Successfully");
                    } catch (e) {
                        console.log(e);
                    }

                }}
            />

            <Button2 title="upload"
                     disabled={uploading}
                     onClick={()=> {
                         fileInputRef.current?.click();
                    }} >
            </Button2>
        </div>
    );
}
