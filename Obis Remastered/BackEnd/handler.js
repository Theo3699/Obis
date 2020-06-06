const db = require("./db");
const url = require("url");
const converter = require("json-2-csv");
const fs = require("fs");
module.exports = (req, body) => {
    const pathname = url.parse(req.url).pathname;
  
    if (pathname === "/data/country") {
      return handleCountry(req, body);
    }
  
    if (pathname === "/data") {
      return handleData(req, body);
    }

    if (pathname.startsWith("/csv")) {
      return handleCsv(req, body);
    }
  };
  
  function handleCountry(req, body) {
    if (req.method === "GET") {
      return db.getCountries();
    }
    if (req.method === "POST") {
      return db.createCountry(body);
    }
  }
  
  function handleData(req, body) {
    if (req.method === "GET") {
      return db.getData(body);
    }
    if (req.method === "POST") {
      return db.createData(body);
    }
  }


function handleCsv(req, body) {
    const pathname = url.parse(req.url).pathname;

    const options = {
        keys : [
            "name",
            "year",
            "yearGrowth",
            "maleGrowth",
            "femaleGrowth",
            "curePercentage",
        ]
    };

    if (pathname === "csv/data") {
        return new Promise((resolve) => {
            db.getData(body).then((obj) => {
                converter.json2.csv(
                    obj, (err, csv) => {
                        if (err) {
                            console.log(err);
                        }

                        false.writeFile("./csv/data.csv", csv, (err) => {
                            if (err) {
                                resolve("error in writing");
                                throw err;
                            }

                            resolve("updated file");
                        });
                    },
                    options
                );
            });
        });
    }
}