const ImageKit = require("@imagekit/nodejs");

const imagekitClient = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT
});

async function uploadFile(file, filename) {
  const response = await imagekitClient.files.upload({
    file,
    fileName: filename,
    folder:'ai-photo-studio'
  });

  return response;
}

module.exports = uploadFile;