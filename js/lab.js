//When adding a slideshow, please add another "1" to the slide index. so for ex: "[1,1,{insert 1 here}]"
let slideIndex = [1,1];

// When adding a slideshow, please add the name of the slides to this list.
let slideId = ["mario-slides", "sonic-slides"];

//When adding a slideshow, please add another function call and increment the second value ex: showSlides(1, {increment this number});
showSlides(1, 0);
showSlides(1, 1);

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
