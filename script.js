
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

$(document).ready(function () {
  $(".sidenav").sidenav();
});
function myFunction() {
  document.getElementById("recipe-button").classList.toggle("show");
}

// Close the dropdown if the user clicks outside of it
window.onclick = function (e) {
  if (!e.target.matches("dropdown-button")) {
    var myDropdown = document.getElementById("recipe-button");
    if (myDropdown.classList.contains("show")) {
      myDropdown.classList.remove("hide");
    }
  }
};

$(document).ready(function () {
  $("input.autocomplete").autocomplete({
    data: {
      Apples: null,
      Bananas: null,
      Oranges: null,
    },
  });
});

var button = document.getElementById("recipe-button");
button.addEventListener("click", function () {
  //add funtion to grab users choices//
  var randomNum = Math.floor(Math.random() * 1483) + 1;
  fetch(
    "https://tasty.p.rapidapi.com/recipes/list?from=" +
      randomNum +
      "&size=10&tags=under_30_minutes", // from = what index to start at | size = recipes returned max: 40 |
    settings
  )
    .then(function (result) {
      return result.json();
    })
    .then(function (result) {
      console.log(result);
      var randomPicture = [];
      for (let i = 0; i < 10; i++) {
        randomPicture.push(result.results[i]);
        console.log(result.results[i].slug); // "tasty.co/recipes/" + slug <= needs to go in your anchor tag
      }
      console.log(randomPicture);
      //all logic for adding recipes to screen
      var container = document.createElement("div");
      container.id = "recipe";
      for (let i = 0; i < 10; i++) {
        var recipe = result.results[i];
        var recipeLink = document.createElement("a");
        recipeLink.setAttribute(
          "href",
          "https://tasty.co/recipe/" + result.results[i].slug
        );
        // var recipeInfo = document.getElementById("recipe-info");
        var recipeImage = document.createElement("img");
        recipeImage.setAttribute("src", recipe.thumbnail_url);
        //  recipeInfo.appendChild(recipeImage);
        recipeLink.appendChild(recipeImage);
        container.appendChild(recipeLink);
        recipeImage.style.width = "250px";
        recipeImage.style.height = "auto";
        recipeImage.style.display = "flex";
      }
      document.body.appendChild(container);
    })
    .catch(function (err) {
      console.error(err);
    });
});

//grocery items
var item = "";

var groceryList = function () {
  var groceryList = [];

  function item(name, quantity) {
    this.name = name;
    this.quantity = quantity;
  }
  function save() {
    localStorage.setItem("groceryList", JSON.stringify(groceryList));
  }

  function load() {
    groceryList = JSON.parse(localStorage.getItem(groceryList)) || [];
  }
  load;
};

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
