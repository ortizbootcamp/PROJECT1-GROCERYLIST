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
      }
    })
    .catch(function (err) {
      console.error(err);
    });
});


/*    API DOC LINK: https://spoonacular.com/food-api/docs#Authentication */


/*API*/

var searchTerm = $(".search-input").val();
var spoonRequest = "?apiKey=21f5dc0d9fd041aca40b7098e690844d";
var genSearch = "https://api.spoonacular.com/food/products/search?" + spoonRequest + "&query=" + searchTerm + "&number=21";
var foodID = "";
var foodImageRequest = "https://spoonacular.com/productImages/" + foodID + "-90x90.png";

/* search button connect*/
$(".searchbtn").on("click", function (event) {

  searchQuery = $(".search-input").val();

  getSearchInformation(event);
  event.preventDefault();

})
/* search button connect*/

/* API CALL - test for 1 */

function getSearchInformation() {
  /* Takes searched item and inputs into API, gets first 21 products */
  let groceryRequest = "https://api.spoonacular.com/food/products/search" + spoonRequest + "&query=" + searchQuery + "&number=21";
  fetch(groceryRequest)
  .then(function (response) {
    return response.json();
  })

  .then(function (response) {
   /* Takes responses and picks the IDs out of the response to get their information */
  
   let productID = response.products[0].id;
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
    fetch(getIMG)
    .then(function() {
    /* puts information together to form card */

      let productCard = 
      `<img id="responsive-img" src="${getIMG}">
      <ul>
      <li><h5>${productTitle}</h5></li>
      </ul>
      `;

      $("#productimg").html(productCard);
      
    })
  })
})
}
/* API CALL */


/*
PSEUDO CODE
>user searches

>get information from api
-information needed:
image
name
price

to get my image i need the product id
to get the name, i can just search
to get price i need product id

first, search name

get title & id of 21 products

save those titles to storage separately

take product ids
request price

input product id to 
request img

take image, name, price information

put into card format for 21 products

display on site

 getProductImg();

    let productCard =
    `
    <img id="productimg responsive-img" src="{}">
    <h6>${response.title};</h6>
    `;

    $("#name").html(productCard);

*/