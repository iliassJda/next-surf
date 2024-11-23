"use client"
import { CldUploadButton } from 'next-cloudinary';

export default function uploadCloudinary() {
    return(
        <div>
            <CldUploadButton uploadPreset="<Upload Preset>" />
        </div>
    )
}



/*
import React, { useState, useRef } from 'react';
import Button2 from "@/components/materialUIButtons/button2"

interface ImageUploadProps {
    userId: number;
    onUploadSuccess?: (imageUrl: string) => void;
}

const ImageUploadButton: React.FC<ImageUploadProps> = ({userId, onUploadSuccess}) => {
    const [isUploading, setIsUploading] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        // Validate file type and size
        const validTypes = ['image/jpeg', 'image/png', 'image/webp'];
        const maxSize = 5 * 1024 * 1024; // 5MB

        if (!validTypes.includes(file.type)) {
            console.error("file type not supported");
            return;
        }

        if (file.size > maxSize) {
            console.error("file too large");
            return;
        }

        // Prepare form data for upload
        const formData = new FormData();
        formData.append('file', file);

        try {
            setIsUploading(true);

            const response = await fetch('../../api/cloudinary', {
                method: 'POST',
                body: formData
            });

            const result = await response.json();

            if (result.success) {
                console.log("Successfully uploaded");

            } else {
                throw new Error(result.error || 'Upload failed');
            }
        } catch (error) {
            console.error("not uploaded");
        } finally {
            setIsUploading(false);

            // Reset file input
            if (fileInputRef.current) {
                fileInputRef.current.value = '';
            }
        }
    };

    const triggerFileInput = () => {
        fileInputRef.current?.click();
    };

    return (
        <div className="flex items-center space-x-2">
            <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileUpload}
                accept="image/jpeg,image/png,image/webp"
                className="hidden"
            />
            <Button2
                title="upload"
                onClick={() => triggerFileInput()}
            >
                {isUploading ? 'Uploading...' : 'Upload Profile Picture'}
            </Button2>
        </div>
    );
};

export default ImageUploadButton;

*/
