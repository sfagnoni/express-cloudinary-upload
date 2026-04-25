import { cloudinary } from "../config/cloudinary.js";
import { UploadError } from "../errors/UploadError.js";
import { deleteTempFile } from "../utils/deleteTempFile.js";

export const uploadToCloudinary = async (
    filePath,
    folder = "uploads"
) => {
    if (!filePath) {
        throw new UploadError(
            "No file path received. Make sure multer runs before uploadToCloudinary()."
        );
    }

    try {
        const result = await cloudinary.uploader.upload(filePath, {
            folder
        });

        await deleteTempFile(filePath);

        return {
            url: result.secure_url,
            public_id: result.public_id,
            original_filename: result.original_filename,
            format: result.format
        };
    } catch (error) {
        throw new UploadError(
            `Cloudinary upload failed: ${error.message}`,
            500
        );
    }
};