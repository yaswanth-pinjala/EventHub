const verifyStudentFromId = (ocrText, studentData) => {
  const { name, regNo, department } = studentData;

  const clean = (str) =>
    str.replace(/\s+/g, " ").trim().toLowerCase();

  const text = clean(ocrText);

  return (
    text.includes(clean(name)) &&
    text.includes(clean(regNo)) &&
    text.includes(clean(department))
  );
};

module.exports = verifyStudentFromId;
