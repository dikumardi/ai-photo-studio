const axios = require("axios");

async function changeOutfit(imageBuffer, prompt) {
  try {
    const response = await axios({
      method: "post",
      url: "https://clipdrop-api.co/image-editor/v1",
      data: {
        image_file_b64: imageBuffer.toString("base64"),
        prompt: prompt // 👈 main magic
      },
      headers: {
        "x-api-key": process.env.CLIPDROP_API_KEY,
      },
      responseType: "arraybuffer",
    });

    return response.data;
  } catch (error) {
    console.log("Outfit Change Error:", error.message);
    throw new Error("Outfit change failed");
  }
}

module.exports = changeOutfit;