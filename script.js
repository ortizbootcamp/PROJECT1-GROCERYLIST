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

4)Email/Phone Number to add family member onto list
    -When they add an item, their name/image is attached to their items
    -Main user will be able to delete/edit their items 
*/

$(document).ready(function(){
    $('.sidenav').sidenav()
});
$(document).ready(function(){
    $('.modal').modal();
});
document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.dropdown-trigger');
    var instances = M.Dropdown.init(elems, options);
  });