const apiKey = "a28e7ce6d4d74977a562fb32064425ac";

const apiUrl =
  "https://api.openweathermap.org/data/2.5/forecast?units=metric&q=";
const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");

async function checkWeather(city) {
  const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
  if (response.status == 404) {
    document.querySelector(".error").style.display = "block";
    document.querySelector(".weather").style.display = "none";
    document.querySelector(".daysForecast").style.display = "none";

  } else {
    var data = await response.json();
    console.log(data);

    document.querySelector(".city").innerHTML = data.city.name;

    const dayElements = document.querySelectorAll(".day");
    dayElements.forEach((dayElement, index) => {
      const today = new Date();
      const weekdays = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ];
      let dayOfWeek;

      if (index === 0) {
        dayOfWeek = "Today";
        document.querySelector(".temp").innerHTML =
          Math.round(data.list[0].main.temp) + "°C";
        document.querySelector(".humidity").innerHTML =
          data.list[0].main.humidity + "%";
        document.querySelector(".wind").innerHTML =
          data.list[0].wind.speed + "km/hr";
      } else if (index === 1) {
        dayOfWeek = "Tomorrow";
      } else {
        dayOfWeek = weekdays[(today.getDay() + index) % 7];
      }

      //console.log(dayOfWeek);
      dayElement.querySelector("p").textContent = dayOfWeek;
      dayElement.querySelector(".temp").textContent = `${Math.round(
        data.list[index * 8].main.temp
      )}°C`;
      dayElement.querySelector(".humidity").textContent = `${
        data.list[index * 8].main.humidity
      }%`;
      dayElement.querySelector(".wind").textContent = `${
        data.list[index * 8].wind.speed
      }km/hr`;
    });

    let icon = data.list[0].weather[0].main;
    weatherIcon.src = `images/${icon}.png`;
    document.querySelector(".weather").style.display = "block";
    document.querySelector(".error").style.display = "none";
    document.querySelector(".daysForecast").style.display = "block";
  }
}

searchBtn.addEventListener("click", () => {
  checkWeather(searchBox.value);
});
