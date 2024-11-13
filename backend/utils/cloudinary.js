const cloudinary = require("cloudinary").v2;
const fs = require('fs');
require('dotenv').config();

cloudinary.config({
    cloud_name: `${process.env.CLOUDINARY_CLOUD_NAME}`,
    api_key: `${process.env.CLOUDINARY_API_KEY}`,
    api_secret: `${process.env.CLOUDINARY_API_SECRET}`
});

const uploadOnCloudinary = async (localFilePath) => {
    console.log("localFilePath:", localFilePath)
    try {
        if (!localFilePath) throw new Error('No file path provided.');

        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto",
        });

        console.log(`File uploaded successfully on Cloudinary with URL: ${response.secure_url}`);
        // fs.unlinkSync(localFilePath); 

        return response;
    } catch (error) {
        console.error('Error uploading to Cloudinary:', error);
        
        if (fs.existsSync(localFilePath)) {
            fs.unlinkSync(localFilePath);
        }

        return null;
    }
};

module.exports = uploadOnCloudinary;