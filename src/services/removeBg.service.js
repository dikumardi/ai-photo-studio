const axios = require('axios');

async function removeBackground(imageBuffer) {
  const response = await axios({
    method: 'post',
    url: 'https://api.remove.bg/v1.0/removebg',
    data: {
      image_file_b64: imageBuffer.toString('base64'),
      size: 'auto'
    },
    headers: {
      'X-Api-Key': process.env.REMOVE_BG_API_KEY
    },
    responseType: 'arraybuffer'
  });

  return response.data;
}

module.exports = removeBackground;