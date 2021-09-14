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
var acInput = $(".search-input").text();
$(function () {
  $.ajax({
      type: 'GET', 
      url: "https://api.spoonacular.com/food/menuItems/search?apiKey=e1db73aa4c2649c49d537bb9ba5edfc6&query=" + acInput,
      success: function (response) {
          var myArray = $.parseJSON(response);
          var dataAC = {};
          for(var i=0;i<myArray[0].length;i++){
              eval("dataAC." + myArray[0][i] + " = null;");
          }
          debugger;
          $('#autocomplete-input').autocomplete({
              data: dataAC
          });
      }
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
      var randomPicture = []
      for (let i = 0; i < Math.floor(Math.random() * 11); i++) {
      randomPicture.push(result.results[i])
      
      }
       console.log(randomPicture)
      //all logic for adding recipes to screen
      var container = document.createElement("div")
      container.id = "recipe"
      for (let i = 0; i < 10; i++) {
        var recipe = result.results[i];
        var recipeInfo = document.getElementById("recipe-info");
        var recipeImage = document.createElement("img");
        recipeImage.setAttribute("src", recipe.thumbnail_url);
        // recipeInfo.appendChild(recipeImage); 
        container.appendChild(recipeImage)
        recipeImage.style.width = "250px"
        recipeImage.style.height = 'auto'
        recipeImage.style.display = "flex"
      }
      document.body.appendChild(container)
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
var spoonRequest = "?apiKey=e1db73aa4c2649c49d537bb9ba5edfc6"
var genSearch = "https://api.spoonacular.com/food/products/search?" + spoonRequest + "&query=" + searchTerm + "&number=21";
var foodID = "";
var foodImageRequest = "https://spoonacular.com/productImages/" + foodID + "-90x90.png";


/* search button connect*/
$(".searchbtn").on("click", function (event) {

  searchQuery = $(".search-input").val();

  getSearchInformation(event);
  event.preventDefault();

})


/* click product -> add to list & local storage? */
$("#product").on("click", function (event) {

  putOnList(event);
  event.preventDefault();

})

/* function that takes product name and puts it on list in the sidenav, also stores info */
function putOnList() {
  $(document).click(function(event){
    var text = $(event.target).text();
  })

}

/* API CALL */
function getSearchInformation() {
  /* Takes searched item and inputs into API, gets first 21 products */
  let groceryRequest = "https://api.spoonacular.com/food/products/search" + spoonRequest + "&query=" + searchQuery + "&number=3";

  fetch(groceryRequest)
  .then(function (response) {
    return response.json();
  })

  .then(function (response) {
   /* Takes responses and picks the IDs out of the response to get their information */
  for (let i = 0; i < response.products.length; i++) {
   let productID = response.products[i].id;
   let getInfo = "https://api.spoonacular.com/food/products/" + productID + spoonRequest;

   fetch(getInfo)
   .then(function(response) {
     return response.json();
   })

   .then(function(response) {
    /* Takes product information image type and image */
    let productTitle = response.title;
    let imgType = response.imageType;
    let getIMG = "https://spoonacular.com/productImages/" + productID + "-90x90." + imgType;

    /* puts information together to form card */

      let productCard = 
      `<div id="product" class="card-panel hoverable col s3">
      <img id="responsive-img" src="${getIMG}">
      <ul>
      <li><h6>${productTitle}</h6></li>
      </ul>
      </div>
      `;
      let div = $("<div>")
      div.append(productCard)
      $("#productimg").append(div)
    
  })

  }
  
})
}


//local storage for current grocery list
/*grocery items*/
var item = ""

var groceryList = (function(){
  var groceryList = []

  function item(name,quantity) {
    this.name = name
    this.quantity = quantity
  }
  function save () {
    localStorage.setItem('groceryList', JSON.stringify(groceryList))
  }

  function load() {
    groceryList =   JSON.parse(localStorage.getItem(groceryList)) || []
  }
load 

})