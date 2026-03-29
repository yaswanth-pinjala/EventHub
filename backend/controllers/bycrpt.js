const bcrypt = require("bcryptjs");

bcrypt.hash("project123", 10).then(hash => {
  console.log(hash);
});
