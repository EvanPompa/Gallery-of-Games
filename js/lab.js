// Get my API key
var key = "4336dafda23749c6a0aa1f180ab825fb";
// Attatch my API key to my games pull request
var endpoint = "https://api.rawg.io/api/games?key="+key;
// Get the generic url for a specific game {attach id to the end}
var specificGameEndpoint = "https://api.rawg.io/api/games/"
// Create a variable to store the next set of games to load.
var next;
// Get the main body element
var mainEL = $("#main");
// Get the element that holds genres.
var genreNav = $("#Genres");
// Get the search results element.
var resultsEL = $("#results");

// This function adds videogame information to my page automatically and when the browser chooses to view more games.
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
      let genres = getGameGenres(i, data);
      //console.log("genres:" + genres);

      // Append:
      // the genres to a new div,
      // the id number of the selected game into a new div
      // Inside of THIS new div, place the name of the game.
      // after closing this div, create a new div to put the image in.
      // Finally close the current div and the parent div.
      mainEL.append("<div class='"+genres+"' id='"+data.results[i].slug+"'><div class='bodydiv' id='"+data.results[i].id+"'><h2 class='gameName'>"+data.results[i].name+"</h2><div></div></div><div class='bodydiv'>"+"<img src='"+data.results[i].background_image+"'></div><br style='clear: both'></div>");

      // get the ID of the currently selected game
      let identifier = data.results[i].id;

      // add a click function to the currently selected game based of off ID number
      $("#"+identifier).click(function(){
        applyDescription(identifier);
      });
      //Styling with hover for better user experience
      $(".gameName").hover(function(){
        $(this).css("color", "yellow");
      }, function(){
        $(this).css("color", "white");
      });
    }
    //update the next variable so we can add more games at the click of a button (foreshadowing)
    next = data.next;
  })
  .fail(function(data){
    console.log("something went wrong");
  })
};

// This function determines what games will be shown. takes a div id
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

// This function shows games that the user searches for and prepends them to the main page.
function gameSearch(inquiry){
  //Take the users inquiry and use the built in search command.
  $.ajax({
    url:"https://rawg.io/api/games?search='"+inquiry+"'&key=4336dafda23749c6a0aa1f180ab825fb",
    type: "GET"
  })
  .done(function(data){

    // append the name of each game to the search bar elements div.
    for(var i = 0; i < data.results.length; i++){

      // get the game genres for the chosen game
      let genres = getGameGenres(i, data);

      // append the names of the game to dropdown search bar divs.
      resultsEL.append("<div class='searchResult' id='"+data.results[i].id+"TEMP'>"+data.results[i].name+"</div>");

      // get the id,name,and background image of the game.
      let identifier = data.results[i].id;
      let gameName = data.results[i].name;
      let picture = data.results[i].background_image;
      let slug = data.results[i].slug;

      //Styling with hover for better user experience
      $(".searchResult").hover(function(){
        $(this).css("color", "blue");
      }, function(){
        $(this).css("color", "black");
      });

      // When the user selects a game.....
      $("#"+identifier+"TEMP").click(function(){

        // Check to see if the game is already on the site.
        let gameIndicator = false;
        mainEL.children().each(function(){
          if($(this).attr("id") == slug){
            gameIndicator = true;
          }
        });

        //If the game is not on the site, display the game.
        if(gameIndicator == false){
          // add the selected game to the website.
          mainEL.prepend("<div class='"+genres+"' id='"+slug+"'><div class='bodydiv' id='"+identifier+"'><h2 class='gameName'>"+gameName+"</h2><div></div></div><div class='bodydiv'>"+"<img src='"+picture+"'></div><br style='clear: both'></div>");

          //if the user clicks the selected game on the website...
          $("#"+identifier).click(function(){
            // apply the desription to the div.
            applyDescription(identifier);
          });
          //Styling with hover for better user experience
          $(".gameName").hover(function(){
            $(this).css("color", "yellow");
          }, function(){
            $(this).css("color", "white");
          });
        }

        // empty out the search div so its clear.
        resultsEL.empty();
      });
    };
  })
  .fail(function(data){
    console.log("Games not found");
  })
}

// This function gets the genres of games.
function getGameGenres(index, data){
  // create a temporary variable to hold the genres of each game.
  let genres="";
  // loop through each genre the selected game may have
  for(var a = 0; a < data.results[index].genres.length; a++){
      // if we are at the last genre in the games genre array....
      if(a == data.results[index].genres.length - 1){
        //add that genre to the genres variable
        genres += data.results[index].genres[a].slug
      }
      else{//if we are NOT at the last genre in the games genre array....
        //add that genre to the genres variable AND add spacing.
        //The reason im adding spacing is because im going to put these genres inside of a div class list.
        genres += data.results[index].genres[a].slug
        genres += " "
      }
  }
  //return the genres of the game
  return genres;
};

// This function appends the description to an element
function applyDescription(identifier){
  // remember to use the specific game url to get information about the currently selected game!
  $.ajax({
    url: specificGameEndpoint+identifier+"?key="+key,
    type: "GET"
  })
  .done(function(game){
    //once we get detailed information about the game, add a description about the game to the corresponding div (based off of ID)
    $("#"+identifier+" > div").html("<p>"+game.description+"</p>");
    // Also add this thing so the website formatting doesnt break
  })
  .fail(function(game){
    console.log("Game description could not be aquired");
  })
};

// This is just a bunch of click events for each genre.
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

// Load more games when the user clicks this button and append them to the page.
$("#loadbutton").click(function(){
  // change the endpoint to the next one so we can get more games.
  endpoint = next;
  // call the getAjax function which will add more games to the site.
  getAjax();
});

// Allow the user to sort by genre.
genreNav.click(function(){
  //loop through through all genre divs
  genreNav.children().each(function(){
    //hide and show them accordingly.
    $(this).toggle();
  });
});

// Search for games when the users hits enter.
$("#myInput").keypress(function(key){
  let code = key.keyCode || key.which;
  if(code == 13){
    gameSearch($("#myInput").val());
  }
});

// Call the function so games are displayed on the website!
getAjax();

//Styling with hover for better user experience
$(".menuObject").hover(function(){
  $(this).css("color", "yellow");
}, function(){
  $(this).css("color", "white");
});
