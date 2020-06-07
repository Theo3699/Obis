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
    {
        name: "florida",
        year: 2018,
    },
    {
        name: "florida",
        year: 2017,
    },
    {
        name: "florida",
        year: 2016,
    },
    {
        name: "florida",
        year: 2015,
    },
    {
        name: "florida",
        year: 2014,
    },





    
    {
        name: "michigan",
        year: 2018,
    },
    {
        name: "michigan",
        year: 2017,
    },
    {
        name: "michigan",
        year: 2016,
    },
    {
        name: "michigan",
        year: 2015,
    },
    {
        name: "michigan",
        year: 2014,
    },
    {
        name: "arkansas",
        year: 2018,
    },
    {
        name: "arkansas",
        year: 2017,
    },
    {
        name: "arkansas",
        year: 2016,
    },
    {
        name: "arkansas",
        year: 2015,
    },
    {
        name: "arkansas",
        year: 2014,
    },




    

    {
      name: "California",
      year: 2018,
  },
  {
      name: "California",
      year: 2017,
  },
  {
      name: "California",
      year: 2016,
  },
  {
      name: "California",
      year: 2015,
  },
  {
      name: "California",
      year: 2014,
  },


  {
    name: "Colorado",
    year: 2018,
  },
  {
    name: "Colorado",
    year: 2017,
  },
  {
    name: "Colorado",
    year: 2016,
  },
  {
    name: "Colorado",
    year: 2015,
  },
  {
    name: "Colorado",
    year: 2014,
  },

];

const dataObjects = [
    {
        yearGrowth: -0.7,
        maleGrowth: -0.5,
        curePercentage: 0.7,
        femaleGrowth: 0.4,
        //2018 Alabama
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
        curePercentage: 4.7,
        femaleGrowth: -7.6,
        //2018 Alaska
    },
    {
        yearGrowth: 2.8,
        maleGrowth: 0.3,
        curePercentage: 0,
        femaleGrowth: 5.8,
        //2017 Alaska
    },
    {
        yearGrowth: 1.6,
        maleGrowth: 3,
        curePercentage: 0,
        femaleGrowth: -0.2,
        //2016 Alaska
    },
    {
        yearGrowth: 0.1,
        maleGrowth: 0,
        curePercentage: 0,
        femaleGrowth: 0.3,
        //2015 Alaska
    },
    {
        yearGrowth: 1.3,
        maleGrowth: 0.1,
        curePercentage: 0,
        femaleGrowth: 2.7,
        //2014 Alaska
    },
    {
        yearGrowth: 2.3,
        maleGrowth: 1.5,
        curePercentage: 0,
        femaleGrowth: 2.9,
        //2018 Florida
    },
    {
        yearGrowth: 1,
        maleGrowth: 1.3,
        curePercentage: 0,
        femaleGrowth: 0.7,
        //2017 
    },
    {
        yearGrowth: 0.6,
        maleGrowth: 0.6,
        curePercentage: 0,
        femaleGrowth: 0.7,
        //2016 
    },
    {
        yearGrowth: 0.6,
        maleGrowth: 1.9,
        curePercentage: 0,
        femaleGrowth: -0.7,
        //2015 
    },
    {
        yearGrowth: -0.2,
        maleGrowth: -1.7,
        curePercentage: 0.2,
        femaleGrowth: 1.3,
        //2014 Florida
    },
    
    
    

    
    {
        yearGrowth: 0.7,
        maleGrowth: 0,
        curePercentage: 0,
        femaleGrowth: 1.4,
        //2018 Michigan
    },
    {
        yearGrowth: -0.2,
        maleGrowth: -1,
        curePercentage: 0.2,
        femaleGrowth: 0.6,
        //2017
    },
    {
        yearGrowth: 1.3,
        maleGrowth: 0.7,
        curePercentage: 0,
        femaleGrowth: 2,
        //2016
    },
    {
        yearGrowth: 0.5,
        maleGrowth: 0.8,
        curePercentage: 0,
        femaleGrowth: 0,
        //2015
    },
    {
        yearGrowth: -0.8,
        maleGrowth: -0.2,
        curePercentage: 0.8,
        femaleGrowth: -1.3,
        //2014 Michigan
    },
    {
        yearGrowth: 2.1,
        maleGrowth: -0.2,
        curePercentage: 0.7,
        femaleGrowth: 2,
        //2018 Arkansas
    },
    {
        yearGrowth: 1.5,
        maleGrowth: -0.7,
        curePercentage: 0,
        femaleGrowth: -2,
        //2017
    },
    {
        yearGrowth: 1.2,
        maleGrowth: -3,
        curePercentage: 0,
        femaleGrowth: 5.5,
        //2016
    },
    {
        yearGrowth: -1.4,
        maleGrowth: -0.7,
        curePercentage: 0,
        femaleGrowth: -2.1,
        //2015
    },
    {
        yearGrowth: 1.3,
        maleGrowth: 0.6,
        curePercentage: 0,
        femaleGrowth: 1.9,
        //2014 Arkansas
    },





    {
      yearGrowth: 1.3,
      maleGrowth: 1.5,
      curePercentage: 0,
      femaleGrowth: -0.2,
      //2018 California
  },
  {
      yearGrowth:0.2,
      maleGrowth: -0.4,
      curePercentage: 0,
      femaleGrowth: 0.6,
      //2017 California
  },
  {
      yearGrowth: 1.9,
      maleGrowth: 0.3,
      curePercentage: 0,
      femaleGrowth: 1.5,
      //2016 California
  },
  {
      yearGrowth:-1.2,
      maleGrowth: 0.6,
      curePercentage: 1.2,
      femaleGrowth: -1.7,
      //2015 California
  },
  {
      yearGrowth: 1.2,
      maleGrowth: -1.1,
      curePercentage: 0,
      femaleGrowth: 2.3,
      //2014 California
  },



  {
    yearGrowth: 0.7,
    maleGrowth: 0.3,
    curePercentage: 0,
    femaleGrowth: 0.4,
    //2018 Colorado
  },
  {
    yearGrowth: 0.7,
    maleGrowth: -0.9,
    curePercentage: 0,
    femaleGrowth: 1.6,
    //2017 Colorado
  },
  {
    yearGrowth: 4.2,
    maleGrowth: 2.2,
    curePercentage: 0,
    femaleGrowth: 2.0,
    //2016 Colorado
  },
  {
    yearGrowth: -2.2,
    maleGrowth: 0 - 1.7,
    curePercentage: 2.2,
    femaleGrowth: -0.5,
    //2015 Colorado
  },
  {
    yearGrowth: 0,
    maleGrowth: 1.1,
    curePercentage: 0,
    femaleGrowth: -1.1,
    //2014 Colorado
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
