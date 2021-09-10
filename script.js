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

$(document).ready(function () {
  $(".sidenav").sidenav();
});
$(document).ready(function () {
  $(".modal").modal();
});
