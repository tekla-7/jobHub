import cloudinary from "../../config/cloudinary.js";

const uploadTOCloudinary = (buffer) => {
    return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader
            .upload_stream(
                {
                    folder: 'companies',
                },
                (err, result) => {
                    if (err) return reject(err);
                    resolve(result);
                }
            )
        stream.end(buffer)
    })
}
export default uploadTOCloudinary;