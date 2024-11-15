const countryName = new URLSearchParams(location.search).get("name");
const flagImg = document.querySelector(".country-details img");
const countryH2 = document.querySelector(".rightside-title");
const nativeName = document.querySelector(".native-name");
const population = document.querySelector(".population");
const region = document.querySelector(".region");
const subRegion = document.querySelector(".sub-region");
const capital = document.querySelector(".capital");
const currency = document.querySelector(".currency");
const language = document.querySelector(".languages");
const domain = document.querySelector(".top-domain");
const borderCountries = document.querySelector(".border-countries");
const modeIcon = document.getElementById("modeIcon");

fetch(`https://restcountries.com/v3.1/name/${countryName}?fullText=true`)
  .then((res) => res.json())
  .then(([country]) => {
    flagImg.src = country.flags.svg;
    flagImg.style.boxShadow =
      "rgba(0, 0, 0, 0.16) 0px 0px 6px, rgba(0, 0, 0, 0.23) 0px 0px 3px 0px";
    countryH2.innerText = country.name.common;
    console.log(country);

    population.innerText = country.population.toLocaleString("en-IN");
    region.innerText = country.region;
    domain.innerText = country.tld.join(", ");

    if (country.subregion) {
      subRegion.innerText = country.subregion;
    } else {
      subRegion.innerText = "NA";
    }

    if (country.name.nativeName) {
      nativeName.innerText = Object.values(country.name.nativeName)[0].official;
    } else {
      nativeName.innerText = country.name.common;
    }

    if (country.currencies) {
      currency.innerText = Object.values(country.currencies)
        .map((currency) => currency.name)
        .join(", ");
    } else {
      currency.innerText = "NA";
    }

    if (country.languages) {
      language.innerText = Object.values(country.languages).join(", ");
    } else {
      language.innerText = "NA";
    }

    if (country.capital) {
      capital.innerText = country.capital;
    } else {
      capital.innerText = "NA";
    }

    if (country.borders) {
      country.borders.forEach((border) => {
        fetch(`https://restcountries.com/v3.1/alpha/${border}`)
          .then((res) => res.json())
          .then(([borderCountry]) => {
            const bordercountryTag = document.createElement("a");
            bordercountryTag.innerText = borderCountry.name.common;
            bordercountryTag.href = `country.html?name=${borderCountry.name.common}`;
            borderCountries.append(bordercountryTag);
          });
      });
    } else {
      const noborder = document.createElement("p");
      noborder.style.fontStyle = "italic";
      noborder.innerText = "This country has no borders.";
      borderCountries.append(noborder);
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
