import cloudinary from "../../config/cloudinary.js";

const uploadTOCloudinary = (buffer,folder) => {
    return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader
            .upload_stream(
                {
                    folder,
                    resource_type:"auto"
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