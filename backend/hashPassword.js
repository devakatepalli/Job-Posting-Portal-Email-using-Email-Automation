const bcrypt = require('bcrypt');

(async () => {
    const password = "testPassword123"; // The plain text password
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log(hashedPassword);
})();

