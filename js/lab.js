// Get the button element that toggles the side bar display
var sidenavDisplayer = $(".sidenavDisplayer");

//get the side bar display element itself
var sidenav = $(".sidenav");

//get the Topics div that contains multiple elements within the sidebar
var dropdownbtn = $(".dropdown-btn");

// get the multiple hidden elements within the sidebar
var dropdownContainer = $(".dropdown-container");


// Add a click event to the button that toggles the display of the side nav.
sidenavDisplayer.click(function(){
  sidenav.toggle();
});

// add a click event to the Topics div that toggles the display of some nested elements.
dropdownbtn.click(function(){
  dropdownContainer.toggle();
});
