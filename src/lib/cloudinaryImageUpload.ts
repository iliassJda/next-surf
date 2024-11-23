const cloudinary = require("cloudinary").v2;

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
});

export default function uploadImage(imageUploaded: string | Buffer) {
    return new Promise((resolve, reject) => {
        cloudinary.uploader.upload(
            imageUploaded,
            { width: 500, height: 500, crop: "fill" },
            (err: Error, res: Response) => {
                if (err) reject(err);
                resolve(res);
            }
        );
    });
}
