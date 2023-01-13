(() => {
  "use strict";
  //global vars
  let filteredContainer = document.querySelector("#coffees");
  let addCoffeeButton = document.querySelector("#button-addon2");
  let roastSelection = document.querySelector("#roast-selection");
  let userGrind = document.querySelector("#grind");
  let usersCoffeeName = document.querySelector("#users-coffee-name");

  //when changing the dropdown for roast, update coffees rendered
  roastSelection.onchange = (e) => {
    updateCoffees();
  };

  //builds coffees to be rendered on html
  function renderCoffee(coffee) {
    let html = '<div class="coffee col-md-6">';
    html += `<h1 class="coffee-list-items coffee-name">` + coffee.name + "</h1>";
    html += `<p class="coffee-list-items roast-name">` + coffee.roast + "</p>";
    html += `<p class="coffee-list-items">` + coffee.grind + "</p>";
    html += "</div>";

    return html;
  }

  //sorts passed array by id
  function sortById(arr) {
    arr.sort(function (a, b) {
      return a.id - b.id;
    });
  }

  //renders coffees on html
  function renderCoffees(coffeeToBeShown) {
    let html = "";

    sortById(coffeeToBeShown);

    for (let i = 0; i < coffeeToBeShown.length; i++) {
      html += renderCoffee(coffeeToBeShown[i]);
    }
    return html;
  }

  //updates coffees to be displayed
  function updateCoffees(filteredArr) {
    // don't submit the form, we just want to update the data
    let selectedRoast = roastSelection.value;
    let filteredCoffees = [];
    let coffeesdb = combinedCoffees;
    if (filteredArr) {
      coffeesdb = filteredArr;
    }
    coffeesdb.forEach(coffee => {
      if (selectedRoast === "all") {
        filteredCoffees.push(coffee);
      } else if (coffee.roast === selectedRoast) {
        filteredCoffees.push(coffee);
      }
    });
    filteredContainer.innerHTML = renderCoffees(filteredCoffees);
  }

  // from http://www.ncausa.org/About-Coffee/Coffee-Roasts-Guide
  let coffees = [
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

  //array that holds users coffees
  let userCoffees = []

  //array that will hold coffees and usercoffees
  let combinedCoffees = [];
  

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

  //handles new coffees presented by user
  function addCoffee() {
    //get user's coffee info as strings
    let newCoffee = document.getElementById("users-coffee-name").value.toString().trim();
    let newCoffeeRoast = document.getElementById("users-roast-choice").value.toString();
    let grindType = userGrind.value.toString();

    //if coffee has valid name, add it to array
    if (verifyNewCoffee(newCoffee)) {
      sortById(combinedCoffees);
      userCoffees.push({
        id: combinedCoffees[combinedCoffees.length - 1].id + 1,
        name: toTitleCase(newCoffee),
        roast: newCoffeeRoast,
        grind: grindType
      });
      updateCombinedCoffees();
      //if new coffee's roast is selected on search, display it immediately
      if (
        newCoffeeRoast === roastSelection.value ||
        roastSelection.value === "all"
      ) {
        updateCoffees();
      }
      //save new coffee
      saveData();
      document.getElementById("users-coffee-name").value = "";
    }
  }
  //prevent refresh on Return for adding new coffees (text field)
  usersCoffeeName.addEventListener("keydown", (e) => {
    if (e.keyCode == 13) {
      e.preventDefault();
      addCoffee();
    }
  });
   //prevent refresh on Return for adding new coffees (button)
  addCoffeeButton.addEventListener("click", (e) => {
    e.preventDefault();
    addCoffee();
  });

  //adds listeners to searchbar 
  function searchCoffees(inp) {
    inp.addEventListener("keydown", function (te) {
      inp.addEventListener("input", function (e) {
        
        let val = this.value;
        //if no input, show all
        if (!val) {
          updateCoffees();
          return false;
        }
        let filterBySearchCoffees = [];
        for (let i = 0; i < combinedCoffees.length; i++) {
          /*check if the item starts with the same letters as the text field value:*/
          if (combinedCoffees[i].name.toUpperCase().includes(val.toUpperCase())) {
            filterBySearchCoffees.push(combinedCoffees[i]);
          }
        }

        updateCoffees(filterBySearchCoffees);
      });

      //prevent refresh on Return
      if (te.keyCode == 13) {
        te.preventDefault();
      }
    });
  }

 

  //updates an array that holds both the original coffees and the user coffees
  function updateCombinedCoffees(){
    combinedCoffees = coffees.concat(userCoffees);
    sortById(combinedCoffees);
  }

  //saves usercoffees
  function saveData(){
    let coffeesObj ={
      coffeeArr: userCoffees
    }
    window.localStorage.setItem("myCoffees", JSON.stringify(coffeesObj));
  }

  //checks for user coffees in local storage and applies them if present
  function loadData(){
    if(window.localStorage.getItem("myCoffees") != null){
      JSON.parse(window.localStorage.getItem("myCoffees")).coffeeArr.forEach(userCoffee =>{
        userCoffees.push(userCoffee)
      })
    }
  }
  //add a button to clear the local storage
  let clearBtn = document.getElementById('clear-btn');

  clearBtn.addEventListener('click', (e) =>{
    clearCache();
  })

  function clearCache(){
    localStorage.clear();
  }
  
  //load user coffees
  loadData();
  //combine coffees with user coffees
  updateCombinedCoffees();
  //render combined coffees
  filteredContainer.innerHTML = renderCoffees(combinedCoffees);
  //add listeners to search bar
  searchCoffees(document.getElementById("search-roast"), combinedCoffees);
    
  
})();