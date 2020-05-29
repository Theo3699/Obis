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