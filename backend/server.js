const app = require("./src/app");
const { checkDBConnection } = require("./src/config/db");

// Check DB connection before server start
checkDBConnection();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on PORT:${PORT}`);
});
