import { numberWithCommas } from "./utils.js";

const endpoint = 'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json';
const cities = [];
const searchInput = document.querySelector(".search");
const suggestions = document.querySelector(".suggestions");

async function fetchFunc() {
  const blob = await fetch(endpoint);
  const json = await blob.json();
  cities.push(...json);
}
fetchFunc();

function findMatches(wordToMatch) {
  const regex = new RegExp(wordToMatch, 'gi');
  if (wordToMatch) { return cities.filter(place => place.city.match(regex) || place.state.match(regex)); }
  else { return; };
}

function displayMatches(matchArray = [], html = "") {
  if (this.value) {
    matchArray = findMatches(this.value).slice(0, 11);
    html = matchArray.map(place => {
      const regex = new RegExp(this.value, "gi");
      const cityName = place.city.replace(regex, `<span class="hl">${this.value}</span>`);
      const stateName = place.state.replace(regex, `<span class="hl">${this.value}</span>`);
      return `<li>
                <span class="name">${cityName}, ${stateName}</span>
                <span class="population">${numberWithCommas(place.population)}</span>
              </li>`;
    }).join("");
  }
  suggestions.innerHTML = html;
}
searchInput.addEventListener("keyup", displayMatches);
