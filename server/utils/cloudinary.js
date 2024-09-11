const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

const uploadFileToCloudinary = async (file) => {
  try {
    const data = await cloudinary.uploader.upload(file, {
      resource_type: "auto",
    });
    return data;
  } catch {
    console.log("error uploading to cloudinary");
  }
};

const deleteFileFromCloudinary = async (publicId) => {
  try {
    const data = await cloudinary.uploader.destroy(publicId);
    return data;
  } catch {
    console.log("error deleting from cloudinary");
  }
};

module.exports = { uploadFileToCloudinary, deleteFileFromCloudinary };
