const imageModel = require("../models/image.model");
const uploadFile = require("./storage.service");
const { v4: uuidv4 } = require("uuid");
const sharp = require("sharp");




async function processAndSaveImage(buffer,file, imageName, operationType, prompt = null) {


const compressed = await sharp(buffer)
  .resize({ width: 1024 })
  .toFormat("jpeg")
  .jpeg({ quality: 70 })
  .toBuffer();
  
 // Upload to ImageKit
    const result = await uploadFile(
     compressed,
      `${uuidv4()}-${file.originalname}`,
    );

    //  Save in DB
    const image = await imageModel.create({
      imageUrl: result.url,
      imageName,
    operationType,
    prompt
    });

    return image
    
}

module.exports = processAndSaveImage;