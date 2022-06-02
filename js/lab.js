// get my API key
var key = "4336dafda23749c6a0aa1f180ab825fb";
// attatch my API key to my games pull request
var endpoint = "https://api.rawg.io/api/games?key="+key;
// get the generic url for a specific game {attach id to the end}
var specificGameEndpoint = "https://api.rawg.io/api/games/"
// create a variable to store the next set of games to load.
var next;
// get the main body element
var mainEL = $("#main");

var genreNav = $("#Genres");
//This function adds videogame information to my page automatically and when the browser chooses to view more games.
function getAjax(){
  $.ajax({
    url: endpoint,
    type: "GET"
  })
  .done(function(data){
    //console.log(data);

    // go through each game aquired in the API pull
    for(var i = 0; i < data.results.length; i++){
      // create a temporary variable to hold the genres of each game.
      let genres="";
      // loop through each genre the selected game may have
      for(var a = 0; a < data.results[i].genres.length; a++){
          // if we are at the last genre in the games genre array....
          if(a == data.results[i].genres.length - 1){
            //add that genre to the genres variable
            genres += data.results[i].genres[a].slug
          }
          else{//if we are NOT at the last genre in the games genre array....
            //add that genre to the genres variable AND add spacing.
            //The reason im adding spacing is because im going to put these genres inside of a div class list.
            genres += data.results[i].genres[a].slug
            genres += " "
          }
      }
      //console.log("genres:" + genres);

      // Append:
      // the genres to a new div,
      // the id number of the selected game into a new div
      // Inside of THIS new div, place the name of the game.
      // after closing this div, create a new div to put the image in.
      // Finally close the current div and the parent div.
      mainEL.append("<div class='"+genres+"'><div class='bodydiv' id='"+data.results[i].id+"'>"+data.results[i].name+"</div><div class='bodydiv'>"+"<img src='"+data.results[i].background_image+"'></div></div>");

      // get the ID of the currently selected game
      let identifier = data.results[i].id;

      // add a click function to the currently selected game based of off ID number
      $("#"+identifier).click(function(){
        // remember to use the specific game url to get information about the currently selected game!
        $.ajax({
          url: specificGameEndpoint+identifier+"?key="+key,
          type: "GET"
        })
        .done(function(game){
          //once we get detailed information about the game, add a description about the game to the corresponding div (based off of ID)
          $("#"+identifier).append("<p>"+game.description+"</p>");
          // Also add this thing so the website formatting doesnt break
          $("#"+identifier).parent().append("<br style='clear: both'>");
        })
        .fail(function(game){
          console.log("Game description could not be aquired");
        })

      });
    }
    //update the next variable so we can add more games at the click of a button (foreshadowing)
    next = data.next;
  })
  .fail(function(data){
    console.log("something went wrong");
  })
};
//call the function so games are displayed on the website!
getAjax();

// get the load more games button element
$("#loadbutton").click(function(){
  // change the endpoint to the next one so we can get more games.
  endpoint = next;
  // call the getAjax function which will add more games to the site.
  getAjax();
});

//When the genres button is clicked...
genreNav.click(function(){
  //loop through through all genre divs
  genreNav.children().each(function(){
    //hide and show them accordingly.
    $(this).toggle();
  });
});

// this function determines what games will be shown. takes a div id
function filter(id){
  // get all the games on the site
  mainEL.children().each(function(){

    // get their genre(s) and put them in an array.
    let genres = $(this).attr('class').split(" ");

    //if the id is all, show all the games
    if(id == "all"){
      $(this).show();
    }
    else{//if the id isn't all....
      //loop through the genre(s) of the game
      for(let i = 0; i < genres.length; i++){
        //if the game does not fall under the prompted genre...
        if( id != genres[i]){
          //and if the game has no other genres...
          if(i == genres.length - 1){
            //hide the game
            $(this).hide();
          }
        }
        else{//if the game does fall under the prompted genre...

          //show the game and break out of the loop.
          $(this).show();
          break;
        }
      }
    }
  });
};

//this is just a bunch of click events for each genre.
$("#all").click(function(){
  filter($("#all").attr('id'));
});
$("#action").click(function(){
  filter($("#action").attr('id'));
});
$("#indie").click(function(){
  filter($("#indie").attr('id'));
});
$("#adventure").click(function(){
  filter($("#adventure").attr('id'));
});
$("#role-playing-games-rpg").click(function(){
  filter($("#role-playing-games-rpg").attr('id'));
});
$("#strategy").click(function(){
  filter($("#strategy").attr('id'));
});
$("#shooter").click(function(){
  filter($("#shooter").attr('id'));
});
$("#casual").click(function(){
  filter($("#casual").attr('id'));
});
$("#simulation").click(function(){
  filter($("#simulation").attr('id'));
});
$("#puzzle").click(function(){
  filter($("#puzzle").attr('id'));
});
$("#arcade").click(function(){
  filter($("#arcade").attr('id'));
});
$("#platformer").click(function(){
  filter($("#platformer").attr('id'));
});
$("#racing").click(function(){
  filter($("#racing").attr('id'));
});
$("#massively-multiplayer").click(function(){
  filter($("#massively-multiplayer").attr('id'));
});
$("#sports").click(function(){
  filter($("#sports").attr('id'));
});
$("#fighting").click(function(){
  filter($("#fighting").attr('id'));
});
$("#family").click(function(){
  filter($("#family").attr('id'));
});
$("#board-games").click(function(){
  filter($("#board-games").attr('id'));
});
$("#educational").click(function(){
  filter($("#educational").attr('id'));
});
$("#card").click(function(){
  filter($("#card").attr('id'));
});


// SEARCH BAR

function myFunction() {
    var input, filter, ul, li, a, i, txtValue;
    input = $("#myInput").val();
    filter = input.toUpperCase();
    ul = $("#myUL");
    li = $("#li");
    for (i = 0; i < li.length; i++) {
        a = li[i].$("#a")[0];
        txtValue = a.textContent || a.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
            li[i].style.display = "";
        } else {
            li[i].style.display = "none";
        }
    }
}
