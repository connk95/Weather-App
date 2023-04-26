const app = document.getElementById("app");
const search = document.getElementById("thisCity");

const fetchData = async (city) => {
  const response = await fetch(
    `https://api.weatherapi.com/v1/current.json?key=636289fa65634473b7205144231904&q=${city}`,
    { mode: "cors" }
  );
  const weatherData = await response.json();
  console.log(weatherData);
  return weatherData;
};

const displayData = async (citySearch) => {
  try {
    const data = await fetchData(citySearch);
    const city = document.createElement("h1");
    app.appendChild(city);
    city.innerHTML = `${data.location.name}, ${data.location.country}`;

    const cond = document.createElement("p");
    app.appendChild(cond);
    cond.innerHTML = data.current.condition.text;

    const tempDiv = document.createElement("div");
    tempDiv.id = "tempDiv";
    const temp = document.createElement("h2");
    const deg = document.createElement("p");
    const icon = document.createElement("img");
    icon.id = "icon";
    let link = `https:${data.current.condition.icon}`;
    icon.src = link;
    app.appendChild(tempDiv);
    tempDiv.appendChild(temp);
    tempDiv.appendChild(deg);
    tempDiv.appendChild(icon);
    temp.innerHTML = Math.round(data.current.temp_c);
    deg.innerHTML = "°C";

    const time = data.current.last_updated;
    const currentHour = time.slice(-5, -3);
    if (6 < currentHour < 19) {
      app.style.backgroundColor = "#87CEEB";
    } else {
      app.style.backgroundColor = "#7d8a96";
    }
    console.log(currentHour);
  } catch (error) {
    alert("Please enter a valid city name and try again.");
  }
};

displayData("tokyo");

document.getElementById("search").addEventListener(
  "keydown",
  (e) => {
    if (e.key === "Enter") {
      displayData(`${search.value}`);
      e.preventDefault();
      while (app.childNodes.length > 2) {
        app.removeChild(app.lastChild);
      }
    }
  },
  false
);
