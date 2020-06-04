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

var dataSchema = new mongoose.Schema({
    yearGrowth: Number,
    maleGrowth: Number,
    femaleGrowth: Number,
    curePercentage: Number,
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Country",
    },
});
var Data = mongoose.model("Data", dataSchema);

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

const dataObjects = [
    {
        yearGrowth: 0,
        maleGrowth: 1,
        curePercentage: 1,
        femaleGrowth: 2,
    },
    {
        yearGrowth: 112,
        maleGrowth: 3,
        curePercentage: 10,
        femaleGrowth: 2,
    },
    {
        yearGrowth: 0123,
        maleGrowth: 199,
        curePercentage: 188,
        femaleGrowth: 26,
    },
    {
        yearGrowth: 023,
        maleGrowth: 123,
        curePercentage: 123,
        femaleGrowth: 26,
    },
    {
        yearGrowth: 1,
        maleGrowth: 1,
        curePercentage: 13,
        femaleGrowth: 24,
    },
    {
        yearGrowth: 1,
        maleGrowth: 1,
        curePercentage: 1432,
        femaleGrowth: 24,
    },
    {
        yearGrowth: 0,
        maleGrowth: 1,
        curePercentage: 1,
        femaleGrowth: 2,
    },
    {
        yearGrowth: 112,
        maleGrowth: 3,
        curePercentage: 10,
        femaleGrowth: 2,
    },
    {
        yearGrowth: 0123,
        maleGrowth: 199,
        curePercentage: 188,
        femaleGrowth: 26,
    },
    {
        yearGrowth: 023,
        maleGrowth: 123,
        curePercentage: 123,
        femaleGrowth: 26,
    },
    {
        yearGrowth: 1,
        maleGrowth: 1,
        curePercentage: 13,
        femaleGrowth: 24,
    },
    {
        yearGrowth: 1,
        maleGrowth: 1,
        curePercentage: 1432,
        femaleGrowth: 24,
    },
];

countryObjects.forEach((country, index) => {
    const newCountry = new Country(country);
    newCountry.save().then((doc) => {
        const newData = new Data(dataObjects[index]);

        newData["_id"] = doc._id;
        newData.save();
    });
});

