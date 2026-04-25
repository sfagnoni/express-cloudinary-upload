import multer from "multer";
import { UploadError } from "../errors/UploadError.js";

const storage = multer.diskStorage({});

const upload = multer({
    storage,
    limits: {
        fileSize: 5 * 1024 * 1024
    }
});

export const singleUpload = (fieldName) => {
    if (!fieldName) {
        throw new UploadError(
            "You must provide a field name for singleUpload()."
        );
    }

    return upload.single(fieldName);
};

export const multipleUpload = (fieldName, maxCount = 5) => {
    if (!fieldName) {
        throw new UploadError(
            "You must provide a field name for multipleUpload()."
        );
    }

    return upload.array(fieldName, maxCount);
};