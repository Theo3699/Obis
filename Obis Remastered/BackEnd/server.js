const http = require("http");

const hostname = "127.0.0.1";
const port = 3000;

http
    .createServer((req, res) => {
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        const headers = {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
            "Access-Control-Max-Age": 86400,
            "Content-Type": "application/json"
        };
        res.writeHead(200, headers);
        res.end("Hello from server!");


    }).listen(port, hostname, () => {
        console.log(`Server running at http://${hostname}:3000`);
    })