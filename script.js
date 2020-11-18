$(document).ready(function () {
    $("#futureCast1").text(moment().add(1, 'days').format('L'))
    $("#futureCast2").text(moment().add(2, 'days').format('L'))
    $("#futureCast3").text(moment().add(3, 'days').format('L'))
    $("#futureCast4").text(moment().add(4, 'days').format('L'))
    $("#futureCast5").text(moment().add(5, 'days').format('L'))
    $("#searchButton").on("click", function (event) {
        event.preventDefault()
        var city = $(".form-control").val()
        console.log(city)
        var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=43c9d8f852db000dbda20adff5614d08"
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            $("#currentCity").text(response.name + " (" + moment().format('L') + ")")
            var tempF = (response.main.temp - 273.15) * 1.80 + 32;
            $("#temp").text("Temperature: " + tempF.toFixed(1) + " °F")
            $("#humidity").text("Humidity: " + response.main.humidity + "%")
            $("#wind-speed").text("Wind Speed: " + response.wind.speed + " MPH")
            console.log(response)
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
                // var uvEl = $("span")
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
                for (var i = 1; i < 6; i++){
                    var futureTemp = (response2.daily[i].temp.day - 273.15) * 1.80 + 32  
                    console.log(futureTemp.toFixed(2))
                    $("#tempDay"+[i]).text(futureTemp.toFixed(2))

                }
            })
        })
    })
    // var city = "san antonio"
    // var res = city.split(" ");
    // console.log(res)
    // for (var i = 0; i < res.length; i++) {
    //     console.log(res[i][0])
    // var firstLetter = res[i][0]
    // res[i][0] = firstLetter.toUpperCase()
    // console.log(res[i])
    // }
})
