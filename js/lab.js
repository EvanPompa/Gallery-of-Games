// Get the dropdown element by class.
var dropdown = document.getElementsByClassName("dropdown-btn");

/*var i; I think this is uneeded because i is created in the loop.
if this turns out to be a problem someone can revert it.*/

/* I am pretty sure this doesn't need to be in a loop. the length of dropdown
   is 1, and that doesn't seem to ever change because dropdown is a button.
   I took the loop out and it worked just fine, but I reverted it incase it was
   important. Let me know if it is or not*/

// Adds a click event to the dropdown menu and display whats inside
for (let i = 0; i < dropdown.length; i++) {

  // Add a click event to the dropdown element
  dropdown[i].addEventListener("click", function() {

    // Makes the dropdown button green with white text
    this.classList.toggle("active");

    // Get the element blow the button (div class="dropdown-container")
    var dropdownContent = this.nextElementSibling;

    // Display the hidden elements when the dropdown is clicked.
    if (dropdownContent.style.display === "block") {
      dropdownContent.style.display = "none";
    }
    else {
      dropdownContent.style.display = "block";
    }

  });
}
