const { createCanvas, loadImage } = require("canvas");

async function generatePrintLayout(images, rows, cols) {
  const width = 2480;  // A4 width (300 DPI)
  const height = 3508; // A4 height

  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext("2d");

  const cellWidth = width / cols;
  const cellHeight = height / rows;

  for (let i = 0; i < images.length; i++) {
    const img = await loadImage(images[i]);

    // const x = (i % cols) * cellWidth;
    // const y = Math.floor(i / cols) * cellHeight;

    // 👉 agar user totalPhotos de raha hai
if (totalPhotos && !rows && !cols) {
  finalRows = Math.ceil(Math.sqrt(totalPhotos));
  finalCols = Math.ceil(totalPhotos / finalRows);
}   


    ctx.drawImage(img, x, y, cellWidth, cellHeight);
  }

  return canvas.toBuffer("image/png");
}

module.exports = generatePrintLayout;