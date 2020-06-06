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


/*function createCountry(countryObj) {
    return new Promise((resolve) => {
      if (!isValidCountry(countryObj)) {
        resolve("error");
      } else {
        const newCountry = new Country(countryObj);
        newCountry
          .save()
          .then((doc) => {//we get acces to the document that we just saved in our DB
            resolve(doc);
          })
          .catch((err) => {//daca este vreo eroare in salvarea in baza de date, o "prindem"
            resolve(err);
          });
      }
    });
  }
  
  function createData(data) {
    return new Promise((resolve) => {
      if (!isValidData(data)) {
        resolve("error");//datele date nu sunt valide
      } else {
        const newData = new Data({
          yearGrowth: data.yearGrowth,
          maleGrowth: data.maleGrowth,
          curePercentage: data.curePercentage,
          femaleGrowth: data.femaleGrowth,
          _id: data.id,
        });
        newData
          .save()
          .then((doc) => {
            resolve(doc);//the response
          })
          .catch((err) => {//any error that shows up
            resolve(err.message);
          });
      }
    });
  }
  */
  function getCountries() {
    return Country.find();//returnam toate tarile din baza de date
  }
  
  function isValidCountry(country) {
    if (country.name === undefined) {
      return false;//testam numele
    }
    if (country.year === undefined) {
      return false;//testam anul
    }
  
    return true;
  }
  
  
  function isValidData(data) {
    console.log(data);
  
    if (data.yearGrowth === undefined) {
      return false;
    }
  
    if (data.maleGrowth === undefined) {
      return false;
    }
  
    if (data.femaleGrowth === undefined) {
      return false;
    }
  
    if (data.curePercentage === undefined) {
      return false;
    }
    return true;
  }







const countryObjects = [
    {
        name: "alabama",
        year: 2018,
    },
    {
        name: "alabama",
        year: 2017,
    },
    {
        name: "alabama",
        year: 2016,
    },
    {
        name: "alabama",
        year: 2015,
    },
    {
        name: "alabama",
        year: 2014,
    },
    {
        name: "alaska",
        year: 2018,
    },
    {
        name: "alaska",
        year: 2017,
    },
    {
        name: "alaska",
        year: 2016,
    },
    {
        name: "alaska",
        year: 2015,
    },
    {
        name: "alaska",
        year: 2014,
    },
];

const dataObjects = [
    {
        yearGrowth: -0.7,
        maleGrowth: -0.5,
        curePercentage: 0.7,
        femaleGrowth: 0.4,
        //2018
    },
    {
        yearGrowth: 1.5,
        maleGrowth: -1.1,
        curePercentage: 0,
        femaleGrowth: 2.2,
        //2017
    },
    {
        yearGrowth: 0.3,
        maleGrowth: 1.3,
        curePercentage: 0,
        femaleGrowth: -1.2,
        //2016
    },
    {
        yearGrowth: 0.3,
        maleGrowth: 0.8,
        curePercentage: 0,
        femaleGrowth: 3.5,
        //2015
    },
    {
        yearGrowth: 0.6,
        maleGrowth: 3.2,
        curePercentage: 0,
        femaleGrowth: -1.6,
        //2014 Alabama
    },
    {
        yearGrowth: -4.7,
        maleGrowth: -2.2,
        curePercentage: 1432,
        femaleGrowth: -7.6,
        //2018 Alaska
    },
    {
        yearGrowth: 2.8,
        maleGrowth: 0.3,
        curePercentage: 1,
        femaleGrowth: 5.8,
        //2017 Alaska
    },
    {
        yearGrowth: 1.6,
        maleGrowth: 3,
        curePercentage: 10,
        femaleGrowth: -0.2,
        //2016 Alaska
    },
    {
        yearGrowth: 0.1,
        maleGrowth: 0,
        curePercentage: 188,
        femaleGrowth: 0.3,
        //2015 Alaska
    },
    {
        yearGrowth: 1.3,
        maleGrowth: 0.1,
        curePercentage: 123,
        femaleGrowth: 2.7,
        //2014 Alaska
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
