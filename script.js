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

//button click to go to recipe puppy
$(document).ready(function(){
    $('.sidenav').sidenav()
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


/* Product API Reference Stuff */

var searchTerm = $(".search-input").val();
var spoonRequest = "?apiKey=f2cc363c131d41018e9a7a7783419309";
var genSearch = "https://api.spoonacular.com/food/products/search?" + spoonRequest + "&query=" + searchTerm + "&number=21";
var foodID = "";
var foodImageRequest = "https://spoonacular.com/productImages/" + foodID + "-90x90.png";

/* search button connect*/
$(".searchbtn").on("click", function (event) {
  searchQuery = $(".search-input").val();
  getSearchInformation(event);
  event.preventDefault();
})


<<<<<<< HEAD
/*clear search results when another search is done*/

$(".searchbtn").click(function() {
  $(".product").remove();
})
=======
>>>>>>> 5b3d176cb82df7ef28a13b69757a0824777e30e1



//local storage for current grocery list
/*grocery items*/
var groceryItem = ""

var groceryList = (function() {
var groceryList = [];

  function getItem(name) {
    this.name = name
  }
  function save () {
    localStorage.setItem('groceryList', JSON.stringify(groceryList))
  }

  function load() {
    groceryList =   JSON.parse(localStorage.getItem(groceryList)) || []
  }
load()

})



/* function that takes product name and puts it on list in the sidenav, also stores info */
$(document).on("click", ".product", function(event) {
  productText = $(this).text()
  putOnList(event);

  event.preventDefault();
})
  
function putOnList() {
  let listAddition = 
  `
  <li class="collection-item"><h6>${productText}</h6></li>
  `
$("#productlist").append(listAddition);
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
      `<div class="card-panel hoverable col s3 product">
      <img id="responsive-img class="pimg" src="${getIMG}">
      <ul>
      <li><h6 id="productT">${productTitle}</h6></li>
      </ul>
      </div>
      `;
      let div = $("<div>")
      div.append(productCard)
      $("#productimg").append(div)
    })
  }
})
<<<<<<< HEAD
}
=======
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

>>>>>>> 5b3d176cb82df7ef28a13b69757a0824777e30e1
