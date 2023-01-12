// IIFE
(() => {
    "use strict"

    let coffees = [
        {id: 1, name: 'Light City', roast: 'light', grind: ''},
        {id: 2, name: 'Half City', roast: 'light', grind: ''},
        {id: 3, name: 'Cinnamon', roast: 'light', grind: ''},
        {id: 4, name: 'City', roast: 'medium', grind: ''},
        {id: 5, name: 'American', roast: 'medium', grind: ''},
        {id: 6, name: 'Breakfast', roast: 'medium', grind: ''},
        {id: 7, name: 'High', roast: 'dark', grind: ''},
        {id: 8, name: 'Continental', roast: 'dark', grind: ''},
        {id: 9, name: 'New Orleans', roast: 'dark', grind: ''},
        {id: 10, name: 'European', roast: 'dark', grind: ''},
        {id: 11, name: 'Espresso', roast: 'dark', grind: ''},
        {id: 12, name: 'Viennese', roast: 'dark', grind: ''},
        {id: 13, name: 'Italian', roast: 'dark', grind: ''},
        {id: 14, name: 'French', roast: 'dark', grind: ''},
    ];

//variables for the functions that create the html coffee data, convert it to a string, and then update the displayed list of available coffee
    let coffeeDisplay = document.querySelector('#coffees');
    let submitButton = document.querySelector('#submit');
    let roastSelection = document.querySelector('#roast-selection');

//search field
    let searchField = document.querySelector('#search-roast');

//user's choice
    let usersCoffeeName = document.querySelector('#users-coffee-name');
    let usersRoast = document.querySelector('#users-roast-choice');
    let userGrind = document.querySelector('#grind');
    let userSubmitBtn = document.querySelector('#button-addon2');

//Creates the html data for the name and roast type of the coffee
    const renderCoffee = (coffee) => {
        let html = '<div class="coffee col-md-6">';
        html += '<h1 class="coffee-list-items coffee-name">'+ coffee.name + '</h1>';
        html += '<p class="coffee-list-items roast-name">' + coffee.roast + '</p>';
        html += '<p class="coffee-list-items">' + coffee.grind + '</p>';
        html += '</div>';

        return html;
    }

//Takes the data created in the RenderCoffee function and converts it into a string
    const renderCoffees = (coffees) => {
        let html = '';
        for(let i = coffees.length - 1; i >= 0; i--) {
            html += renderCoffee(coffees[i]);
        }
        return html;
    }
    coffeeDisplay.innerHTML = renderCoffees(coffees);

//Updates and submits the form select
    const updateCoffees = (event) => {
        event.preventDefault(); // don't submit the form, we just want to update the data
        let selectedRoast = roastSelection.value;
        let filteredCoffees = [];
        coffees.forEach(function(coffee) {
            if (coffee.roast === selectedRoast) {
                filteredCoffees.push(coffee);
            }else if (roastSelection.value === 'All') {
                filteredCoffees.push(coffee);
            }
        });
        coffeeDisplay.innerHTML = renderCoffees(filteredCoffees);
    }

    submitButton.addEventListener('click', updateCoffees);

//Search function (search field)
    const findCoffeeName = () => {
        let searchCoffeeName = searchField.value.toLowerCase();
        let filteredCoffees = [];

        coffees.forEach(function (coffee) {
            if (coffee.name.toLowerCase().includes(searchCoffeeName)) {
                filteredCoffees.push(coffee);
                // console.log(filteredCoffees);
                coffeeDisplay.innerHTML = renderCoffees(filteredCoffees);
            }
        });
    }

    searchField.addEventListener('keyup', findCoffeeName);


    //Ensures the user cannot add certain chars and makes it case-insensitive
    function verifyNewCoffee(str) {
        //string contain letters a-z (case insensitive), spaces, periods, and apostrophies, eg. 'St. Luke's Coffee'
        //string cannot start with a period
        //string cannot contain multiple periods in a row
        //string cannot be only periods or spaces
        if (
            !/[^a-z\s\.\']/i.test(str) &&
            str.length > 0 &&
            str.charAt(0) !== "." &&
            !str.includes("..")
        ) {
            let tempStr = str.replace(".", "");
            if (tempStr.length > 0) {
                console.log("good to go");
                return true;
            }
        }
        return false;
    }


    //taken from https://stackoverflow.com/questions/4878756/how-to-capitalize-first-letter-of-each-word-like-a-2-word-city
    //replaces first letter with capitalized version. repeats this for every char after a space
    function toTitleCase(str) {
        return str.replace(/\w\S*/g, function (txt) {
            return txt.charAt(0).toUpperCase() + txt.substr(1);
        });
    }


//User can their own add coffee function
    const usersChoice = (input ) =>{
        let roastId = coffees.length + 1;
        let coffeeName = usersCoffeeName.value.toString();
        let roastType = usersRoast.value.toString();
        let grindType = userGrind.value.toString();
        if(verifyNewCoffee(coffeeName)){
            input = { id: roastId, name: toTitleCase(coffeeName), roast: roastType, grind: grindType };
            coffees.push(input);
            coffeeDisplay.innerHTML = renderCoffees(coffees);
        }
    }

    userSubmitBtn.addEventListener('click', usersChoice);

    //Prevents the page from auto-reloading when the user hits the enter key
    usersCoffeeName.addEventListener("keydown", (event) => {
        if (event.keyCode === 13) {
            event.preventDefault();
            usersChoice(event);
        }
    });

})();


