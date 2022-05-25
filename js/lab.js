//When adding a slideshow, please add another "1" to the slide index. so for ex: "[1,1,{insert 1 here}]"
let slideIndex = [1,1,1,1,1,1];

// When adding a slideshow, please add the name of the slides to this list.
let slideId = ["mario-slides", "sonic-slides", "pokemon-slides", "tetris-slides", "kirby-slides", "doom-slides"];

//When adding a slideshow, please add another function call and increment the second value ex: showSlides(1, {increment this number});
showSlides(1, 0);
showSlides(1, 1);
showSlides(1, 2);
showSlides(1, 3);
showSlides(1, 4);
showSlides(1, 5);


//this function cycles between slides
function plusSlides(n, no) {
  showSlides(slideIndex[no] += n, no);
}

//this fucntion decides which slide to display given that button you clicked.
function showSlides(n, no) {
  let x = $("." + slideId[no]);
  if (n > x.length) {slideIndex[no] = 1}
  if (n < 1) {slideIndex[no] = x.length}
  for (let i = 0; i < x.length; i++) {
     x[i].style.display = "none";
  }
  x[slideIndex[no]-1].style.display = "block";
}

//FILTER
filterSelection("all")
function filterSelection(c) {
  var x, i;
  x = document.getElementsByClassName("game");
  if (c == "all") c = "";
  for (i = 0; i < x.length; i++) {
    w3RemoveClass(x[i], "show");
    if (x[i].className.indexOf(c) > -1) w3AddClass(x[i], "show");
  }
}

function w3AddClass(element, name) {
  var i, arr1, arr2;
  arr1 = element.className.split(" ");
  arr2 = name.split(" ");
  for (i = 0; i < arr2.length; i++) {
    if (arr1.indexOf(arr2[i]) == -1) {element.className += " " + arr2[i];}
  }
}

function w3RemoveClass(element, name) {
  var i, arr1, arr2;
  arr1 = element.className.split(" ");
  arr2 = name.split(" ");
  for (i = 0; i < arr2.length; i++) {
    while (arr1.indexOf(arr2[i]) > -1) {
      arr1.splice(arr1.indexOf(arr2[i]), 1);
    }
  }
  element.className = arr1.join(" ");
}


// Add active class to the current button (highlight it)
var btnContainer = document.getElementById("myBtnContainer");
var btns = btnContainer.getElementsByClassName("btn");
for (var i = 0; i < btns.length; i++) {
  btns[i].addEventListener("click", function(){
    var current = document.getElementsByClassName("active");
    current[0].className = current[0].className.replace(" active", "");
    this.className += " active";
  });
}
