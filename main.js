"use strict";
var filteredContainer = document.querySelector("#coffees");
// var submitButton = document.querySelector("#submit");
var addCoffeeButton = document.querySelector("#add-coffee");
var roastSelection = document.querySelector("#roast-selection");
var roastAddition = document.querySelector("#roast-addition");

roastSelection.onchange = (e) => {
  console.log("changed");
  updateCoffees();
};
function renderCoffee(coffee) {
  var html = '<div class="coffee">';
  //html += "<p>" + coffee.id + "</p>";
  html += `<h1 class="inline">` + coffee.name + "</h1>";
  html += `<p class="inline">` + coffee.roast + "</p>";
  html += "</div>";

  return html;
}
function sortById(arr) {
  arr.sort(function (a, b) {
    return a.id - b.id;
  });
}

function renderCoffees(coffeeToBeShown) {
  var html = "";

  sortById(coffeeToBeShown);

  for (var i = 0; i < coffeeToBeShown.length; i++) {
    html += renderCoffee(coffeeToBeShown[i]);
  }
  return html;
}

function updateCoffees(filteredArr) {
  // don't submit the form, we just want to update the data
  var selectedRoast = roastSelection.value;

  var filteredCoffees = [];
  let coffeesdb = coffees;
  if (filteredArr != undefined) {
    coffeesdb = filteredArr;
    // filteredContainer.innerHTML = renderCoffees(filteredArr);
    // return;
  }
  console.log(coffeesdb);
  coffeesdb.forEach(function (coffee) {
    // if (process === "filter" ) {
    if (selectedRoast === "all") {
      filteredCoffees.push(coffee);
    } else if (coffee.roast === selectedRoast) {
      filteredCoffees.push(coffee);
    }
    // }
    // else if (process === "addition") {
    //   filteredCoffees.push(coffee);
    // }
  });
  filteredContainer.innerHTML = renderCoffees(filteredCoffees);
}

// from http://www.ncausa.org/About-Coffee/Coffee-Roasts-Guide
var coffees = [
  { id: 1, name: "Light City", roast: "light" },
  { id: 2, name: "Half City", roast: "light" },
  { id: 3, name: "Cinnamon", roast: "light" },
  { id: 4, name: "City", roast: "medium" },
  { id: 5, name: "American", roast: "medium" },
  { id: 6, name: "Breakfast", roast: "medium" },
  { id: 7, name: "High", roast: "dark" },
  { id: 8, name: "Continental", roast: "dark" },
  { id: 9, name: "New Orleans", roast: "dark" },
  { id: 10, name: "European", roast: "dark" },
  { id: 11, name: "Espresso", roast: "dark" },
  { id: 12, name: "Viennese", roast: "dark" },
  { id: 13, name: "Italian", roast: "dark" },
  { id: 14, name: "French", roast: "dark" },
];

function verifyNewCoffee(str) {
  //string contain letters a-z (case insensitive), spaces, periods, and apostrophies, eg. 'St. Luke's Coffee'
  //string cannot start with a period
  //string cannot contain multiple periods in a row
  //string cannot be only periods or spaces
  if (
    !/[^a-z\s\.\']/i.test(str) &&
    str.length > 0 &&
    str.charAt(0) != "." &&
    !str.includes("..")
  ) {
    let tempstr = str.replace(".", "");
    if (tempstr.length > 0) {
      console.log("good to go");
      return true;
    }
  }
  return false;
}

function toTitleCase(str) {
  //taken from https://stackoverflow.com/questions/4878756/how-to-capitalize-first-letter-of-each-word-like-a-2-word-city
  //replaces first letter with capitalized version. repeats this for every char after a space
  return str.replace(/\w\S*/g, function (txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1);
  });
}

function addCoffee() {
  let newCoffee = document.getElementById("coffee-add").value.toString().trim();
  let newCoffeeRoast = document
    .getElementById("roast-addition")
    .value.toString();
  let cloneArr = coffees.slice();

  if (verifyNewCoffee(newCoffee)) {
    sortById(cloneArr);
    coffees.push({
      id: cloneArr[cloneArr.length - 1].id + 1,
      name: toTitleCase(newCoffee),
      roast: newCoffeeRoast,
    });
    if (
      newCoffeeRoast === roastSelection.value ||
      roastSelection.value === "all"
    ) {
      updateCoffees();
    }
    document.getElementById("coffee-add").value = "";
  } else {
  }
}

addCoffeeButton.addEventListener("click", (e) => {
  e.preventDefault();
  addCoffee();
});

function searchCoffees(inp, arr) {
  inp.addEventListener("keydown", function (te) {
    inp.addEventListener("input", function (e) {
      let val = this.value;
      if (!val) {
        updateCoffees();
        return false;
      }
      let filterBySearchCoffees = [];
      for (let i = 0; i < arr.length; i++) {
        /*check if the item starts with the same letters as the text field value:*/
        if (
          arr[i].name.toUpperCase().includes(val.toUpperCase())
          //arr[i].name.substr(0, val.length).toUpperCase() == val.toUpperCase()
        ) {
          filterBySearchCoffees.push(arr[i]);
        }
      }
      //   console.log(filterBySearchCoffees);
      updateCoffees(filterBySearchCoffees);
    });

    if (te.keyCode == 13) {
      te.preventDefault();
    }
  });
}
filteredContainer.innerHTML = renderCoffees(coffees);
searchCoffees(document.getElementById("coffeeSearch"), coffees);
