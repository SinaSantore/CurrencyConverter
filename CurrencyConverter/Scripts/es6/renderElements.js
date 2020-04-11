const generateInputElement = (id) => {
  let inputDiv = document.createElement("div");
  let input = document.createElement("input");
  input.id = id;
  input.type = "number";
  input.className = "form-control";
  input.placeholder = "Enter a value";

  inputDiv.appendChild(input);

  return inputDiv;
};

const generateDropDown = (currencyList, id) => {
  let dropDownDiv = document.createElement("div");
  let select = document.createElement("select");
  select.id = "currency-dropdown-" + id;
  select.className = "form-control";

  if (currencyList !== null) {
    currencyList.forEach((list) => {
      let option = document.createElement("option");
      option.textContent = list.Text;
      option.value = list.Value;

      select.append(option);
    });
  }

  dropDownDiv.appendChild(select);
  return dropDownDiv;
};

const generateDatePicker = (id) => {
  let datepickerDiv = document.createElement("div");
  let datePicker = document.createElement("input");
  datePicker.type = "text";
  datePicker.id = id;
  datePicker.className = "form-control";

  datepickerDiv.appendChild(datePicker);
  return datepickerDiv;
};

const generateButton = (id) => {
  let buttonDiv = document.createElement("div");
  let button = document.createElement("button");
  button.textContent = "Lägg till";
  button.id = id;
  button.className = "form-control";

  buttonDiv.appendChild(button);
  return buttonDiv;
};

export const renderSumElements = (currencyList) => {
  let sumContainer = document.getElementById("sum-container");
  let textDiv = document.createElement("div");
  let innerText = document.createTextNode("Total ");
  textDiv.className = "sum";
  textDiv.appendChild(innerText);

  sumContainer.appendChild(textDiv);
  sumContainer.appendChild(generateDropDown(currencyList, "total"));
};

export const renderInputElements = (currencyList) => {
  return new Promise((resolve, reject) => {
    let formContainer = document.getElementById("form-container");

    formContainer.appendChild(generateInputElement("currency-input"));
    formContainer.appendChild(generateDropDown(currencyList, "from"));
    formContainer.appendChild(generateDropDown(currencyList, "to"));
    formContainer.appendChild(generateDatePicker("currency-date"));
    formContainer.appendChild(generateButton("currency-addbutton"));

    resolve();
  }).catch((message) => {
    console.log(message);
  });
};
