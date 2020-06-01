var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/obis", {
///obis este numele bazei de date pe care noi o accesam
  useNewUrlParser: true,//To use the new parser, pass option
  useUnifiedTopology: true,// open a connection to the test database on our locally running instance of MongoDB
});

var db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {//We now need to get notified if we connect successfully or if a connection error occurs:
  console.log("connected successfully to database");
});




var fs = require("fs");

function length(obj) {
    return Object.keys(obj).length;
}


//function createCountry(countryObj)
//function getCountries

fs.readFile("./tari.json", 'utf-8', (err, data) => {


    const countries = JSON.parse(data);
    var winner = 0;
    var which = 0;

    for (i in countries) {
        console.log(countries[i].country)
        if (countries[i].yearGrowth > winner) {
            winner = countries[i].yearGrowth;
            which = i;
        }


    }

    console.log("Tara " + countries[which].country + " are cea mai mare crestere de obezitate " + `${winner}`);
    //some countries to compare
});