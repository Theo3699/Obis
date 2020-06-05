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
