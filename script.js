/*
 1) Dashboard & Login Page
    -Username
    -Password


2) Navbar, Sidenav & Search
    -List of current groceries (sidenav)
    -Categories of groceries (Sidenav)
    -Search (Navbar)
     >Autocomplete
     >User Input
     >If user types in item we do not have, 'item not available' appears
3) Recipe suggestion in Navbar
    -based on what items you have in your list

    section id- favrecipes 
    
4)Email/Phone Number to add family member onto list

    section id- favrecipes */
//recipe API code
const settings = {
  async: true,
  crossDomain: true,
  url: "https://tasty.p.rapidapi.com/recipes/list?from=0&size=20&tags=under_30_minutes",
  method: "GET",
  headers: {
    "x-rapidapi-host": "tasty.p.rapidapi.com",
    "x-rapidapi-key": "38dcaf69bamsh29728cd49878c87p1d3766jsn1c94143a9ed8",
  },
};

// $.ajax(settings).done(function (response) {
//   console.log(response);
// });

//button click to go to recipe puppy
$(document).ready(function(){
    $('.sidenav').sidenav()
});
$(document).ready(function(){
  $(".dropdown-button").dropdown();
})

$(document).ready(function(){
    $('input.autocomplete').autocomplete({
      data: {
        "Apples": null,
        "Bananas": null,
        "Oranges": null,
      },
    });
  });

var button = document.getElementById("recipe-button");
button.addEventListener("click", function () {
  //add funtion to grab users choices//
  fetch(
    "https://tasty.p.rapidapi.com/recipes/list?from=0&size=20&tags=under_30_minutes",
    settings
  )
    .then(function (result) {
      return result.json();
    })
    .then(function (result) {
      console.log(result);
      //all logic for adding recipes to screen
      for (let i = 0; i < result.results.length; i++) {
        var recipe = result.results[i];
        var recipeInfo = document.getElementById("recipe-info");
        var recipeImage = document.createElement("img");
        recipeImage.setAttribute("src", recipe.thumbnail_url);
        recipeInfo.appendChild(recipeImage);
        recipeImage.style.width = "250px"
        recipeImage.style.height = 'auto'
        recipeImage.style.display = "flex"
      }
    })
    .catch(function (err) {
      console.error(err);
    });
});

//DOM

/*4)Email/Phone Number to add family member onto list

    -When they add an item, their name/image is attached to their items

    -Main user will be able to delete/edit their items */

/*    API DOC LINK: https://spoonacular.com/food-api/docs#Authentication */

/* small site functionality */

/*API*/

var searchTerm = $("#search-input").val();
var spoonRequest = "?apiKey=21f5dc0d9fd041aca40b7098e690844d"
var genSearch = "https://api.spoonacular.com/food/products/search"

