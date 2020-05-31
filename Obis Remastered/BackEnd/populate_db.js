var mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/obis", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

var db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
    console.log("connected successfully to database");
});

var countrySchema = new mongoose.Schema({
    name: String,
    year: Number,
}).index(
    {
        name: 1,
        year: 1,
    },
    {
        unique: true,
    }
);
var Country = mongoose.model("Country", countrySchema);

const countryObjects = [
    {
        name: "franta",
        year: 2020,
    },
    {
        name: "franta",
        year: 2019,
    },
    {
        name: "franta",
        year: 2018,
    },
    {
        name: "franta",
        year: 2017,
    },
    {
        name: "franta",
        year: 2016,
    },
    {
        name: "franta",
        year: 2015,
    },
    {
        name: "romania",
        year: 2020,
    },
    {
        name: "romania",
        year: 2019,
    },
    {
        name: "romania",
        year: 2018,
    },
    {
        name: "romania",
        year: 2017,
    },
    {
        name: "romania",
        year: 2016,
    },
    {
        name: "romania",
        year: 2015,
    },
];

countryObjects.forEach((country) => {
    const newCountry = new Country(country);
    newCountry.save();
});