//Main Page Variables
var mainWeatherContainerEl = $("#mainWeatherContainer");
var searchContainerEl = $("#searchContainer");
var searchInput = $("#searchInput");

var submitBtn = $("#submitButton");
var clearBtn = $("#clearButton");

var fiveDayContainerEl = $("#fiveDayContainer");
var mainCity = $("#mainCity");
var currentTemp = $("#currentTemp");
var currentHumidity = $("#currentHumidity");
var currentWindSpeed = $("#currentWindSpeed");
var UVindex = $("#uvIndex")

//API Key for OpenWeatherAPI
var APIkey = "9df12987c44ceefc6fedbd4add7a8abd";

//Empty Array to start for City Searches
var citySearchArray = [];

var requestURL5day = 'https://api.openweathermap.org/data/2.5/forecast?q='+cityName+'&appid=9df12987c44ceefc6fedbd4add7a8abd'
var requestURLsolo = 'httpS://api.openweathermap.org/data/2.5/weather?q='+cityName+'&appid=9df12987c44ceefc6fedbd4add7a8abd'


$(document).ready(function() {

    

    //function to make buttons appear on the page
    function populateElements(citySearchArray, classToAdd, areaToAddTo) {
        $(areaToAddTo).empty();

        for (var i = 0; i < citySearchArray.length; i++) {
            var newCityButton = $("<button>");
            newCityButton.addClass(classToAdd);
            newCityButton.attr("data-type", citySearchArray[i]);
            newCityButton.text(citySearchArray[i]);
            $(areaToAddTo).append(newCityButton);
        }
    }
    
    // $(document).on("click", ".city-button", function(event) {
    //     $("#cities").empty();
    //     $(".city-button").removeClass("active")
    //     $(this).addClass("active");

    //     var type = $(this).attr("data-type");
    //     var requestURLsolo = 'httpS://api.openweathermap.org/data/2.5/weather?q='+cityName+'&appid=9df12987c44ceefc6fedbd4add7a8abd'

    //     $.ajax({
    //         url: requestURLsolo,
    //         method: "GET"
    //     })
    //         .then(function(response) {
    //             var results = response.data;

    //             for (var i = 0; i < results.length; i++) {
    //                 var weatherSoloDiv = $("<div class=\"weather\">")
    //                 var cityName = results[i].name;
    //                 var temperature = results[i].main.temp;
    //                 var windSpeed = results [i].wind.speed;

    //                 var p = $("<p>").text(cityName, temperature, windSpeed)

    //                 weatherSoloDiv.append(p);

    //                 $("#cities").append(weatherSoloDiv);
    //                 console.log(results);
    //             }
    //         })
    // })
    // add new city button?
    $("#add-city").on("click", function(event) {
        event.preventDefault();

        // var newCity = $("input").eq(0).val();
        // var newCity = $("#city-input").val();
        var newCity = "Raleigh";


        if (newCity.length > 2) {
            citySearchArray.push(newCity)
        }

        populateElements(citySearchArray, "city-button", "#city-buttons");
    });

    //main weather display====================
    // function loadMainWeather() {
    //     var type = $(this).attr("data-type");
        // var requestURLsolo = 'httpS://api.openweathermap.org/data/2.5/weather?q='+cityName+'&appid=9df12987c44ceefc6fedbd4add7a8abd'
        //Test Link
    //     var requestURLsolo = 'httpS://api.openweathermap.org/data/2.5/weather?q=raleigh&appid=9df12987c44ceefc6fedbd4add7a8abd'

    //     $.ajax({
    //         url: requestURLsolo,
    //         method: "GET"
    //     })
    //         .then(function(response) {
    //             var soloResults = response.data;
    //             console.log(soloResults);
    //             for (var i = 0; i < soloResults.length; i++) {
    //                 var weatherSoloDiv = $("<div class=\"weather\">")
    //                 var cityName = results[i].name;
    //                 var temperature = results[i].main.temp;
    //                 var windSpeed = results [i].wind.speed;

    //                 var p = $("<p>").text(cityName, temperature, windSpeed)

    //                 weatherSoloDiv.append(p);

    //                 $("#cities").append(weatherSoloDiv);
    //                 console.log(results);
    //             }
    //         })
    // }
    ////////////=============
   function loadMainWeather (event){

   
    var type = $(this).attr("data-type");
    var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + type + "&api_key=BkaUZZWcFij6J7AoQj3WtPb1R2p9O6V9&limit=10";

    $.ajax({
        url: queryURL,
        method: "GET"
      })
        .then(function(response) {
          var results = response.data;
  
          for (var i = 0; i < results.length; i++) {
            var animalDiv = $("<div class=\"animal-item\">");
  
            var rating = results[i].rating;
  
            var p = $("<p>").text("Rating: " + rating);
  
            var animated = results[i].images.fixed_height.url;
            var still = results[i].images.fixed_height_still.url;
  
            var animalImage = $("<img>");
            animalImage.attr("src", still);
            animalImage.attr("data-still", still);
            animalImage.attr("data-animate", animated);
            animalImage.attr("data-state", "still");
            animalImage.addClass("animal-image");
  
            animalDiv.append(p);
            animalDiv.append(animalImage);
  
            $("#animals").append(animalDiv);
          }
        });
    };
    loadMainWeather();
    populateElements(citySearchArray, "city-button", "#city-buttons");
    });



// function getAPI () {
//     // console.log(requestURL5day);
//     // Make fetch() request then loop through the data, creating new HTML elements
//     fetch(requestURL5day)
//         .then(function (response) {
//             return response.json();
         
//         })
//         .then(function (data) {
//             for (var i = 0; i < data.length; i++) {
//             var dayName = document.createElement('article');
//             var futureWeatherData = document.createElement('div');

//             //Edit these for correct APIT tagging...
//             dayName.textContent = data[i].forecast.time;
//             console.log(dayName.textContent);
//             futureWeatherData.textContent = data[i].weatherdatafor5day;
//             fiveDayContainerEl.append(dayName);
//             fiveDayContainerEl.append(futureWeatherData);
//             }        
//         });
// }
// // console.log(getAPI);
// submitBtn.addEventListener('click', getAPI(requestURL5day));
