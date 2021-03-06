//Main Page Variables
var mainWeatherContainerEl = $("#mainWeatherContainer");
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

//Search Local Storage for searched city history
init();

//Add a click function to City Search Submit button to grab the Search Input
submitBtn.on("click", function(event){
    event.preventDefault();

    //Take Input
    var cityInput = searchInput.val().trim();

    currentWeatherRequest(cityInput)
    searchedCities(cityInput);
    searchInput.val("");
});

//Add a click function to the city in the search bar 
searchedCititesList.on("click","li.cityBtn", function(event){
    var value = $(this).data("value");
    currentWeatherRequest(value);
    searchedCities(value);
})

//Add function to enter
$(document).on("submit", function() {
    event.preventDefault();
    var cityInput = searchInput.val().trim();
    currentWeatherRequest(cityInput)
    searchedCities(cityInput);
    searchInput.val("");
})

///Add event listener for Clear City Search History
clearBtn.on("click", function(){
    citySearchArray = [];
    showArray();

    $(this).addClass("hide");
});


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
        citySearchArray = JSON.parse(localStorage.getItem("cities"));
        var lastCity = citySearchArray.length -1;
        showArray();

        if (citySearchArray.length !== 0){
            currentWeatherRequest(citySearchArray[lastCity]);
            mainWeatherContainerEl.removeClass("hide");
        }
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
        mainCity.append("<small class='bold' id='currentDate'>");
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
            ////If statement to change text color depending on severity of UV
            if (response.current.uvi <= 3) {
                UVindex.addClass('green');
            }
            else if (response.current.uvi >= 6) {
                UVindex.addClass('severe');
            }else {
                UVindex.addClass('moderate');
            };
        });

    


    // var fiveDayURL = "https://api.openweathermap.org/data/2.5/forecast?&units=imperial&appid=9df12987c44ceefc6fedbd4add7a8abd" + "&lat=" + lat + "&lon=" + lon;
        var fiveDayURL = 'httpS://api.openweathermap.org/data/2.5/forecast?q='+ cityInput +'&units=imperial&appid=9df12987c44ceefc6fedbd4add7a8abd'    


    //Ajax for 5 day forecast
    $.ajax({
        url: fiveDayURL,
        method: "GET"
    }).then(function(response){

        console.log("this is the response for 5 day: ", response);
        $('#fiveDayContainer').empty();
        for (var i = 1; i < response.list.length; i+=8) {

            var fiveDayString = moment(response.list[i].dt_txt).format("L");
            console.log("5 day string: ", fiveDayString);

            ///Variables of 5 day container cards
            var fiveDayColumn = $("<div class='col-12 col-md-6 col-lg mb-3'>");
            var fiveDayCard = $("<div class='card'>");
            var fiveDayBody = $("<div class='card-body'>");
            var fiveDayDate = $("<h6 class='card-title'>");
            var fiveDayIcon = $("<img>");
            var fiveDayTemp = $("<p class='card-text mb-0'>");
            var fiveDayHum = $("<p class='card-text mb-0'>");
/////====================================================
            ///Append all the 5 day variables to the page
            $('#fiveDayContainer').append(fiveDayColumn);
            fiveDayColumn.append(fiveDayCard);
            fiveDayColumn.append(fiveDayBody);

            fiveDayBody.append(fiveDayDate);
            fiveDayBody.append(fiveDayIcon);
            fiveDayBody.append(fiveDayTemp);
            fiveDayBody.append(fiveDayHum);

            fiveDayIcon.attr("src", "https://openweathermap.org/img/w/" + response.list[i].weather[0].icon + ".png");
            fiveDayIcon.attr("alt", response.list[i].weather[0].main);

            fiveDayDate.text(fiveDayString);

            fiveDayTemp.text(response.list[i].main.temp);
            // console.log("this is 5 day temp: ", fiveDayTemp);///////////
            fiveDayTemp.prepend("Temp: ");
            fiveDayTemp.append("&deg;F");
            
            fiveDayHum.text(response.list[i].main.humidity);
            fiveDayHum.prepend("Humidity: ");
            fiveDayHum.append("%");


        }
    })
})
}







