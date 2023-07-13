const API_KEY = "7d791a67ce0e5dbd10291c3f911d1173";

// set the color of the background and save it to localStorage
const setTheme = (type) => {
  document.querySelector("body").style.backgroundColor = type;
  window.localStorage.setItem("backgroundColor", type);
};

const getLocation = () => {
  navigator.geolocation.getCurrentPosition(
    (location) => {
      // success
      searchByLatLon(location.coords.latitude, location.coords.longitude);
    },
    () => {
      // get location failure
      console.log("There was an error accessing the location.");
    }
  );
};

// for search by cityName
const displayWeather1 = (data1) => {
  const iconUrl1 = `https://openweathermap.org/img/wn/${data1.weather[0].icon}@4x.png`;
  const currentDate1 = new Date();

  // generate the html template for search by city name with the data received
  const template1 = `<div class="card m-4 min-w-50" style="width: 18rem;" data-containerid=${
    data1.id
  }>
                      
                      
                      <img src="${iconUrl1}" class="card-img-top" alt="Weather icon">
                      <div class="card-body">
                        <h5 class="card-title">${Math.floor(
                          data1.main.temp
                        )}°C in ${data1.name}</h5>
                        <p class="card-text"><em>${
                          data1.weather[0].main
                        }</em></p>
                      </div>
                      <ul class="list-group list-group-flush">
                        <li class="list-group-item">Feels like: ${Math.floor(
                          data1.main.feels_like
                        )}°C</li>
                        <li class="list-group-item">Air pressure: ${
                          data1.main.pressure
                        } hPa</li>
                        <li class="list-group-item">Humidity: ${
                          data1.main.humidity
                        }%</li>
                      </ul>
                      <div class="card-body ">
                        <button class="btn btn-light card-link" data-id=${
                          data1.id
                        }>Delete 🗑️</button>
                      </div>
                    </div>`;

  // hide the no-data div
  document.querySelector(".no-data").style.display = "none";

  // save a reference to the container
  const containerSearch = document.querySelector(".weather-search-list");

  const contentSearch = document.querySelector(
    ".weather-search-list"
  ).innerHTML;

  containerSearch.innerHTML = contentSearch + template1;
};

const saveCity1 = (data1) => {
  const savedData1 = localStorage.getItem("saved-cities1");
  if (savedData1) {
    const parsed = JSON.parse(savedData1);
    // check for duplicates
    if (parsed.find((item) => item.id === data1.id) === undefined) {
      parsed.push(data1);
      localStorage.setItem("saved-cities1", JSON.stringify(parsed));
    }
  } else {
    localStorage.setItem("saved-cities1", JSON.stringify([data1]));
  }
};

// for search by location
const displayWeather2 = (data2) => {
  const iconUrl2 = `https://openweathermap.org/img/wn/${data2.weather[0].icon}@4x.png`;

  // generate the html template with the data received
  const template2 = `<div class="card m-4 min-w-50" style="width: 18rem;" data-containerid=${
    data2.id
  }>
                      
                      <img src="${iconUrl2}" class="card-img-top" alt="Weather icon">
                      <div class="card-body">
                        <h5 class="card-title">${Math.floor(
                          data2.main.temp
                        )}°C in ${data2.name} </h5>
                        <p class="card-text"><em>${
                          data2.weather[0].main
                        }</em></p>
                      </div>
                      <ul class="list-group list-group-flush">
                        <li class="list-group-item">Feels like: ${Math.floor(
                          data2.main.feels_like
                        )}°C</li>
                        <li class="list-group-item">Air pressure: ${
                          data2.main.pressure
                        } hPa</li>
                        <li class="list-group-item">Humidity: ${
                          data2.main.humidity
                        }%</li>
                      </ul>
                      <div class="card-body ">
                        <button class="btn btn-light card-link" data-id=${
                          data2.id
                        }>Delete 🗑️</button>
                      </div>
                    </div>`;

  // hide the no-data div
  document.querySelector(".no-data").style.display = "none";

  // save a reference to the container
  const containerLocate = document.querySelector(".weather-locate-list");

  const contentLocate = document.querySelector(".weather-locate-list");

  containerLocate.innerHTML = template2;
};

const saveCity2 = (data2) => {
  const savedData2 = localStorage.getItem("saved-cities2");
  if (savedData2) {
    const parsed = JSON.parse(savedData2);
    // check for duplicates
    if (parsed.find((item) => item.id === data1.id) === undefined) {
      parsed.push(data2);
      localStorage.setItem("saved-cities2", JSON.stringify(parsed));
    }
  } else {
    localStorage.setItem("saved-cities2", JSON.stringify([data2]));
  }
};

// search for city weather
const searchByCityName = () => {
  const searchBox = document.querySelector("#address");

  const value = searchBox.value;

  const url1 = `https://api.openweathermap.org/data/2.5/weather?q=${value}&appid=${API_KEY}&units=metric`;

  // fecth the weather data
  fetch(url1)
    .then((res1) => res1.json())
    .then((data1) => {
      const cities = Array.from(document.querySelectorAll(".card"));
      if (
        cities.find(
          (city) =>
            city.getAttribute("data-containerid") === data1.id.toString()
        ) === undefined
      ) {
        displayWeather1(data1);
        saveCity1(data1);
      } else {
        window.alert("You already selected this city!!!");
      }
    });
};

// search by location weather
const searchByLatLon = (lat, lon) => {
  const url2 = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;

  // fecth the weather data
  fetch(url2)
    .then((res2) => res2.json())
    .then((data2) => {
      const cities = Array.from(document.querySelectorAll(".card"));
      if (
        cities.find(
          (city) => city.getAttribute("data-containerid") === data2.id
        ) === undefined
      ) {
        displayWeather2(data2);
        saveCity2(data2);
      }
    });
};

const initialize = () => {
  // add event listeners to the 2 buttons
  document
    .querySelector(".btn-light-theme")
    .addEventListener("click", () => setTheme("white"));
  document
    .querySelector(".btn-dark-theme")
    .addEventListener("click", () => setTheme("gray"));

  // show print dialog
  document
    .querySelector(".btn-print")
    .addEventListener("click", () => window.print());

  // get user location
  document.querySelector(".btn-locate").addEventListener("click", getLocation);

  // search by city / address name
  document
    .querySelector(".btn-search")
    .addEventListener("click", searchByCityName);

  // get saved color from localstorage
  const color = window.localStorage.getItem("backgroundColor");

  if (color !== null) {
    setTheme(color);
  }

  document
    .querySelector(".weather-search-list")
    .addEventListener("click", (event) => {
      const id = event.target.getAttribute("data-id");

      if (id) {
        const savedData1 = localStorage.getItem("saved-cities1");
        const parsed1 = JSON.parse(savedData1);

        document.querySelectorAll(".card").forEach((card) => {
          if (card.getAttribute("data-containerid") === id) {
            card.style.display = "none";
            localStorage.removeItem("saved-cities1");
          }
        });
      }
    });

  document
    .querySelector(".weather-locate-list")
    .addEventListener("click", (event) => {
      const id = event.target.getAttribute("data-id");

      if (id) {
        const savedData2 = localStorage.getItem("saved-cities2");
        const parsed2 = JSON.parse(savedData2);

        document.querySelectorAll(".card").forEach((card) => {
          if (card.getAttribute("data-containerid") === id) {
            card.style.display = "none";
            localStorage.removeItem("saved-cities2");
          }
        });
      }
    });

  // Load previous saved cities and display them

  const savedData1 = localStorage.getItem("saved-cities1");

  if (savedData1) {
    const parsed1 = JSON.parse(savedData1);
    parsed1.forEach((city) => displayWeather1(city));
  }

  const savedData2 = localStorage.getItem("saved-cities2");
  if (savedData2) {
    const parsed2 = JSON.parse(savedData2);
    parsed2.forEach((city) => displayWeather2(city));
  }

  // reset page
  document.querySelector(".btn-reset").addEventListener("click", () => {
    window.location.reload();
  });
};
