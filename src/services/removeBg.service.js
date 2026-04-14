const axios = require("axios");

async function removeBackground(buffer) {
  try {
    console.log("Buffer received:", buffer ? "YES" : "NO");

    const response = await axios({
      method: "post",
      url: "https://api.remove.bg/v1.0/removebg",
      headers: {
        "X-Api-Key": process.env.REMOVE_BG_API_KEY,
      },
      data: {
        image_file_b64: buffer.toString("base64"),
        size: "auto",
      },
      responseType: "arraybuffer",
    });

    console.log("Background removed successfully");

    return response.data; 

  } catch (error) {
    console.log("Remove BG Error:", error.message);
    throw new Error("Background removal failed");
  }
}

module.exports = removeBackground;