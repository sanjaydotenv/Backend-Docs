const server = require("./src/app/app.js");
const _config = require("./src/config/config.js")
const connectToDB = require("./src/config/db.js")


connectToDB()

server.listen(_config.PORT, () => {
  console.log(`Server is running on port ${_config.PORT}`);
});
