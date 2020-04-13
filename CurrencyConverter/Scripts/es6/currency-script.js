import { renderInputElements, renderSumElements } from "./renderElements";
import { createTable, initResultTable } from "./currency-table";
import {
  submitForm,
  fetchCurrencies,
  getTotalValue,
} from "./currency-requests";

export const setTotalText = (text = "Total: ") => {
  let totalDiv = document.getElementById("currency-sum");
  totalDiv.innerText = text;
};

export const calculateTotal = (selected) => {
  let table = $("#result-table").DataTable();
  let convertedValues = [];

  table.rows().every(function () {
    let values = {
      Input: this.data().InputValue,
      CurrencyFromId: this.data().CurrencyFromId,
    };
    convertedValues.push(values);
  });

  if (convertedValues.length > 0) {
    getTotalValue(convertedValues, selected);
  } else {
    setTotalText();
  }
};

const addEventListeners = () => {
  document
    .getElementById("currency-addbutton")
    .addEventListener("click", () => submitForm());

  $("#result-table tbody").on("click", "button", function () {
    let table = $("#result-table").DataTable();
    table.row($(this).parents("tr")).remove().draw();

    if (table.row().length > 0) {
      let selected = $("#currency-dropdown-total option:selected").val();
      calculateTotal(selected);
    } else {
      setTotalText();
    }
  });

  $("#currency-dropdown-total").on("change", (event) => {
    calculateTotal(event.currentTarget.value);
  });

  $("#currency-date").datepicker({
    dateFormat: "yy-mm-dd",
    changeMonth: true,
    changeYear: true,
    beforeShowDay: $.datepicker.noWeekends,
  });
};

const renderElements = (currencyList) => {
  return new Promise((resolve, reject) => {
    renderInputElements(currencyList);
    renderSumElements(currencyList);

    let table = createTable("result-table");
    let tableContainer = document.getElementById("table-container");
    tableContainer.appendChild(table);

    resolve();
  });
};

$(function () {
  fetchCurrencies().then((currencyList) => {
    renderElements(currencyList).finally(() => {
      initResultTable();
      addEventListeners();
    });
  });
});
