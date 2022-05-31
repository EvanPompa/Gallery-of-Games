//When adding a slideshow, please add another "1" to the slide index. so for ex: "[1,1,{insert 1 here}]"
let slideIndex = [1,1,1,1,1,1,1,1,1,1,1,1,1,1];

// When adding a slideshow, please add the name of the slides to this list.
let slideId = ["mario-slides", "sonic-slides", "pokemon-slides", "tetris-slides", "kirby-slides", "doom-slides", "hk-slides", "journey-slides", "among_us-slides", "counterStrike-slides", "zelda-slides", "dark-souls-slides", "terraria-slides", "tf2-slides", "gta-slides"];

//When adding a slideshow, please add another function call and increment the second value ex: showSlides(1, {increment this number});
showSlides(1, 0);
showSlides(1, 1);
showSlides(1, 2);
showSlides(1, 3);
showSlides(1, 4);
showSlides(1, 5);
showSlides(1, 6);
showSlides(1, 7);
showSlides(1, 8);
showSlides(1, 9);
showSlides(1, 10);
showSlides(1, 11);
showSlides(1, 12);
showSlides(1, 13);




//this function cycles between slides
function plusSlides(n, no) {
  showSlides(slideIndex[no] += n, no);
}

//this function decides which slide to display given that button you clicked.
function showSlides(n, no) {
  let x = $("." + slideId[no]);
  if (n > x.length) {slideIndex[no] = 1}
  if (n < 1) {slideIndex[no] = x.length}
  for (let i = 0; i < x.length; i++) {
     x[i].style.display = "none";
  }
  x[slideIndex[no]-1].style.display = "block";
}

//The filter function chooses what games to display given their genre.
function filterSelection(category) {

  // Get all video games
  var games = $(".game");

  // If the user wants to display all games...
  if(category == "all"){

    // Loop through all games and display them.
    games.each(function(){
      displayElement($(this));
    });
  }
  else{ // If the user wants to sort by a specific game...

    // Loop through all games...
    games.each(function(){

      // If the selected element is in the genre the user wants...
      if($(this).hasClass(category)){

        // display this game on the page.
        displayElement($(this));
      }
      else{// If the selected element is NOT in the genre the user wants...

        // remove this game from the page.
        removeElement($(this));
      }
    });
  }
}

//This function sets the display of any element to "block" which will make it appear on the page.
function displayElement(element){
  element.show();
}

//This function sets the display of any element to "none" which will make it NOT appear on the page.
function removeElement(element){
  element.hide();
}

//When the website starts, display all games.
filterSelection("all");
