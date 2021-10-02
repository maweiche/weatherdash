var mainWeatherContainerEl = document.getElementById("#mainWeatherContainer");
var searchContainerEl = document.getElementById("#searchContainer");
var searchInputEl = document.getElementById("#searchInput");
var fiveDayContainerEl = document.getElementById("#fiveDayContainer");
var submitBtn = document.getElementById('submitButton');
var day1Card = document.getElementById("#d0Container");
var day2Card = document.getElementById("#d1Container");
var day3Card = document.getElementById("#d2Container");
var day4Card = document.getElementById("#d3Container");
var day5Card = document.getElementById("#d4Container");

var cityName = "Raleigh";
var requestURL5day = 'https://api.openweathermap.org/data/2.5/forecast?q='+cityName+'&appid=9df12987c44ceefc6fedbd4add7a8abd'
var requestURLsolo = 'httpS://api.openweathermap.org/data/2.5/weather?q='+cityName+'&appid=9df12987c44ceefc6fedbd4add7a8abd'


$(document).ready(function() {

    var citySearchArray = ["Raleigh"];

    //function to make buttons appear on the page
    function populateElements(citySearchArray, classToAdd, areaToAddTo) {
        $(areaToAddTo).empty();

        for (var i = 0; citySearchArray.length; i++) {
            var newCityButton = $("<button>");
            newCityButton.addClass(classToAdd);
            newCityButton.attr("data-type", citySearchArray[i]);
            newCityButton.text(citySearchArray[i]);
            $(areaToAddTo).append(newCityButton);
        }
    }
    
    $(document).on("click", ".city-button", function(event) {
        $("#cities").empty();
        $(".city-button").removeClass("active")
        $(this).addClass("active");

        var type = $(this).attr("data-type");
        var requestURLsolo = 'httpS://api.openweathermap.org/data/2.5/weather?q='+cityName+'&appid=9df12987c44ceefc6fedbd4add7a8abd'

        $.ajax({
            url: requestURLsolo,
            method: "GET"
        })
            .then(function(response) {
                var results = response.data;

                for (var i = 0; i < results.length; i++) {
                    var weatherSoloDiv = $("<div class=\"weather\">")
                    var cityName = results[i].name;
                    var temperature = results[i].main.temp;
                    var windSpeed = results [i].wind.speed;

                    var p = $("<p>").text(cityName, temperature, windSpeed)

                    weatherSoloDiv.append(p);
                }
            })
    })
    // add new city button?
    $("#add-city").on("click", function(event) {
        event.preventDefault();

        var newCity = $("input").eq(0).val();
        var newCity = $("#city-input").val();

        if (newCity.length > 2) {
            citySearchArray.push(newCity)
        }

        populateElements(citySearchArray, "city-button", "#city-buttons");
    });
    populateElements(citySearchArray, "city-button", "#city-buttons");
})

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
