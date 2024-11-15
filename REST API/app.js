const countriesContainer = document.querySelector(".cards-container");
const filterregion = document.querySelector(".filter");
const searchInput = document.querySelector(".serch-container input");
const darkMode = document.querySelector(".theme");
const modeIcon = document.getElementById("modeIcon");

let countriesData;

fetch("https://restcountries.com/v3.1/all")
  .then((res) => res.json())
  .then((data) => {
    renderCountries(data);
    countriesData = data;
  });

filterregion.addEventListener("change", () => {
  fetch(`https://restcountries.com/v3.1/region/${filterregion.value}`)
    .then((res) => res.json())
    .then(renderCountries);
});

function renderCountries(data) {
  countriesContainer.innerHTML = "";
  data.forEach((country) => {
    const countryCard = document.createElement("a");
    countryCard.href = `country.html?name=${country.name.common}`;
    countryCard.classList.add("country-card");

    countryCard.innerHTML = `
      <img src="${country.flags.svg}" alt= "${country.name.common} flag" />
        <div class="card-text">
          <h3 class="card-title">${country.name.common}</h3>
          <p class="card-details"><b>Population: </b>${country.population.toLocaleString(
            "en-IN"
          )}</p>
          <p class="card-details"><b>Region: </b>${country.region}</p>
          <p class="card-details"><b>Capital: </b>${country.capital}</p>
        </div>
`;

    countriesContainer.append(countryCard);
  });
}

searchInput.addEventListener("input", (e) => {
  const filteredCountries = countriesData.filter((country) =>
    country.name.common.toLowerCase().includes(e.target.value.toLowerCase())
  );
  renderCountries(filteredCountries);
});

darkMode.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  const isDarkMode = document.body.classList.contains("dark");

  if (isDarkMode) {
    localStorage.setItem("darkMode", "enabled");
    modeIcon.classList.replace("fa-regular", "fa-solid"); // Switch to moon icon for dark mode
  } else {
    localStorage.setItem("darkMode", "disabled");
    modeIcon.classList.replace("fa-solid", "fa-regular"); // Switch to sun icon for light mode
  }
});

window.addEventListener("DOMContentLoaded", () => {
  if (localStorage.getItem("darkMode") === "enabled") {
    document.body.classList.add("dark");
    modeIcon.classList.replace("fa-regular", "fa-solid");
  } else {
    modeIcon.classList.replace("fa-solid", "fa-regular");
  }
});
