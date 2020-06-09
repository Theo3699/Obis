const apiURL = 'http://localhost:3000';
let tableData = [];
function getData() {//we create the table
    fetch(`${apiURL}/data`).then((response) => response.json()).then(data=>{
        tableData = data;
        data.forEach(({name, year, yearGrowth, maleGrowth, femaleGrowth, curePercentage}) => {//we go through every element of the data
            const tableBody = document.getElementById('tableContent');
            const tableRow = document.createElement('tr');//we create a variable that will be our row
            populateTable(`${name} ${year}`, tableRow);//we call a function that adds a value to a row
            populateTable(yearGrowth, tableRow);
            populateTable(maleGrowth, tableRow);
            populateTable(femaleGrowth, tableRow);
            populateTable(curePercentage, tableRow);
            tableBody.appendChild(tableRow);//we add to the table the row that we just created
        })
    });
}

function populateTable(cellValue, tableRow) {//this function adds a value to a row
    const cell=document.createElement('td');//Creates an instance of the element for the 'td' tag
    const cellText=document.createTextNode(isNaN(cellValue) ? cellValue : `${cellValue}%`);//if the element is a number then we add the value of it
    cell.appendChild(cellText);
    tableRow.appendChild(cell);//we just add the cell that we created before to the end of the row because the cell is a td
}

function exportCSV() {
    fetch(`${apiURL}/csv/data`);
    fetch(`${apiURL}/download/csv/data`).then(response => response.arrayBuffer()).then(data =>{
        const blob = new Blob([data], { type: 'text/csv;charset=utf-8;' });// the blob object contains the data that can be read as text or binary
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