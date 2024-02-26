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

getData().then(data => {
  const filteredData = data.map(obj => filterObject(obj, PROPERTIES_TO_KEEP));
  buildDataVisualization(filteredData);
});

function getData() {
  return fetch('./data.json')
    .then(response => {
      if (!response.ok) {
        throw new Error('Error occurred!')
      }
      return response.json();
    })
    .then(data => {
      return data;
    })
    .catch(error => {
      console.error(error);
      return {};
    });
}

function buildDataVisualization(data) {
  createTable(data);
  createBarChar(data);
}

function filterObject(originalObject, propertiesToKeep) {
  return Object.keys(originalObject)
    .filter(key => propertiesToKeep.includes(key))
    .reduce((obj, key) => {
      obj[key] = originalObject[key];
      return obj;
    }, {});
}

function addCellToRow(row, text, isHeader = false) {
  const cell = isHeader ? document.createElement('th') : document.createElement('td');
  const textOfTd = document.createTextNode(text);
  cell.appendChild(textOfTd);
  row.appendChild(cell);
  return cell;
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

  const cell = addCellToRow(tableHeadRow, HEADER_NAMES[0], true);
  cell.className = "tableHeaderCell";

  for (let i = 1; i < HEADER_NAMES.length; i++) {
    const cell = addCellToRow(tableBody.insertRow(), HEADER_NAMES[i]);
    cell.className = "tableParameterCell";
  }

  data.forEach((obj) => {
    const valuesObject = Object.values(obj);
    const businessName = valuesObject[0];
    const cell = addCellToRow(tableHeadRow, businessName);
    cell.className = "tableHeaderCell";

    for (let i = 0; i < valuesObject.length - 1; i++) {
      const cell = addCellToRow(tableBody.rows[i], valuesObject[i + 1]);
      cell.setAttribute('data-label', businessName);
      cell.className = "indicatorValue";
    }
  });

  tableContainer.appendChild(table);
}

function createBarChar(data) {
  google.charts.load('current', { packages: ['corechart'] });
  google.charts.setOnLoadCallback(drawCharts);

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

  function drawCharts() {
    const options = {
      legend: { position: 'bottom' },
    };

    for (let i = 0; i < processedData.length - 1; i++) {
      const data = google.visualization.arrayToDataTable([
        processedData[0],
        processedData[i + 1]
      ]);

      const newDiv = document.createElement('div');
      newDiv.className = 'chartContainer';
      document.getElementById('barChartContainer').appendChild(newDiv);
      const chartOptions = Object.assign(options);
      const chart = new google.visualization.ColumnChart(newDiv);
      chart.draw(data, chartOptions);
    }
  }
}

const menuBtn = document.querySelector('.menuBtn');
const navigation = document.querySelector('.navigation');

menuBtn.addEventListener('click', function () {
  menuBtn.classList.toggle('active');
  navigation.classList.toggle('active');
});