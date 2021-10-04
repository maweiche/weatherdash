//Main Page Variables
var mainWeatherContainerEl = $("#mainWeatherContainer");
var searchContainerEl = $("#searchContainer");
var searchInput = $("#searchInput");
var searchedCititesList = $("#searchedCitiesList")

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

//Date Variable
var currentDate = moment().format('L');
$("#currentDate").text("(" + currentDate + ")");

//Add event listener to City Search Submit button to grab the Search Input
submitBtn.on("click", function(event){
    event.preventDefault();

    //Take Input
    var cityInput = searchInput.val().trim();

    currentWeatherRequest(cityInput)
    searchedCities(cityInput);
    searchInput.val("");
});
///Add event listener for Clear City Search History



///Search History functionality 
function searchedCities(searchValue) {

    if(searchValue) {
        if (citySearchArray.indexOf(searchValue) === -1) {
            citySearchArray.push(searchValue);

            showArray();
            clearBtn.removeClass("hide");
            mainWeatherContainerEl.removeClass("hide");
        }else{
            var removeIndex = citySearchArray.indexOf(searchValue);
            citySearchArray.splice(removeIndex, 1);
            citySearchArray.push(searchValue);
            showArray();
            clearBtn.removeClass("hide");
            mainWeatherContainerEl.removeClass("hide");
        }
    }
    console.log("city list: ", citySearchArray);
}
//Show City Array
function showArray() {
    searchedCititesList.empty();///clear out existing array
    citySearchArray.forEach(function(city){
        var cityItem = $('<li class="listGroupItem cityBtn">');
        cityItem.attr("data-value", city);
        cityItem.text(city);
        searchedCititesList.prepend(cityItem);    
    });
    localStorage.setItem("cities", JSON.stringify(citySearchArray));
}

///Render Cities from Local Storage
function init() {
    if (localStorage.getItem("cities")){

    }
}


//Function to request API
function currentWeatherRequest(cityInput) {
    var requestURLsolo = 'httpS://api.openweathermap.org/data/2.5/weather?q='+ cityInput +'&units=imperial&appid=9df12987c44ceefc6fedbd4add7a8abd'
    //Ajax call
    $.ajax({
        url: requestURLsolo,
        method: "GET"
    }).then(function(response){
        console.log("this is the response: ", response);
        mainCity.text(response.name);
        mainCity.append("<small class='text-muted' id='currentDate'>");
        $("#currentDate").text("(" + currentDate + ")");
        mainCity.append("<img src='https://openweathermap.org/img/w/" + response.weather[0].icon + ".png' alt ='" + response.weather[0].main + "' />")
        currentTemp.text(response.main.temp);
        currentTemp.append("&deg;F");
        currentHumidity.text(response.main.humidity + "%");
        currentWindSpeed.text(response.wind.speed + "MPH");

        //Get Geo-Coordinates to then call on UV Index
        var lat = response.coord.lat;
        var lon = response.coord.lon;

        var requestURLuv = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + lat + '&lon=' + lon +'&exclude=minutely,hourly,daily,alerts&appid=9df12987c44ceefc6fedbd4add7a8abd';
        //Ajax for UV Index
        $.ajax({
            url: requestURLuv,
            method: "GET"
        }).then(function(response){
            console.log("this is the uv response: ", response.current.uvi)
            UVindex.text(response.current.uvi);
        });

    })
}












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
