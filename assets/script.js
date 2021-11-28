const apiKey = "4d664091c5d3ad248b463f239a1cc951";
var searchButton = document.querySelector("#search-btn");

var searchArr = [];
var searchArrTwo = [];

cityArr = [];

// Search City Function
async function getCityDetails(event) {
  event.preventDefault();
  var searchInput = $("#search-input").val();
  console.log(searchInput, "searchInput");
  try {
    const cityWeatherRes = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${searchInput}&appid=${apiKey}&units=imperial`
    );
    console.log("citywweatherres", cityWeatherRes);
    searchArr = cityWeatherRes.data;
    cityArr.push(cityWeatherRes.data);
  } catch (err) {
    console.log(err);
  }

  //  To Clear Search Input
  $("#forecast-form")[0].reset();
  getMoreDetails();
  saveText();
}

// Details Function
async function getMoreDetails() {
  try {
    const cityWeatherResTwo = await axios.get(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${searchArr.coord.lat}&lon=${searchArr.coord.lon}&units=imperial&appid=${apiKey}`
    );
    console.log("citywweatherrestwo", cityWeatherResTwo);
    searchArrTwo = cityWeatherResTwo.data;
  } catch (err) {
    // handle error
    console.log(err);
  }
  displayForecast();
}

// Display Forecast Function 
function displayForecast() {
  var mainForcastDIV = document.querySelector("#main-forecast");

  var weatherIconElement = document.createElement("img");
  var cityNameElement = document.createElement("h1");
  var dateElement = new Date().toISOString().slice(0, 10);
  document.createElement("h2");
  var tempElement = document.createElement("p");
  var humidElement = document.createElement("p");
  var windElement = document.createElement("p");
  var uvElement = document.createElement("p");

  cityNameElement.innerText = `${searchArr.name}`;
  tempElement.innerText = "Temperature: " + `${searchArr.main.temp}` + "°F";
  humidElement.innerText = "Humidity: " + `${searchArr.main.humidity}` + "%";
  windElement.innerText =
    "Wind Speed: " + `${searchArr.wind.speed}` + " miles/hour";
  uvElement.innerText = "UV Index: " + `${searchArrTwo.current.uvi}`;

  mainForcastDIV.append(
    cityNameElement,
    dateElement,
    tempElement,
    humidElement,
    windElement,
    uvElement
  );
}

// Save Text Function

function saveText() {
  sessionStorage.setItem("search-histories", JSON.stringify(cityArr));
}

function loadHistory() {
  cityArr.forEach(function (index) { });
  var savedTexts = sessionStorage.getItem('texts');
if(!savedTexts) {
        return false;
    }

    savedTexts = JSON.parse(savedTexts);
    console.log(savedTexts, "this is savedTexts");
    textArr = savedTexts;
    loadStorageTexts();
}

