const apiURL = 'http://localhost:3000';
let tableData = [];
function getData() {
    fetch(`${apiURL}/data`).then((response) => response.json()).then(data=>{
        tableData = data;
        data.forEach(({name, year, yearGrowth, maleGrowth, femaleGrowth, curePercentage}) => {
            const tableBody = document.getElementById('tableContent');
            const tableRow = document.createElement('tr');
            populateTable(`${name} ${year}`, tableRow);
            populateTable(yearGrowth, tableRow);
            populateTable(maleGrowth, tableRow);
            populateTable(femaleGrowth, tableRow);
            populateTable(curePercentage, tableRow);
            tableBody.appendChild(tableRow);
        })
    });
}

function populateTable(cellValue, tableRow) {
    const cell=document.createElement('td');
    const cellText=document.createTextNode(isNaN(cellValue) ? cellValue : `${cellValue}%`);
    cell.appendChild(cellText);
    tableRow.appendChild(cell);
}

function exportCSV() {
    fetch(`${apiURL}/csv/data`);
    fetch(`${apiURL}/download/csv/data`).then(response => response.arrayBuffer()).then(data =>{
        const blob = new Blob([data], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const element = document.createElement('a');
        element.setAttribute('href', url);
        element.setAttribute('download', `obesity_data_${new Date().toLocaleDateString()}.csv`);
        element.style.display = 'none';
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);
    })
}

getData();