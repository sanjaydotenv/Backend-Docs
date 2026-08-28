require("dotenv").config();
const server = require("./src/app");

server.listen(process.env.PORT || 5000 , () => {
    console.log(`Server is running on port ${process.env.PORT}`)
});
