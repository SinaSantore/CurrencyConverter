let resultTable;
let headers = ["Valutakursdatum", "Input", "Kurs", "Värde"];

export const createTable = (id, tableHeaders = headers) => {
  let table = document.createElement("table");
  table.id = id;
  table.className = "table table-striped table-bordered";
  var thead = document.createElement("thead");
  var tr = document.createElement("tr");
  var tbody = document.createElement("tbody");

  for (var i = 0; i < tableHeaders.length; i++) {
    var th = document.createElement("th");
    th.textContent = tableHeaders[i];
    th.className = "text-center";
    tr.appendChild(th);
  }
  thead.appendChild(tr);
  table.appendChild(thead);
  table.append(tbody);

  return table;
};

export const initResultTable = () => {
  resultTable = $("#result-table").DataTable({
    buttons: false,
    autoWidth: false,
    searching: false,
    paging: false,
    columns: [
      {
        data: "Date",
        width: "auto",
      },
      {
        data: "InputValue",
        width: "auto",
        render: function (data, type, row) {
          return row.InputValue + " " + row.CurrencyFrom;
        },
      },
      {
        data: "Rate",
        width: "auto",
      },
      {
        data: "ConvertedValue",
        width: "auto",
        render: function (data, type, row) {
          return row.ConvertedValue + " " + row.CurrencyTo;
        },
      },
      {
        defaultContent:
          '<button class="btn btn-danger btn-sm">Ta bort</button>',
      },
    ],
  });
};
