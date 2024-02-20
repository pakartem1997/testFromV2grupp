const PROPERTIES_TO_KEEP = [
  "PREDPR_NAIM",
  "REPEAT_ENT",
  "FACTOR_ELIMINATE",
  "KOL_NARUSH",
  "KOL_PREDPIS",
  "PRIOSTANOVKI",
  "ISP_V_SROK",
  "ISP_NE_V_SROK",
  "NE_ISTEK_SROK",
  "ISTEK_SROK",
  "VYP"
];

const HEADER_NAMES = [
  "предприятие",
  "коэф повторяемости",
  "коэф устраняемости",
  "кол-во нарушений",
  "кол-во предписаний",
  "приостановки работ",
  "выполнены в срок",
  "выполнены не в срок",
  "на контроле",
  "просрочено",
  "выполнено"
];

function getData() {
  fetch('./data.json')
    .then(response => {
      return response.json();
    })
    .then(data => {
      let filteredData = data.map(obj => filterObject(obj, PROPERTIES_TO_KEEP));
      createTable(filteredData);
      createBarChar(filteredData)
    })
    .catch(error => {
      console.error(error);
    });
}

getData();

function filterObject(originalObject, propertiesToKeep) {
  return Object.keys(originalObject)
    .filter(key => propertiesToKeep.includes(key))
    .reduce((obj, key) => {
      obj[key] = originalObject[key];
      return obj;
    }, {});
}

function addCellToRow(row, text, className) {
  let newCell = row.insertCell(-1);
  if (className) {
    newCell.className = className;
  }
  let textOfCell = document.createTextNode(text);
  newCell.appendChild(textOfCell);
}

function convertToNumber(str) {
  let num = parseFloat(str);
  return isNaN(num) ? str : num;
}

function createTable(data) {
  const tableContainer = document.getElementById('tableContainer');
  const table = document.createElement('table');
  table.className = 'table';
  const tableHead = table.createTHead();
  tableHead.className = 'tableHead';
  const tableBody = table.createTBody();
  const tableHeadRow = tableHead.insertRow();

  addCellToRow(tableHeadRow, HEADER_NAMES[0]);

  for (let i = 1; i < HEADER_NAMES.length; i++) {
    addCellToRow(tableBody.insertRow(), HEADER_NAMES[i]);
  }

  data.forEach((obj) => {

    const valuesObject = Object.values(obj);

    addCellToRow(tableHeadRow, valuesObject[0]);

    for (let i = 0; i < valuesObject.length - 1; i++) {
      addCellToRow(tableBody.rows[i], valuesObject[i + 1], 'indicatorValue');
    }
  });

  tableContainer.appendChild(table);
}

function createBarChar(data) {
  google.charts.load('current', {'packages':['bar']});
  google.charts.setOnLoadCallback(drawChart);

  let processedData = [["Показатели"]];

  for (let i = 1; i < HEADER_NAMES.length; i++) {
    processedData.push([HEADER_NAMES[i]]);
  }
 
  data.forEach((obj) => {

    const valuesObject = Object.values(obj);

    for (let i = 0; i < valuesObject.length; i++) {
      processedData[i].push(convertToNumber(valuesObject[i]));
    }

  });

  function drawChart() {
    let dataToDisplay = google.visualization.arrayToDataTable(processedData);

    let options = {
      chart: {
        title: 'Company Performance',
      }
    };

    let chart = new google.charts.Bar(document.getElementById('barChartContainer'));

    chart.draw(dataToDisplay, google.charts.Bar.convertOptions(options));
  }
}

