const http = require("http");
const fs = require("fs");
const url = require("url");

const hostname = "127.0.0.1";
const port = 3000;
const handle = require("./handler");

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
//        res.end("Hello from server!");

        let dataObject = [];
        if (url.parse(req.url).pathname.startsWith("/download")){
            const urlPath = url.parse(req.url).pathname;
            if (urlPath === "/download/csv/data") {
                const filePath = "./csv/data.csv";

                fs.readFile(filePath, (err, content) => {
                    if (err) {
                        throw err;
                    }
                    res.end(content);
                });
            }
        }
        else {
            req.on("error", (err) => {
                console.error(err);
            })
            .on("data", (chunk) => {
                dataObject.push(chunk);
            })
            .on("end", () => {
                //body
                dataObject = Buffer.concat(dataObject).toString();
                if (dataObject) {
                    dataObject = JSON.parse(dataObject);
                }
                else {
                    //query string object
                    dataObject = url.parse(req.url, true).query;
                }
                console.log(dataObject);

                handle(req, dataObject).then((doc) => {
                    responseObject = JSON.stringify(doc);

                    res.end(responseObject);
                });
            });
        }


    }).listen(port, hostname, () => {
        console.log(`Server running at http://${hostname}:3000`);
    })