export const fetchCurrencies = () => {
  return new Promise((resolve, reject) => {
    $.ajax({
      method: "GET",
      url: "/Currency/GetCurrencies",
      success: (response) => {
        resolve(response);
      },
      error: (res) => {
        reject(res.responseJSON);
      },
    });
  });
};

export const submitForm = () => {
  $.ajax({
    method: "POST",
    url: "/Currency/GetCrossRate",
    data: {
      InputValue: $("#currency-input").val(),
      CurrencyFromId: $("#currency-dropdown-from").val(),
      CurrencyFromName: $("#currency-dropdown-from option:selected").html(),
      CurrencyToId: $("#currency-dropdown-to").val(),
      CurrencyToName: $("#currency-dropdown-to option:selected").html(),
      Date: $("#currency-date").val(),
    },
    success: (response) => {
      let t = $("#result-table").DataTable();
      t.row.add(response).draw();
    },
    error: (res) => {
      console.log(res.responseJSON);
    },
  });
};

export const getTotalValue = (convertedValues, selected) => {
  $.ajax({
    method: "POST",
    url: "/Currency/GetTotalValue",
    data: JSON.stringify({
      convertedValues: convertedValues,
      convertToId: selected,
    }),
    contentType: "application/json; charset=utf-8",
    success: (response) => {
      let totalDiv = document.querySelector(".sum");
      let innerText = document.createTextNode("Total: " + response);
      totalDiv.innerText = innerText.textContent;
    },
    error: (res) => {
      console.log(res.responseJSON);
    },
  });
};
