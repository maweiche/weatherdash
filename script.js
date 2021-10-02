var mainWeatherContainerEl = document.getElementById("#mainWeatherContainer");
var searchContainerEl = document.getElementById("#searchContainer");
var searchInputEl = document.getElementById("#searchInput");
var fiveDayContainerEl = document.getElementById("#fiveDayContainer");
var submitBtn = document.getElementById("#submitButton");
var day1Card = document.getElementById("#d0Container");
var day2Card = document.getElementById("#d1Container");
var day3Card = document.getElementById("#d2Container");
var day4Card = document.getElementById("#d3Container");
var day5Card = document.getElementById("#d4Container");
var cityName = document.getElementById("#searchInput");


function getAPI () {
    var requestURL = 'api.openweathermap.org/data/2.5/forecast?q='+'{city name}'+'&appid=9df12987c44ceefc6fedbd4add7a8abd'
    // Make fetch() request then loop through the data, creating new HTML elements
    fetch(requestURL)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
            var dayName = document.createElement('article');
            var futureWeatherData = document.createElement('div');

            //Edit these for correct APIT tagging...
            dayName.textContent = data[i].dayName;
            futureWeatherData.textContent = data[i].weatherdatafor5day;
            fiveDayContainerEl.append(dayName);
            fiveDayContainerEl.append(futureWeatherData);

        })
}
submitBtn.addEventListener('click', getAPI);
