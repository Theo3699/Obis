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

var fs = require("fs");







/*function length(obj) {
    return Object.keys(obj).length;
}

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
});*/