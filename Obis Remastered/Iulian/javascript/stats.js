const ctx = document.getElementById('lineChart').getContext('2d');
const myChart = new Chart(ctx, {
    type: 'line',
    data: [{ x: 10, y: 20 }],
    options: {
        scales: {
            yAxes: [{
                stacked: true
            }]
        }
    }
});