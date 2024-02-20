let propertiesToKeep = [
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

let HEADER_NAMES = [
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
      let filteredData = data.map(obj => filterObject(obj, propertiesToKeep));
      createTable(filteredData);
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

function addCellToRow(row, text) {
  let newCell = row.insertCell(-1);
  let textOfCell = document.createTextNode(text);
  newCell.appendChild(textOfCell);
}

function createTable(data) {
  console.log(data);
  let tableContainer = document.getElementById("tableContainer");
  let table = document.createElement('table');
  let tableHead = table.createTHead();
  let tableBody = table.createTBody();
  let tableHeadRow = tableHead.insertRow();

  let newCell = tableHeadRow.insertCell(-1);
  let newText = document.createTextNode(HEADER_NAMES[0]);
  newCell.appendChild(newText);

  for (let i = 0; i < 10; i++) {
    let row = tableBody.insertRow();
    let newCell = row.insertCell(-1);
    let newText = document.createTextNode(HEADER_NAMES[i + 1]);
    newCell.appendChild(newText);
  }

  data.forEach((obj) => {

    let valuesObject = Object.values(obj);

    let newCell = tableHeadRow.insertCell(-1);
    let newText = document.createTextNode(valuesObject[0]);
    newCell.appendChild(newText);

    for (let i = 0; i < valuesObject.length - 1; i++) {
      let row = tableBody.rows[i];
      let newCell = row.insertCell(-1);
      let newText = document.createTextNode(valuesObject[i + 1]);
      newCell.appendChild(newText);
    }
  });

  tableContainer.appendChild(table);
}

    // let valuesFromObject = Object.values(obj);
    // console.log(
    //   valuesFromObject
    // );
    // console.log(
    //   obj["PREDPR_NAIM"]
    // );

    
// function createTable(data) {
//     let tableContainer = document.getElementById("tableContainer");
//     let table = document.createElement('table');
//     let tableHead = document.createElement('thead');
//     let tableBody = document.createElement('tbody');
//     /*
//         let tableTr = document.createElement('tr');
//         for (let key in data[0]) {
//             let tableTh = document.createElement('th')
//             tableTh.innerHTML = key;
//             tableTh.className = "tableTh";
//             tableTr.appendChild(tableTh);
//         }
//         tableHead.appendChild(tableTr);
//     */

//     let tableTr = document.createElement('tr');
//     headlines.forEach((item) => {
//         let tableTh = document.createElement('th')
//         tableTh.innerHTML = item;
//         tableTh.className = "tableTh";
//         tableTr.appendChild(tableTh);
//     });
//     tableHead.appendChild(tableTr);

//     data.forEach((obj) => {
//         let tableTr = document.createElement('tr');
//         for (let key in obj) {
//             let tableTh = document.createElement('td')
//             tableTh.innerHTML = obj[key];
//             tableTr.appendChild(tableTh);
//             // ключи
//             //console.log(key);  // name, age, isAdmin
//             // значения ключей
//             //console.log(obj[key]); // John, 30, true
//         }
//         tableBody.appendChild(tableTr);
//     });

//     table.appendChild(tableHead);
//     table.appendChild(tableBody);
//     tableContainer.appendChild(table);
// }

// createTable(data);

// let dataToDisplay = [];

// data.forEach(object => {
//   dataToDisplay.push(Object.values(filterObject(object)));
// });

// google.charts.load('current', { 'packages': ['bar'] });
// google.charts.setOnLoadCallback(drawChart);

// function drawChart() {
//   var data = google.visualization.arrayToDataTable([
//     headerNames,
//     ...dataToDisplay
//   ]);

//   var options = {
//     chart: {
//       title: 'Company Performance',
//     }
//   };

//   var chart = new google.charts.Bar(document.getElementById('columnchart_material'));

//   chart.draw(data, google.charts.Bar.convertOptions(options));
// }


