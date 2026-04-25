import { v2 as cloudinary } from "cloudinary";
import { UploadError } from "../errors/UploadError.js";

export const initCloudinary = ({
    cloud_name,
    api_key,
    api_secret
}) => {
    if (!cloud_name || !api_key || !api_secret) {
        throw new UploadError(
            "Cloudinary configuration is incomplete. Please provide cloud_name, api_key and api_secret.",
            500
        );
    }

    cloudinary.config({
        cloud_name,
        api_key,
        api_secret
    });
};

export { cloudinary };