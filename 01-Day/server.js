const http = require("http");

const server = http.createServer((req, res) => {
  if (req.url === "/") {
    res.end("Hy i am server");
  }

  if (req.url === "/page1") {
    res.end("i am page 1");
  }

  if (req.url === "/page2") {
    res.end("i am page 2");
  }
});

server.listen(3000, () => {
  console.log("Server is running");
});
