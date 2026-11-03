const fragrances = [
     { name: "Naxos" , brand: "Xerjoff" , season: "fall and winter" , occasion: "evening wear, formal events, date nights" , type: "Eau de Parfum (EDP)" },
     { name: "Aventus" , brand: "Creed" , season: "spring and summer" , occasion: "business meetings, office wear, daytime events, casual luxury and a confident night out or formal event" , type: "Eau de Parfum (EDP)" },
     { name: "Imagination" , brand: "Louis Vuitton" , season: "spring, summer, fall and winter" , occasion: "everyday signature scent, gym, office-safe fragrance, daytime events, casual outings or formal summer nights" , type: "Eau de Parfum (EDP)" },
     { name: "Layton" , brand: "Parfums de Marly" , season: "fall and winter" , occasion: "date nights, evening wear, parties, and cold-weather everyday use" , type: "Eau de Parfum (EDP)" },
     { name: "Angels' Share" , brand: " Kilian" , season: "fall and winter" , occasion: "date nights, evening wear, holiday parties, formal winter events andc festive settings" , type: "Eau de Parfum (EDP)" },
     { name: "Side Effect" , brand: "Initio Parfums Prives" , season: "fall and winter" , occasion: "night outings, date nights, clubbing, upscale evening events, and formal winter parties" , type: "Eau de Parfum (EDP)" }, 

];
 const container = document.getElementById("wardrobe");
 fragrances.forEach(function(fragrance) {
 const card = document.createElement("div");
 card.className = "card";
const nameElement = document.createElement("h3");
nameElement.textContent = fragrance.name;
card.appendChild(nameElement);
const brandElement = document.createElement("p");
brandElement.textContent = "Brand: " + fragrance.brand;
card.appendChild(brandElement);
const seasonElement = document.createElement("p");
seasonElement.textContent = "Season: " + fragrance.season;
card.appendChild(seasonElement);
const occasionElement = document.createElement("p");
occasionElement.textContent = "Occasion: " + fragrance.occasion;
card.appendChild(occasionElement);
const typeElement = document.createElement("p");
typeElement.textContent = "Type: " + fragrance.type;
card.appendChild(typeElement);
container.appendChild(card);
});
const pickButton = document.getElementById("get-pick");
const pickDiv = document.getElementById("pick");
pickButton.addEventListener("click", function() {
const chosenOccasion = document.getElementById("occasion").value;
const chosenMood = document.getElementById("mood").value;
const keywords = {
  "Date night": "date night",
  "Work or Office": "office",
  "Club or Night out": "club",
  "Everyday": "everyday",
  "Formal event": "formal"
};
const keyword = keywords[chosenOccasion];
const matches = fragrances.filter(function(fragrance) {
  return fragrance.occasion.toLowerCase().includes(keyword);
});
const pick = matches[0] || fragrances[2];
pickDiv.textContent = "For " + chosenOccasion + " (" + chosenMood + "), try " + pick.name + " by " + pick.brand + " — " + pick.season + ".";
});
console.log("app.js is connected");
const weatherDiv = document.getElementById("weather");

fetch("https://api.open-meteo.com/v1/forecast?latitude=34.6&longitude=-98.4&current=temperature_2m,weather_code&temperature_unit=fahrenheit")
  .then(function(response) {
    return response.json();
  })
  .then(function(data) {
    const temp = data.current.temperature_2m;
    weatherDiv.textContent = "Lawton weather: " + temp + "°F";
  });
