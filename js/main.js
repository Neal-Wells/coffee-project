// // IIFE
// (() => {
//   "use strict";

//   let coffees = [
//     { id: 1, name: "Light City", roast: "light", grind: "", grind: ""},
//     { id: 2, name: "Half City", roast: "light", grind: "", grind: ""},
//     { id: 3, name: "Cinnamon", roast: "light", grind: "" },
//     { id: 4, name: "City", roast: "medium", grind: "" },
//     { id: 5, name: "American", roast: "medium", grind: "" },
//     { id: 6, name: "Breakfast", roast: "medium", grind: "" },
//     { id: 7, name: "High", roast: "dark", grind: "" },
//     { id: 8, name: "Continental", roast: "dark", grind: "" },
//     { id: 9, name: "New Orleans", roast: "dark", grind: "" },
//     { id: 10, name: "European", roast: "dark", grind: "" },
//     { id: 11, name: "Espresso", roast: "dark", grind: "" },
//     { id: 12, name: "Viennese", roast: "dark", grind: "" },
//     { id: 13, name: "Italian", roast: "dark", grind: "" },
//     { id: 14, name: "French", roast: "dark", grind: "" },
//   ];

//   //variables for the functions that create the html coffee data, convert it to a string, and then update the displayed list of available coffee
//   let coffeeDisplay = document.querySelector("#coffees");
//   let submitButton = document.querySelector("#submit");
//   let roastSelection = document.querySelector("#roast-selection");

//   //search field
//   let searchField = document.querySelector("#search-roast");

//   //user's choice
//   let usersCoffeeName = document.querySelector("#users-coffee-name");
//   let usersRoast = document.querySelector("#users-roast-choice");
//   let userGrind = document.querySelector("#grind");
//   let userSubmitBtn = document.querySelector("#button-addon2");

//   //Creates the html data for the name and roast type of the coffee
//   const renderCoffee = (coffee) => {
//     let html = '<div class="coffee col-md-6">';
//     html +=
//       '<h1 class="coffee-list-items coffee-name">' + coffee.name + "</h1>";
//     html += '<p class="coffee-list-items roast-name">' + coffee.roast + "</p>";
//     html += '<p class="coffee-list-items">' + coffee.grind + "</p>";
//     html += "</div>";

//     return html;
//   };

//   //Takes the data created in the RenderCoffee function and converts it into a string
//   const renderCoffees = (coffees) => {
//     let html = "";
//     for (let i = 0; i < coffees.length;  i++) {
//       html += renderCoffee(coffees[i]);
//     }
//     return html;
//   };
//   coffeeDisplay.innerHTML = renderCoffees(coffees);

//   //Updates and submits the form select
//   const updateCoffees = (event) => {
//     event.preventDefault(); // don't submit the form, we just want to update the data
//     let selectedRoast = roastSelection.value;
//     let filteredCoffees = [];
//     coffees.forEach(function (coffee) {
//       if (coffee.roast === selectedRoast) {
//         filteredCoffees.push(coffee);
//       } else if (roastSelection.value === "All") {
//         filteredCoffees.push(coffee);
//       }
//     });
//     coffeeDisplay.innerHTML = renderCoffees(filteredCoffees);
//   };

//   // submitButton.addEventListener("click", updateCoffees);

//   //Search function (search field)
//   const findCoffeeName = (event) => {

//       searchField.addEventListener("input", function (e) {
//         e.preventDefault()
//         // let val = this.value;
//         // if (!val) {
//         //   updateCoffees();
//         //   return false;
//         // }
//         // let filterBySearchCoffees = [];
//         // for (let i = 0; i < arr.length; i++) {
//         //   /*check if the item starts with the same letters as the text field value:*/
//         //   if (arr[i].name.toUpperCase().includes(val.toUpperCase())) {
//         //     filterBySearchCoffees.push(arr[i]);
//         //   }
//         // }

//         // updateCoffees(filterBySearchCoffees);
//         let searchCoffeeName = searchField.value.toLowerCase();
//         let filteredCoffees = [];
    
//         coffees.forEach(function (coffee) {
//           if (coffee.name.toLowerCase().includes(searchCoffeeName)) {
//             filteredCoffees.push(coffee);
//             // console.log(filteredCoffees);
//             coffeeDisplay.innerHTML = renderCoffees(filteredCoffees);
//           }
//         });
//       });


  
//   };

//   searchField.addEventListener("keydown", findCoffeeName);

//   //Ensures the user cannot add certain chars and makes it case-insensitive
//   function verifyNewCoffee(str) {
//     //string contain letters a-z (case insensitive), spaces, periods, and apostrophies, eg. 'St. Luke's Coffee'
//     //string cannot start with a period
//     //string cannot contain multiple periods in a row
//     //string cannot be only periods or spaces
//     if (
//       !/[^a-z\s\.\']/i.test(str) &&
//       str.length > 0 &&
//       str.charAt(0) !== "." &&
//       !str.includes("..")
//     ) {
//       let tempStr = str.replace(".", "");
//       if (tempStr.length > 0) {
//         console.log("good to go");
//         return true;
//       }
//     }
//     return false;
//   }

//   //taken from https://stackoverflow.com/questions/4878756/how-to-capitalize-first-letter-of-each-word-like-a-2-word-city
//   //replaces first letter with capitalized version. repeats this for every char after a space
//   function toTitleCase(str) {
//     return str.replace(/\w\S*/g, function (txt) {
//       return txt.charAt(0).toUpperCase() + txt.substr(1);
//     });
//   }

//   //User can their own add coffee function
//   const usersChoice = (input) => {
//     let roastId = coffees.length + 1;
//     let coffeeName = usersCoffeeName.value.toString();
//     let roastType = usersRoast.value.toString();
//     let grindType = userGrind.value.toString();
//     if (verifyNewCoffee(coffeeName)) {
//       coffees.push({
//         id: roastId,
//         name: toTitleCase(coffeeName),
//         roast: roastType,
//         grind: grindType,
//       });
//       coffeeDisplay.innerHTML = renderCoffees(coffees);
//     }
//   };

//   userSubmitBtn.addEventListener("click", usersChoice);

//   //Prevents the page from auto-reloading when the user hits the enter key
//   usersCoffeeName.addEventListener("keydown", (event) => {
//     if (event.keyCode === 13) {
//       event.preventDefault();
//       usersChoice(event);
//     }
//   });
// })();




(() => {
  "use strict";

  let filteredContainer = document.querySelector("#coffees");
  let addCoffeeButton = document.querySelector("#button-addon2");
  let roastSelection = document.querySelector("#roast-selection");
  let userGrind = document.querySelector("#grind");
  let usersCoffeeName = document.querySelector("#users-coffee-name");


  roastSelection.onchange = (e) => {
    updateCoffees();
  };
  function renderCoffee(coffee) {
    let html = '<div class="coffee col-md-6">';
    html += `<h1 class="coffee-list-items coffee-name">` + coffee.name + "</h1>";
    html += `<p class="coffee-list-items roast-name">` + coffee.roast + "</p>";
    html += `<p class="coffee-list-items">` + coffee.grind + "</p>";
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
    if (filteredArr) {
      coffeesdb = filteredArr;
    }
    coffeesdb.forEach(function (coffee) {
      if (selectedRoast === "all") {
        filteredCoffees.push(coffee);
      } else if (coffee.roast === selectedRoast) {
        filteredCoffees.push(coffee);
      }
    });
    filteredContainer.innerHTML = renderCoffees(filteredCoffees);
  }

  // from http://www.ncausa.org/About-Coffee/Coffee-Roasts-Guide
  var coffees = [
    { id: 1, name: "Light City", roast: "light", grind: ""},
    { id: 2, name: "Half City", roast: "light", grind: ""},
    { id: 3, name: "Cinnamon", roast: "light", grind: ""},
    { id: 4, name: "City", roast: "medium", grind: ""},
    { id: 5, name: "American", roast: "medium", grind: ""},
    { id: 6, name: "Breakfast", roast: "medium", grind: ""},
    { id: 7, name: "High", roast: "dark", grind: ""},
    { id: 8, name: "Continental", roast: "dark", grind: ""},
    { id: 9, name: "New Orleans", roast: "dark", grind: ""},
    { id: 10, name: "European", roast: "dark", grind: ""},
    { id: 11, name: "Espresso", roast: "dark", grind: ""},
    { id: 12, name: "Viennese", roast: "dark", grind: ""},
    { id: 13, name: "Italian", roast: "dark", grind: ""},
    { id: 14, name: "French", roast: "dark", grind: ""},
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
    let newCoffee = document
      .getElementById("users-coffee-name")
      .value.toString()
      .trim();
    let newCoffeeRoast = document
      .getElementById("users-roast-choice")
      .value.toString();
    let grindType = userGrind.value.toString();
    let cloneArr = coffees.slice();

    if (verifyNewCoffee(newCoffee)) {
      sortById(cloneArr);
      coffees.push({
        id: cloneArr[cloneArr.length - 1].id + 1,
        name: toTitleCase(newCoffee),
        roast: newCoffeeRoast,
        grind: grindType
      });
      if (
        newCoffeeRoast === roastSelection.value ||
        roastSelection.value === "all"
      ) {
        updateCoffees();
      }
      document.getElementById("users-coffee-name").value = "";
    }
  }
  usersCoffeeName.addEventListener("keydown", (e) => {
    if (e.keyCode == 13) {
      e.preventDefault();
      addCoffee();
    }
  });
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
          if (arr[i].name.toUpperCase().includes(val.toUpperCase())) {
            filterBySearchCoffees.push(arr[i]);
          }
        }

        updateCoffees(filterBySearchCoffees);
      });

      if (te.keyCode == 13) {
        te.preventDefault();
      }
    });
  }

  filteredContainer.innerHTML = renderCoffees(coffees);
  searchCoffees(document.getElementById("search-roast"), coffees);
})();