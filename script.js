let weather = {
  apiKey: "133ff5aab6e4f6b0abf6bd7c5eb35118",
  fetchWeather: function (zipcode) {
    fetch(
      "https://api.openweathermap.org/data/2.5/weather?zip=" +
        zipcode +
        ",us&appid=" +
        this.apiKey +
        "&units=imperial"
    )
      .then((response) => response.json())
      .then((data) => this.displayWeather(data));
  },
  displayWeather: function (data) {
    const { name } = data; // name is the variable for the city in our api
    const { icon, description } = data.weather[0]; // .weather[0] bc we need to find it in the array "weather"
    const { temp, humidity } = data.main;
    const { speed } = data.wind;
    console.log(name, icon, description, temp, humidity, speed);
    document.querySelector(".city").innerText = "Weather in " + name; // ".city" bc city is the class name in the html docs
    document.querySelector(".icon").src =
      "http://openweathermap.org/img/wn/" + icon + ".png";
    document.querySelector(".temp").innerText = Math.round(temp) + "°F";
    document.querySelector(".description").innerText = description;
    document.querySelector(".humidity").innerText =
      "Humidity: " + humidity + "%";
    document.querySelector(".wind").innerText = "Wind Speed: " + speed + " mph";
    document.querySelector(".weather").classList.remove("loading"); // removing line 64 of css
    document.body.style.backgroundImage =
      "url('https://source.unsplash.com/1600x900/?" + name + "')";
  },
  search: function () {
    let zip = document.querySelector(".search-bar").value;
    if (zip.length !== 5 || isNaN(zip)) {
      console.log("Invalid Zipcode");
      let errorMessage = document.getElementById("error-message");
      errorMessage.innerHTML = "Invalid input. Please try again.";
      errorMessage.style.display = "block";
      return;
    } else {
      this.fetchWeather(zip); // fetch weather based on the users search
    }
  },
};

document.querySelector(".search button").addEventListener("click", function () {
  // below is code to clear it, if there is an error message
  let errorMessage = document.getElementById("error-message");
  errorMessage.innerHTML = "";
  errorMessage.style.display = "none";
  weather.search(); // weather is the class, search is the function we want to use. Search calls fetch which calls display
});

document
  .querySelector(".search-bar")
  .addEventListener("keyup", function (event) {
    if (event.key == "Enter") {
      let errorMessage = document.getElementById("error-message");
      errorMessage.innerHTML = "";
      errorMessage.style.display = "none";
      weather.search();
    }
  });

//weather.fetchWeather("Wappingers Falls");
