const apiURL = 'http://localhost:3000';
let barChart = null;

function populateFilters() {
    fetch(`${apiURL}/data/country`).then(response => response.json()).then(data => {
        const firstCountry = document.getElementById('country1');
        const secondCountry = document.getElementById('country2');
        data.forEach(({
            _id,
            name,
            year
        }) => {
            const optionForFirstCountry = document.createElement('option');
            const optionForSecondCountry = document.createElement('option');
            optionForFirstCountry.setAttribute('value', _id);
            optionForSecondCountry.setAttribute('value', _id);
            optionForFirstCountry.appendChild(document.createTextNode(`${name} ${year}`));
            optionForSecondCountry.appendChild(document.createTextNode(`${name} ${year}`));
            firstCountry.appendChild(optionForFirstCountry);
            secondCountry.appendChild(optionForSecondCountry);
        });
    });
}

function compareData() {
    const country1 = document.getElementById('country1').value;
    const country2 = document.getElementById('country2').value;
    const criteriaOptions = [...document.getElementById('criteria').options];
    const criteria = criteriaOptions.filter(option => option.selected).map(option => option.value);
    const warning = document.getElementById('warning');
    if (country1 !== country2 && criteria.length) {
        warning.style.display = 'none';
        fetch(`${apiURL}/compare?firstId=${country1}&secondId=${country2}&criterias=${criteria}`)
            .then(response => response.json())
            .then(data => {
                createChart(data, criteria);
            }).catch(error => console.log(error));
    } else {
        warning.style.display = 'block';
    }
}

function createChart({
    firstCountry,
    secondCountry
}, criteria) {
    const ctx = document.getElementById('barChart').getContext('2d');
    const data = {
        labels: [...criteria],
        datasets: [{
            label: firstCountry.name,
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1,
            data: criteria.map(crit => firstCountry[crit])
        },
        {
            label: secondCountry.name,
            backgroundColor: 'rgba(255, 206, 86, 0.2)',
            borderColor: 'rgba(255, 206, 86, 1)',
            borderWidth: 1,
            data: criteria.map(crit => secondCountry[crit])
        }
        ]
    };
    if (barChart) {
        barChart.data = data;
        barChart.update();
    } else {
        barChart = new Chart(ctx, {
            type: 'bar',
            data: data,
            options: {
                barValueSpacing: 20,
                scales: {
                    yAxes: [{
                        ticks: {
                            min: 0
                        }
                    }],
                },
                responsive: true,
                mantainAspectRatio: false,
                legend: {
                    position: 'top'
                }
            }
        });
    }
}

populateFilters();