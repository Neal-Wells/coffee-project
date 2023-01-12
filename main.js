"use strict";
var filteredContainer = document.querySelector("#coffees");
// var submitButton = document.querySelector("#submit");
var addCoffeeButton = document.querySelector("#add-coffee");
var roastSelection = document.querySelector("#roast-selection");
var roastAddition = document.querySelector("#roast-addition");

roastSelection.onchange = (e) => {
  console.log("changed");
  updateCoffees(roastSelection, "filter");
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

function updateCoffees(select, process) {
  // don't submit the form, we just want to update the data
  var selectedRoast = select.value;

  var filteredCoffees = [];
  coffees.forEach(function (coffee) {
    if (process === "filter") {
      if (selectedRoast === "all") {
        filteredCoffees.push(coffee);
      } else if (coffee.roast === selectedRoast) {
        filteredCoffees.push(coffee);
      }
    } else if (process === "addition") {
      filteredCoffees.push(coffee);
    }
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
  //pulled from https://stackoverflow.com/questions/4878756/how-to-capitalize-first-letter-of-each-word-like-a-2-word-city
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
    //   console.log(coffees);
    if (
      newCoffeeRoast === roastSelection.value ||
      roastSelection.value === "all"
    ) {
      updateCoffees(roastSelection, "filter");
    }
    document.getElementById("coffee-add").value = "";
  } else {
  }
}

addCoffeeButton.addEventListener("click", (e) => {
  e.preventDefault();
  addCoffee();
});

// function autocomplete(inp, arr) {
//   /*the autocomplete function takes two arguments,
//     the text field element and an array of possible autocompleted values:*/
//   var currentFocus;
//   /*execute a function when someone writes in the text field:*/
//   inp.addEventListener("input", function (e) {
//     var a,
//       b,
//       i,
//       val = this.value;
//     /*close any already open lists of autocompleted values*/
//     closeAllLists();
//     if (!val) {
//       return false;
//     }
//     currentFocus = -1;
//     /*create a DIV element that will contain the items (values):*/
//     a = document.createElement("DIV");
//     a.setAttribute("id", this.id + "autocomplete-list");
//     a.setAttribute("class", "autocomplete-items");
//     /*append the DIV element as a child of the autocomplete container:*/
//     this.parentNode.appendChild(a);
//     /*for each item in the array...*/
//     for (i = 0; i < arr.length; i++) {
//       /*check if the item starts with the same letters as the text field value:*/
//       if (
//         arr[i].name.substr(0, val.length).toUpperCase() == val.toUpperCase()
//       ) {
//         /*create a DIV element for each matching element:*/
//         b = document.createElement("DIV");
//         /*make the matching letters bold:*/
//         b.innerHTML =
//           "<strong>" + arr[i].name.substr(0, val.length) + "</strong>";
//         b.innerHTML += arr[i].name.substr(val.length);
//         /*insert a input field that will hold the current array item's value:*/
//         b.innerHTML += "<input type='hidden' value='" + arr[i].name + "'>";
//         /*execute a function when someone clicks on the item value (DIV element):*/
//         b.addEventListener("click", function (e) {
//           /*insert the value for the autocomplete text field:*/
//           inp.value = this.getElementsByTagName("input")[0].value;
//           /*close the list of autocompleted values,
//                 (or any other open lists of autocompleted values:*/
//           closeAllLists();
//         });
//         a.appendChild(b);
//       }
//     }
//   });
//   /*execute a function presses a key on the keyboard:*/
//   inp.addEventListener("keydown", function (e) {
//     var x = document.getElementById(this.id + "autocomplete-list");
//     if (x) x = x.getElementsByTagName("div");
//     if (e.keyCode == 40) {
//       /*If the arrow DOWN key is pressed,
//           increase the currentFocus variable:*/
//       currentFocus++;
//       /*and and make the current item more visible:*/
//       addActive(x);
//     } else if (e.keyCode == 38) {
//       //up
//       /*If the arrow UP key is pressed,
//           decrease the currentFocus variable:*/
//       currentFocus--;
//       /*and and make the current item more visible:*/
//       addActive(x);
//     } else if (e.keyCode == 13) {
//       /*If the ENTER key is pressed, prevent the form from being submitted,*/
//       e.preventDefault();
//       if (currentFocus > -1) {
//         /*and simulate a click on the "active" item:*/
//         if (x) x[currentFocus].click();
//       }
//     }
//   });
//   function addActive(x) {
//     /*a function to classify an item as "active":*/
//     if (!x) return false;
//     /*start by removing the "active" class on all items:*/
//     removeActive(x);
//     if (currentFocus >= x.length) currentFocus = 0;
//     if (currentFocus < 0) currentFocus = x.length - 1;
//     /*add class "autocomplete-active":*/
//     x[currentFocus].classList.add("autocomplete-active");
//   }
//   function removeActive(x) {
//     /*a function to remove the "active" class from all autocomplete items:*/
//     for (var i = 0; i < x.length; i++) {
//       x[i].classList.remove("autocomplete-active");
//     }
//   }
//   function closeAllLists(elmnt) {
//     /*close all autocomplete lists in the document,
//       except the one passed as an argument:*/
//     var x = document.getElementsByClassName("autocomplete-items");
//     for (var i = 0; i < x.length; i++) {
//       if (elmnt != x[i] && elmnt != inp) {
//         x[i].parentNode.removeChild(x[i]);
//       }
//     }
//   }
//   /*execute a function when someone clicks in the document:*/
//   document.addEventListener("click", function (e) {
//     closeAllLists(e.target);
//   });
// }

function searchCoffees(inp, arr) {
  inp.addEventListener("keydown", function (e) {
    inp.addEventListener("input", function (e) {
      var a,
        b,
        i,
        val = this.value;
      /*close any already open lists of autocompleted values*/
      //   closeAllLists();
      if (!val) {
        return false;
      }
      //   currentFocus = -1;
      /*create a DIV element that will contain the items (values):*/
      //   a = document.createElement("DIV");
      //   a.setAttribute("id", this.id + "autocomplete-list");
      //   a.setAttribute("class", "autocomplete-items");
      /*append the DIV element as a child of the autocomplete container:*/
      //   this.parentNode.appendChild(a);
      /*for each item in the array...*/
      for (i = 0; i < arr.length; i++) {
        /*check if the item starts with the same letters as the text field value:*/
        if (
          arr[i].name.substr(0, val.length).toUpperCase() == val.toUpperCase()
        ) {
          /*create a DIV element for each matching element:*/
          //   b = document.createElement("DIV");
          /*make the matching letters bold:*/
          //   b.innerHTML =
          // "<strong>" + arr[i].name.substr(0, val.length) + "</strong>";
          //   b.innerHTML += arr[i].name.substr(val.length);
          /*insert a input field that will hold the current array item's value:*/
          //   b.innerHTML += "<input type='hidden' value='" + arr[i].name + "'>";
          /*execute a function when someone clicks on the item value (DIV element):*/
          //   b.addEventListener("click", function (e) {
          /*insert the value for the autocomplete text field:*/
          //         inp.value = this.getElementsByTagName("input")[0].value;
          //         /*close the list of autocompleted values,
          //                     (or any other open lists of autocompleted values:*/
          //         closeAllLists();
          //       });
          //       a.appendChild(b);
        }
      }
    });
    var x = inp; //document.getElementById(this.id + "autocomplete-list");
    //if (x) x = x.getElementsByTagName("div");
    if (e.keyCode == 13) {
      /*If the ENTER key is pressed, prevent the form from being submitted,*/
      e.preventDefault();
      //   if (currentFocus > -1) {
      //     /*and simulate a click on the "active" item:*/
      //     if (x) x[currentFocus].click();
      //   }
    }
  });
}
filteredContainer.innerHTML = renderCoffees(coffees);
searchCoffees(document.getElementById("coffeeSearch"), coffees);
