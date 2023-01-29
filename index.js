import { numberWithCommas } from "./utils.js";

const endpoint = 'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json';
const cities = [];
let regex = "";
// dom objects
const searchInput = document.querySelector(".search");
const suggestions = document.querySelector(".suggestions");

// fetch JSON -> cities[]
async function fetchFunc() {
  const blob = await fetch(endpoint);
  const json = await blob.json();
  cities.push(...json);
}
fetchFunc();
function findMatches(wordToMatch = "", regex, length = 13) {
  if (wordToMatch, regex) { return cities.filter(place => place.city.match(regex) || place.state.match(regex)).slice(0, length); }
  else { return; };
}

function displayMatches(matchArray = [], html = "") {
  regex = new RegExp(this.value, "gi");
  if (this.value) {
    matchArray = findMatches(this.value, regex, Math.pow(window.innerHeight / 205, 1.55));
    html = matchArray.map(place => {
      const cityName = place.city.replace(regex, `<span class="hl">${this.value}</span>`);
      const stateName = place.state.replace(regex, `<span class="hl">${this.value}</span>`);
      return `<li>
                <span class="name">${cityName}, ${stateName}</span>
                <span class="population"> pop: ${numberWithCommas(place.population)}</span>
              </li>`;
    }).join("");
  }
  suggestions.innerHTML = html;
}
searchInput.addEventListener("keyup", displayMatches);
