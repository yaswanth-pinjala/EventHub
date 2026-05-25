const Tesseract = require("tesseract.js");

const extractTextFromId = async (filePath) => {
  try {
    const result = await Tesseract.recognize(
      filePath,
      "eng",
      {
        logger: m => console.log(m.status)
      }
    );

    return result.data.text.toLowerCase();

  } catch (err) {
    console.error("OCR ERROR:", err);
    return "";
  }
};

module.exports = extractTextFromId;