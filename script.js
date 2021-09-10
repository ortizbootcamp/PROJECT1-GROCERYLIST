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
    -When they add an item, their name/image is attached to their items
    -Main user will be able to delete/edit their items 

    API DOC LINK: https://spoonacular.com/food-api/docs#Authentication
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/

/* small site functionality */
$(document).ready(function(){
    $('.sidenav').sidenav()
});
$(document).ready(function(){
    $('.modal').modal();
});
/* small site functionality */

/*API*/

var searchTerm = $("#search-input").val();
var spoonRequest = "?apiKey=21f5dc0d9fd041aca40b7098e690844d"
var genSearch = "https://api.spoonacular.com/food/products/search"

