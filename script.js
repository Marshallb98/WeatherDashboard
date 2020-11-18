$( document ).ready(function() {
$("#searchButton").on("click", function (event) {
    event.preventDefault()
    var city = $(".form-control").val()
    console.log(city)
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q="+city+"&appid=43c9d8f852db000dbda20adff5614d08"
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        $("#currentCity").text(response.name+" ("+moment().format('L')+")")
        var tempF = (response.main.temp - 273.15) * 1.80 + 32;
        $("#temp").text("Temperature: " + tempF.toFixed(1)+" °F")
        $("#humidity").text("Humidity: "+response.main.humidity+"%")
        $("#wind-speed").text("Wind Speed: "+response.wind.speed+" MPH")
        console.log(response)
        var lat = response.coord.lat
        var lon = response.coord.lon
        console.log(lon)
        console.log(lat)
        var queryURL2 = "https://api.openweathermap.org/data/2.5/onecall?lat="+lat+"&lon="+lon+"&exclude=minutely&appid=43c9d8f852db000dbda20adff5614d08"
        $.ajax({
            url: queryURL2,
            method: "GET"
        }).then(function (response2) {
            console.log(response2)
            $("#uv-index").text("UV Index: "+response2.current.uvi)
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
});