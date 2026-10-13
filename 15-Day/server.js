const server = require("./src/app");



server.listen(config.PORT, () => {
  console.log(`Server is running on port ${config.PORT}`);
});
