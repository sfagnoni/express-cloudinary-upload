export class UploadError extends Error {
    constructor(message, statusCode = 400) {
        super(message);
        this.name = "UploadError";
        this.statusCode = statusCode;
    }
}