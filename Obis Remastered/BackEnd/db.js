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

//creem schema 
var countrySchema = new mongoose.Schema({
  name: String,
  year: Number,
}).index({//creeaza un index compus pentru aceasta schema 
  name: 1,
  year: 1
}, {
  unique: true//acesta trebuie sa fie unic, neputand avea doua tari cuacelasi nume si acelasi an
});
var Country = mongoose.model("Country", countrySchema);


var dataSchema = new mongoose.Schema({
  yearGrowth: Number,
  maleGrowth: Number,
  femaleGrowth: Number,
  curePercentage: Number,
  _id: {//Mongoose creates a new _id of type ObjectId to your document.
    type: mongoose.Schema.Types.ObjectId,//un obiect cu subcategoriile de nume si an
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

//

function addAllProps(country, data) {
  return {
    id: country._id,
    name: country.name,
    year: country.year,
    yearGrowth: data.yearGrowth,
    maleGrowth: data.maleGrowth,
    femaleGrowth: data.femaleGrowth,
    curePercentage: data.curePercentage,
  };
}

function addPartialProps(country) {
  return {
    id: country._id,
    name: country.name,
    year: country.year,
    yearGrowth: "",
    maleGrowth: "",
    femaleGrowth: "",
    curePercentage: "",
  };
}

function getDataById(id) {
  return new Promise((resolve) => {
    Country.find({
      _id: id,
    }).then((countryDoc) => {
      if (countryDoc === undefined) {
        throw new Error("id not found");
      }

      //console.log(countryDoc);
      //console.log(countryDoc[0]);
      countryDoc = countryDoc[0];
      isValidCountry(countryDoc);
      Data.find({
        _id: countryDoc._id,
      }).then((dataDoc) => {
        //console.log(dataDoc);
        //console.log(dataDoc[0]);

        dataDoc = dataDoc[0];
        if (dataDoc === undefined) {
          resolve(addPartialProps(countryDoc));
        } else {
          const result = addAllProps(countryDoc, dataDoc);
          resolve(result);
          console.log(result);
        }
      });
    });
  });
}

getDataById("5ed7f2903b076610f0cbce90");//working as intended
//getDataById("5ed7f290326610f0cwwbce90");//not working as intended - id doesn't exist in db



