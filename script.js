$("#searchButton").on("click", function (event) {
    event.preventDefault()
    var city = $(".form-control").val()
    console.log(city)
    var queryURL = "api.openweathermap.org/data/2.5/weather?q="+city+"&appid=43c9d8f852db000dbda20adff5614d08"
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log(response)
    })
})