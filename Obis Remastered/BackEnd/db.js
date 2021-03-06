var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/obis", {
  ///obis is the name of the db that we are accessing
  useNewUrlParser: true,//To use the new parser, pass option
  useUnifiedTopology: true,// open a connection to the test database on our locally running instance of MongoDB
});

var db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {//We now need to get notified if we connect successfully or if a connection error occurs:
  console.log("connected successfully to database");
});

//we build the schemas for our db
var countrySchema = new mongoose.Schema({
  name: String,
  year: Number,
}).index({
  name: 1,
  year: 1
}, {
  unique: true
});
var Country = mongoose.model("Country", countrySchema);


var dataSchema = new mongoose.Schema({
  yearGrowth: Number,
  maleGrowth: Number,
  femaleGrowth: Number,
  curePercentage: Number,
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Country",//the link between these 2 schemas
  },
});
var Data = mongoose.model("Data", dataSchema);//Create the mongoose Model


function createCountry(countryObj) {
  return new Promise((resolve) => {
    if (!isValidCountry(countryObj)) {//we test that the data that we receive through our variable is valid
      resolve("error");
    } else {
      const newCountry = new Country(countryObj);//we create the variable and put the data in the schema
      newCountry
        .save()
        .then((doc) => {
          resolve(doc);
        })
        .catch((err) => {//if there is an error we need to chatch it
          resolve(err);
        });
    }
  });
}

function createData(data) {
  return new Promise((resolve) => {
    if (!isValidData(data)) {//we test that the data that we receive through our variable is valid
      resolve("error");
    } else {
      const newData = new Data({//we convert the data in the schema
        yearGrowth: data.yearGrowth,
        maleGrowth: data.maleGrowth,
        curePercentage: data.curePercentage,
        femaleGrowth: data.femaleGrowth,
        _id: data.id,
      });
      newData
        .save()//we save the data
        .then((doc) => {
          resolve(doc);
        })
        .catch((err) => {//any error that shows up
          resolve(err);
        });
    }
  });
}

function getCountries() {
  return Country.find();//we return allthe countries that are in the database
}

function isValidCountry(country) {//we test if the informations for a country is valid
  if (country.name === undefined) {
    return false;
  }
  if (country.year === undefined) {
    return false;
  }

  return true;
}


function isValidData(data) {//we test if all the field in the data variable is valid
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

function getData({ country }) {
  let result = [];
  return new Promise((resolve) => {
    const filter = country
      ? {
        name: country,
      }
      : null;
    Country.find(filter).then((countries) => {
      Data.find().then((countriesData) => {
        countries.forEach((country) => {
          obj = countriesData.find((o) => o.id === country.id);//we search for the data with the same id with our country
          if (obj === undefined) {
            result.push(addPartialProps(country));
          } else {
            result.push(addAllProps(country, obj));
          }
        });
        resolve(result);
      });
    });
  });
}

//the exports of the functions
module.exports = {
  createCountry,
  getCountries,
  createData,
  getData,
  compare,
};

//functionality

function addAllProps(country, data) {
  return {
    id: country._id,
    name: country.name,
    year: country.year,
    yearGrowth: data.yearGrowth,//how much increased by year
    maleGrowth: data.maleGrowth,//how much increasead by year(male)
    femaleGrowth: data.femaleGrowth,//how much incresead by year(female)
    curePercentage: data.curePercentage,//how much decreased 
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
      //isValidCountry(countryDoc);
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

//getDataById("5ed7f2903b076610f0cbce90");//working as intended
//getDataById("5ed7f290326610f0cwwbce90");//not working as intended - id doesn't exist in db

function isValidCompare(obj) {
  return new Promise((resolve) => {
    Country.find({
      _id: obj.firstId,
    }).then((first) => {
      if (first === undefined) {
        throw Error("first id not found");
      } else {
        Country.find({
          _id: obj.secondId,
        }).then((second) => {
          if (second === undefined) {
            throw Error("second id not found");
          } else {
            resolve("true");
          }
        });
      }
    });
  });
}

function compare(body) {
  return new Promise((resolve) => {
    isValidCompare(body).then(() => {
      getDataById(body.firstId)
        .then((firstObj) => {
          getDataById(body.secondId).then((secondObj) => {
            const result = {
              winner: {},
              firstCountry: firstObj,
              secondCountry: secondObj,
            };
            let firstObjectAdvantage = {
              sum: 0,
            };

            body.criterias.split(",").forEach((criteria) => {
              firstObjectAdvantage[criteria] = parseInt(firstObj[criteria]) - parseInt(secondObj[criteria]);
              firstObjectAdvantage.sum += firstObjectAdvantage[criteria];

            });
            console.log(firstObjectAdvantage);
            if (firstObjectAdvantage.sum === 0) {
              result.winner = "tie";
              //console.log(result);
              resolve(result);
            }

            if (firstObjectAdvantage.sum > 0) {
              result.winner = firstObjectAdvantage;
              result.winner.id = firstObj.id;
              //console.log(result);
              resolve(result);
            } else {
              if (firstObjectAdvantage.sum < 0) {
                Object.keys({
                  ...firstObjectAdvantage,
                }).forEach((key) => {
                  firstObjectAdvantage[key] *= -1;
                });
                result.winner = firstObjectAdvantage;
                result.winner.id = secondObj.id;
                //console.log(result);
                resolve(result);
              }
            }
          });
        })
        .catch((err) => {
          resolve(err);
        });
    });
  });
}






