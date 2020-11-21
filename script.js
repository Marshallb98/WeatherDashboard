
var searchData = []
var previousWeather = ""
if (localStorage.getItem("searchData")) {
    searchData = JSON.parse(localStorage.getItem('searchData'))
    for (var i = 0; i < searchData.length; i++) {
        var historyLi = $("<li class=" + "list-group-item" + ">" + searchData[i] + "</li>")  
        $("#searchHistory").append(historyLi)
        
    }
    
}
previousWeatherLoad(searchData[0])
    // adds the date to the 5 weather displays at the bottom
    $("#futureCast1").text(moment().add(1, 'days').format('L'))
    $("#futureCast2").text(moment().add(2, 'days').format('L'))
    $("#futureCast3").text(moment().add(3, 'days').format('L'))
    $("#futureCast4").text(moment().add(4, 'days').format('L'))
    $("#futureCast5").text(moment().add(5, 'days').format('L'))
    // when the button is clicked
    $("#searchButton").on("click", function (event) {
        event.preventDefault()
        var city = $(".form-control").val()
        console.log(city)
        var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=43c9d8f852db000dbda20adff5614d08"
        // retrieve the data from this api
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            // creates a li element with the name under the search bar
            var liEl = $("<li class=" + "list-group-item" + ">" + response.name + "</li>")
            $("#searchHistory").prepend(liEl)
            searchData.unshift(response.name)
            console.log(searchData)
            if (searchData.length >= 5){
                searchData.pop()
            }
            localStorage.setItem('searchData', JSON.stringify(searchData))
            // adds icon right next to the current data that displays how it looks outside
            var currentImg = $("<img>")
            $("#currentCity").text(response.name + " (" + moment().format('dddd') + ")").append(currentImg.attr("src", "http://openweathermap.org/img/wn/" + response.weather[0].icon + "@2x.png"))
            // turns temp from kelvin to fahrenheit
            var tempF = (response.main.temp - 273.15) * 1.80 + 32;
            // takes the temp humidity and windspeed from data pulled and displays it
            $("#temp").text("Temperature: " + tempF.toFixed(1) + " °F")
            $("#humidity").text("Humidity: " + response.main.humidity + "%")
            $("#wind-speed").text("Wind Speed: " + response.wind.speed + " MPH")
            console.log(response)
            // takes the lat and lon to plug them into second ajax call
            var lat = response.coord.lat
            var lon = response.coord.lon
            console.log(lon)
            console.log(lat)
            var queryURL2 = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&exclude=minutely&appid=43c9d8f852db000dbda20adff5614d08"
            $.ajax({
                url: queryURL2,
                method: "GET"
            }).then(function (response2) {
                console.log(response2)
                // takes uv index and color codes it according to severity
                $("#uv-index").text(response2.current.uvi)

                if (response2.current.uvi <= 2.99) {
                    $("span").removeClass("badge badge-danger")
                    $("span").removeClass("badge badge-warning")
                    $("span").addClass("badge badge-success")
                }
                else if (response2.current.uvi <= 7.99) {
                    $("span").removeClass("badge badge-success")
                    $("span").removeClass("badge badge-danger")
                    $("span").addClass("badge badge-warning")
                }
                else {
                    $("span").removeClass("badge badge-success")
                    $("span").removeClass("badge badge-warning")
                    $("span").addClass("badge badge-danger")
                }
                // takes the weather data for next 5 days and displays them
                for (var i = 1; i < 6; i++) {
                    var futureTemp = (response2.daily[i].temp.day - 273.15) * 1.80 + 32
                    var futureHumidity = (response2.daily[i].humidity)
                    var futureImg = ("http://openweathermap.org/img/wn/" + response2.daily[i].weather[0].icon + "@2x.png")
                    console.log(futureImg)
                    $("#tempDay" + [i]).text("Temp: " + futureTemp.toFixed(2) + " °F")
                    $("#humidityDay" + [i]).text("Humidity: " + futureHumidity + "%")
                    $(".img" + [i]).attr("src", futureImg)


                }
            })
        })
    })
    function previousWeatherLoad(city) {
        console.log(city)
        var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=43c9d8f852db000dbda20adff5614d08"
        // retrieve the data from this api
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            // adds icon right next to the current data that displays how it looks outside
            var currentImg = $("<img>")
            $("#currentCity").text(response.name + " (" + moment().format('dddd') + ")").append(currentImg.attr("src", "http://openweathermap.org/img/wn/" + response.weather[0].icon + "@2x.png"))
            // turns temp from kelvin to fahrenheit
            var tempF = (response.main.temp - 273.15) * 1.80 + 32;
            // takes the temp humidity and windspeed from data pulled and displays it
            $("#temp").text("Temperature: " + tempF.toFixed(1) + " °F")
            $("#humidity").text("Humidity: " + response.main.humidity + "%")
            $("#wind-speed").text("Wind Speed: " + response.wind.speed + " MPH")
            console.log(response)
            // takes the lat and lon to plug them into second ajax call
            var lat = response.coord.lat
            var lon = response.coord.lon
            console.log(lon)
            console.log(lat)
            var queryURL2 = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&exclude=minutely&appid=43c9d8f852db000dbda20adff5614d08"
            $.ajax({
                url: queryURL2,
                method: "GET"
            }).then(function (response2) {
                console.log(response2)
                // takes uv index and color codes it according to severity
                $("#uv-index").text(response2.current.uvi)

                if (response2.current.uvi <= 2.99) {
                    $("span").removeClass("badge badge-danger")
                    $("span").removeClass("badge badge-warning")
                    $("span").addClass("badge badge-success")
                }
                else if (response2.current.uvi <= 7.99) {
                    $("span").removeClass("badge badge-success")
                    $("span").removeClass("badge badge-danger")
                    $("span").addClass("badge badge-warning")
                }
                else {
                    $("span").removeClass("badge badge-success")
                    $("span").removeClass("badge badge-warning")
                    $("span").addClass("badge badge-danger")
                }
                // takes the weather data for next 5 days and displays them
                for (var i = 1; i < 6; i++) {
                    var futureTemp = (response2.daily[i].temp.day - 273.15) * 1.80 + 32
                    var futureHumidity = (response2.daily[i].humidity)
                    var futureImg = ("http://openweathermap.org/img/wn/" + response2.daily[i].weather[0].icon + "@2x.png")
                    console.log(futureImg)
                    $("#tempDay" + [i]).text("Temp: " + futureTemp.toFixed(2) + " °F")
                    $("#humidityDay" + [i]).text("Humidity: " + futureHumidity + "%")
                    $(".img" + [i]).attr("src", futureImg)


                }
            })
        })
    }
    $("li").on("click",function() {
       var city = $(this).text()
       console.log(city)
        previousWeatherLoad(city)
      });
 

