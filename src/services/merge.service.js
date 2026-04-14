const sharp = require("sharp");

async function mergeImages(foregroundBuffer, backgroundBuffer) {
  try {
    // Step 1: Get foreground size
    const fgMeta = await sharp(foregroundBuffer).metadata();

    // Step 2: Resize background to match foreground
    const resizedBg = await sharp(backgroundBuffer)
      .resize(fgMeta.width, fgMeta.height)
      .toBuffer();

    // Step 3: Merge (overlay foreground on background)
    const finalImage = await sharp(resizedBg)
      .composite([
        {
          input: foregroundBuffer,
          gravity: "center",
        },
      ])
      .png()
      .toBuffer();

    console.log("Merge successful");

    return finalImage;

  } catch (error) {
    console.log("Merge Error:", error.message);
    throw new Error("Image merge failed");
  }
}

module.exports = mergeImages;