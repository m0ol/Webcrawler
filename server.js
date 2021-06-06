var http = require("http");
const api = require("./api");

http
  .createServer(console.log("Servidor Ligado"), api.handleRequest)
  .listen(8080);
