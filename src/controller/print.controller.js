const generatePrintLayout = require("../services/printLayout.service");
const processAndSaveImage = require("../services/imageProcessor.service");

exports.printLayoutController = async (req, res) => {
  try {
    const { imageName, rows, cols } = req.body;

    const files = req.files;

    if (!files || files.length === 0) {
      return res.status(400).json({ message: "No images uploaded" });
    }

    // convert buffer → array
    const imageBuffers = files.map(file => file.buffer);

    //  STEP 1: generate layout
    const finalImage = await    (imageBuffers, rows, cols);

    //  STEP 2: save
    const image = await processAndSaveImage(
      finalImage,
      files[0],
      imageName,
      "print-layout"
    );

    res.status(201).json({
      message: "Print layout created",
      image
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};