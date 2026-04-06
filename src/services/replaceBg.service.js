const  axios  = require("axios");


async function replaceBackground(imageBuffer,prompt) {
 try {
    const response =  await axios({
        method:'post',
        url:"https://clipdrop-api.co/replace-background/v1",
       data: {
  image_file_b64: imageBuffer.toString('base64'),
  prompt: prompt
},
        headers:{
            'x-api-key': process.env.CLIPDROP_API_KEY,
        },
        responseType: "arraybuffer",
    })
    return response.data
    
 } catch (error) {
    console.log("Replace BG Error:", error.message);
    throw new Error("Background replace failed");
 }
}
module.exports = replaceBackground;