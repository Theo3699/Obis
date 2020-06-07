const apiURL = 'http://localhost:3000';
let lineChart = null;

function populateFilter() {
    fetch(`${apiURL}/data/country`).then(response => response.json()).then(data => {
        const country = document.getElementById('country');
        const countryNames = data.map(country => country.name);
        const uniqueCountries = countryNames.filter((name, index) => index === countryNames.indexOf(name));
        uniqueCountries.forEach((countryName) => {
            const option = document.createElement('option');
            option.setAttribute('value', countryName);
            option.appendChild(document.createTextNode(countryName));
            country.appendChild(option);
        });
    });
}

function fetchData() {
    const selectedCountry = document.getElementById('country').value;
    fetch(`${apiURL}/data?country=${selectedCountry}`)
        .then(response => response.json())
        .then(data => createChart(data))
        .catch(err => console.log(err));
}

function createChart(data) {
    const ctx = document.getElementById('lineChart').getContext('2d');
    const chartData = {
        labels: data.map(country => country.year),
        datasets: [{
            label: 'Year Growth',
            data: data.map(country => country.yearGrowth),
            borderColor: "peru",
            fill: false
        },
        {
            label: 'Male Growth',
            data: data.map(country => country.maleGrowth),
            borderColor: "aquamarine",
            fill: false
        },
        {
            label: 'Female Growth',
            data: data.map(country => country.femaleGrowth),
            borderColor: "plum",
            fill: false
        },
        {
            label: 'Cure percentage',
            data: data.map(country => country.curePercentage),
            borderColor: "olive",
            fill: false
        }
        ]
    }
    if (lineChart) {
        lineChart.data = chartData;
        lineChart.update();
    } else {
        lineChart = new Chart(ctx, {
            type: 'line',
            data: chartData,
            options: {
                scales: {
                    yAxes: [{
                        beginAtZero: true
                    }]
                },
                responsive: true,
                maintainAspectRatio: false
            }
        });
    }
}

populateFilter();
fetchData();