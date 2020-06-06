var mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/salut1", {
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

function createCountry(countryObj) {
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
    year: 1900,
  },
  {
    name: "franta",
    year: 1901,
  },
  {
    name: "franta",
    year: 1902,
  },
  {
    name: "franta",
    year: 1903,
  },
  {
    name: "franta",
    year: 1904,
  },
  {
    name: "franta",
    year: 1905,
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
];

//testam functiile de create data si de create country, sa vedem daca introduc in baza de date toate datele
//inca nu se face legatura intre tabele dar acest lucru e facut la populate

countryObjects.forEach((country, index) => {
  const newCountry = new Country(country);
  createCountry(newCountry);

});

countryObjects.forEach((data, index) => {
  console.log(dataObjects[index]);
  const newData = new Data(dataObjects[index]);
  createData(newData);
});

// // server
// // handler - country  + db pt alea *
// // handle - data, compare + db
// //  * + serverul -> export
