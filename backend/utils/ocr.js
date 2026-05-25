const Tesseract = require("tesseract.js");
const sharp = require("sharp");
const path = require("path");

const extractTextFromIdCard = async (filePath) => {
  try {
    // Preprocess image for better OCR
    const processedPath = filePath.replace(
      path.extname(filePath),
      "_processed.png"
    );

    await sharp(filePath)
      .resize({ width: 1200 })
      .grayscale()
      .normalize()
      .toFile(processedPath);

    const result = await Tesseract.recognize(processedPath, "eng", {
      logger: (m) => console.log(m.status),
    });

    return result.data.text.toLowerCase();

  } catch (error) {
    throw new Error("OCR failed");
  }
};

module.exports = extractTextFromIdCard;
