const clean = (str = "") =>
  str.toString().replace(/\s+/g, " ").trim().toLowerCase();

const verifyStaffFromId = (
  ocrText,
  { name, staffId, department, designation }
) => {
  const text = clean(ocrText);

  /* ⭐ NAME STRONG MATCH */
  const nameMatch =
    clean(name)
      .split(" ")
      .filter(word => text.includes(word)).length >= 2;

  /* ⭐ DEPARTMENT SMART MATCH */
  const deptMatch = department
    ? text.includes(clean(department))
    : true;

  /* ⭐ DESIGNATION SMART MATCH */
  const designationMatch = designation
    ? text.includes(clean(designation))
    : true;

  /* ⭐ STAFF ID OPTIONAL */
  let idMatch = true;

if (staffId && staffId.trim() !== "") {
  if (text.includes(clean(staffId))) {
    idMatch = true;
  } else {
    console.log("⚠ Staff ID not detected in OCR → Ignoring (optional)");
    idMatch = true;   // ⭐ always allow
  }
}

  console.log("OCR TEXT =", text);

  console.log("STAFF Matches:", {
    nameMatch,
    deptMatch,
    designationMatch,
    idMatch
  });

  return nameMatch && deptMatch && designationMatch && idMatch;
};

module.exports = verifyStaffFromId;