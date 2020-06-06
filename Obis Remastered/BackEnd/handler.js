const db = require("./db");

//firstId=${country1}&secondId=${country2}&criterias=${criteria}
function handleCompare(req, body) {
    if (req.method === "GET") {
        console.log("facem compare"); // to be deleted

        return db.compare(body);
    }
}



function handleCsv(req, body) {
    const pathname = url.parse(req.url).pathname;

    const options = {
        keys: [
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