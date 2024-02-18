let data = [
  {
    PREDPR_K: "1",
    PREDPR_NAIM: "В2 Групп",
    REPEAT_ENT: "0.59",
    FACTOR_ELIMINATE: "0.67",
    KOL_NARUSH: "167",
    KOL_PREDPIS: "124",
    PRIOSTANOVKI: "15",
    ISP_V_SROK: "112",
    ISP_NE_V_SROK: "0",
    ISP_V_SROK_ISP_NE_V_SROK: "112",
    IS_ISCONTRACTOR: "Y",
    NE_ISTEK_SROK: "47",
    ISTEK_SROK: "8",
    NE_ISTEK_SROK_ISTEK_SROK: "55",
    VYP: "112"
  },
  {
    PREDPR_K: "3",
    PREDPR_NAIM: "Обогатительная фабрика",
    REPEAT_ENT: "0.41",
    FACTOR_ELIMINATE: "0.53",
    KOL_NARUSH: "116",
    KOL_PREDPIS: "109",
    PRIOSTANOVKI: "11",
    ISP_V_SROK: "53",
    ISP_NE_V_SROK: "25",
    ISP_V_SROK_ISP_NE_V_SROK: "78",
    IS_ISCONTRACTOR: "",
    NE_ISTEK_SROK: "22",
    ISTEK_SROK: "16",
    NE_ISTEK_SROK_ISTEK_SROK: "38",
    VYP: "78"
  },
  {
    PREDPR_K: "2",
    PREDPR_NAIM: "Разрез",
    REPEAT_ENT: "0.39",
    FACTOR_ELIMINATE: "0.3",
    KOL_NARUSH: "129",
    KOL_PREDPIS: "53",
    PRIOSTANOVKI: "21",
    ISP_V_SROK: "27",
    ISP_NE_V_SROK: "16",
    ISP_V_SROK_ISP_NE_V_SROK: "43",
    IS_ISCONTRACTOR: "",
    NE_ISTEK_SROK: "31",
    ISTEK_SROK: "55",
    NE_ISTEK_SROK_ISTEK_SROK: "86",
    VYP: "43"
  },
  {
    PREDPR_K: "14",
    PREDPR_NAIM: "Талдинская зап.1",
    REPEAT_ENT: "0.5",
    FACTOR_ELIMINATE: "0.06",
    KOL_NARUSH: "16",
    KOL_PREDPIS: "13",
    PRIOSTANOVKI: "5",
    ISP_V_SROK: "1",
    ISP_NE_V_SROK: "0",
    ISP_V_SROK_ISP_NE_V_SROK: "1",
    IS_ISCONTRACTOR: "",
    NE_ISTEK_SROK: "15",
    ISTEK_SROK: "0",
    NE_ISTEK_SROK_ISTEK_SROK: "15",
    VYP: "1"
  },
  {
    PREDPR_K: "4",
    PREDPR_NAIM: "Шахта",
    REPEAT_ENT: "0.82",
    FACTOR_ELIMINATE: "0.87",
    KOL_NARUSH: "481",
    KOL_PREDPIS: "472",
    PRIOSTANOVKI: "139",
    ISP_V_SROK: "391",
    ISP_NE_V_SROK: "55",
    ISP_V_SROK_ISP_NE_V_SROK: "446",
    IS_ISCONTRACTOR: "",
    NE_ISTEK_SROK: "24",
    ISTEK_SROK: "11",
    NE_ISTEK_SROK_ISTEK_SROK: "35",
    VYP: "446"
  }
]

// // function getData() {
// //     fetch('http://51.250.13.229/api/safetyEnterprise')
// //         .then(response => {
// //             console.log(response);
// //             return response.json();
// //         })
// //         .then(data => {
// //             console.log(data);
// //         })
// //         .catch(error => {
// //             // error handling
// //             console.log('error');
// //         });
// // }

// // getData();

let headerNames = [
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

let JSONkeys = [
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

function filterObject(originalObject) {
  return Object.keys(originalObject)
    .filter(key => JSONkeys.includes(key))
    .reduce((obj, key) => {
      obj[key] = originalObject[key];
      return obj;
    }, {});
}

let dataToDisplay = [];

data.forEach(object => {
  dataToDisplay.push(Object.values(filterObject(object)));
});

google.charts.load('current', { 'packages': ['bar'] });
google.charts.setOnLoadCallback(drawChart);

function drawChart() {
  var data = google.visualization.arrayToDataTable([
    headerNames,
    ...dataToDisplay
  ]);

  var options = {
    chart: {
      title: 'Company Performance',
    }
  };

  var chart = new google.charts.Bar(document.getElementById('columnchart_material'));

  chart.draw(data, google.charts.Bar.convertOptions(options));
}


