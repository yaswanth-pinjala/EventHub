const verifyStudentFromId = (ocrText, studentData) => {
  const { name, regNo, department, academicYear } = studentData;

  const clean = (str = "") =>
    str.toString().replace(/\s+/g, " ").trim().toLowerCase();

  const text = clean(ocrText);

  /* -------- Extract values from OCR text -------- */

  // extract department after "b.tech:"
  const deptMatchExtract = text.match(/b\.?tech[:\s]*([a-z&]+)/i);
  const extractedDept = deptMatchExtract ? deptMatchExtract[1] : "";

  // extract batch
  const batchMatchExtract = text.match(/batch[:\s]*([\d-]+)/i);
  const extractedBatch = batchMatchExtract ? batchMatchExtract[1] : "";

  // extract reg number
  const regMatchExtract = text.match(/[yl]\d{2}[a-z]{3}\d{3}/i);
  const extractedReg = regMatchExtract ? regMatchExtract[0] : "";

  /* -------- Exact comparison -------- */

  const nameMatch =
    clean(name)
      .split(" ")
      .filter((word) => text.includes(word)).length >= 2;  // name can remain includes
  const regMatch = clean(extractedReg) === clean(regNo);
  const deptMatch = clean(extractedDept) === clean(department);
  const batchMatch = clean(extractedBatch) === clean(academicYear);

  console.log("Extracted:", {
    extractedDept,
    extractedBatch,
    extractedReg,
  });

  console.log("Matches:", {
    nameMatch,
    regMatch,
    deptMatch,
    batchMatch,
  });

  return nameMatch && regMatch && deptMatch && batchMatch;
};

module.exports = verifyStudentFromId;
