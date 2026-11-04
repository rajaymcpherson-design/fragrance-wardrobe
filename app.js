const fragrances = [
     { name: "Naxos" , brand: "Xerjoff" , season: "fall and winter" , occasion: "evening wear, formal events, date nights" , type: "Eau de Parfum (EDP)", sillage: 85, longevity: 85, spring: 40, summer: 20, fall: 100, winter: 100 },
     { name: "Aventus" , brand: "Creed" , season: "spring and summer" , occasion: "business meetings, office wear, daytime events, casual luxury and a confident night out or formal event" , type: "Eau de Parfum (EDP)", sillage: 70, longevity: 80, spring: 90, summer: 90, fall: 60, winter: 40 },
     { name: "Imagination" , brand: "Louis Vuitton" , season: "spring, summer, fall and winter" , occasion: "everyday signature scent, gym, office-safe fragrance, daytime events, casual outings or formal summer nights" , type: "Eau de Parfum (EDP)", sillage: 60, longevity: 70, spring: 90, summer: 90, fall: 80, winter: 60 },
     { name: "Layton" , brand: "Parfums de Marly" , season: "fall and winter" , occasion: "date nights, evening wear, parties, and cold-weather everyday use" , type: "Eau de Parfum (EDP)", sillage: 80, longevity: 90, spring: 60, summer: 40, fall: 100, winter: 90 },
     { name: "Angels' Share" , brand: " Kilian" , season: "fall and winter" , occasion: "date nights, evening wear, holiday parties, formal winter events and festive settings" , type: "Eau de Parfum (EDP)", sillage: 80, longevity: 90, spring: 50, summer: 30, fall: 100, winter: 100 },
     { name: "Side Effect" , brand: "Initio Parfums Prives" , season: "fall and winter" , occasion: "night outings, date nights, clubbing, upscale evening events, and formal winter parties" , type: "Eau de Parfum (EDP)", sillage: 90, longevity: 95, spring: 40, summer: 20, fall: 100, winter: 100 }, 

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
const sillageLabel = document.createElement("p");
sillageLabel.textContent = "Sillage";
card.appendChild(sillageLabel);
const sillageBar = document.createElement("div");
sillageBar.className = "bar";
const sillageFill = document.createElement("div");
sillageFill.className = "bar-fill";
sillageFill.style.width = fragrance.sillage + "%";
sillageBar.appendChild(sillageFill);
card.appendChild(sillageBar);

const longevityLabel = document.createElement("p");
longevityLabel.textContent = "Longevity";
card.appendChild(longevityLabel);
const longevityBar = document.createElement("div");
longevityBar.className = "bar";
const longevityFill = document.createElement("div");
longevityFill.className = "bar-fill";
longevityFill.style.width = fragrance.longevity + "%";
longevityBar.appendChild(longevityFill);
card.appendChild(longevityBar);

const seasonLabel = document.createElement("p");
seasonLabel.textContent = "Spring " + fragrance.spring + " | Summer " + fragrance.summer + " | Fall " + fragrance.fall + " | Winter " + fragrance.winter;
card.appendChild(seasonLabel);
container.appendChild(card);
});
const pickButton = document.getElementById("get-pick");
const pickDiv = document.getElementById("pick");
const aiDiv = document.getElementById("ai-pick");
let currentPick = null;
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
const weatherMatches = currentTemp === null ? matches : matches.filter(function(fragrance) {
  if (currentTemp < 70) {
    return fragrance.season.includes("fall");
  } else {
    return fragrance.season.includes("spring");
  }
});
const pick = weatherMatches[0] || matches[0] || fragrances[2];
currentPick = pick;
pickDiv.textContent = "For " + chosenOccasion + " (" + chosenMood + "), try " + pick.name + " by " + pick.brand + " — " + pick.season + ".";
if (typeof API_KEY === "undefined" || API_KEY === "YOUR_API_KEY_HERE") {
  aiDiv.textContent = "AI key not set, showing rules pick only.";
} else {
  aiDiv.textContent = "Thinking...";
  const askText = document.getElementById("ask").value;
const tempText = currentTemp === null ? "unknown" : currentTemp + " degrees Fahrenheit";
const askPart = askText === "" ? "No extra question." : "User also asked: " + askText + " Answer this at the end.";
const aiPrompt = "You are Fragrance Coach. Weather is " + tempText + ". Occasion is " + chosenOccasion + ". Mood is " + chosenMood + ". Wardrobe, pick only from these: Naxos by Xerjoff, Aventus by Creed, Imagination by Louis Vuitton, Layton by Parfums de Marly, Angels' Share by Kilian, Side Effect by Initio Parfums Prives. " + askPart + "Answer in this format, with each section on its own line and a blank line between sections: Reasoning: in 2-3 sentences, why this pick fits the weather, the occasion, and the mood. Main pick: name and why in 2-3 sentences. Layering: layer the main pick with one other fragrance from the list, why the notes work together, and spray counts in order. Notes: list the top, heart, and base notes of the main pick, and one sentence on how they smell together."

;
  fetch("https://api.meta.ai/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + API_KEY
    },
    body: JSON.stringify({
      model: "muse-spark-1.3",
      messages: [
        {
          role: "user",
          content: aiPrompt
        }
      ]
    })
  })
  .then(function(response) {
    return response.json();
  })
  .then(function(data) {
    aiDiv.textContent = data.choices[0].message.content;
  })
  .catch(function() {
    aiDiv.textContent = "AI call failed, rules pick above still works.";
  });
}
});
console.log("app.js is connected");
const weatherDiv = document.getElementById("weather");
let currentTemp = null;

function fetchWeather(lat, lon, label) {
  fetch("https://api.open-meteo.com/v1/forecast?latitude=" + lat + "&longitude=" + lon + "&current=temperature_2m,weather_code&temperature_unit=fahrenheit")
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      const temp = data.current.temperature_2m;
      currentTemp = temp;
      weatherDiv.textContent = label + " weather: " + temp + "°F";
    });
}

if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(function(position) {
    fetchWeather(position.coords.latitude, position.coords.longitude, "Your location");
  }, function() {
    fetchWeather(34.6, -98.4, "Lawton");
  });
} else {
  fetchWeather(34.6, -98.4, "Lawton");
}
const favButton = document.getElementById("save-favorite");
const favDiv = document.getElementById("favorites");

function showFavorites() {
  const saved = localStorage.getItem("favorites");
  const favs = saved === null ? [] : JSON.parse(saved);
  if (favs.length === 0) {
    favDiv.textContent = "No favorites yet.";
  } else {
    favDiv.textContent = "Favorites: " + favs.join(", ");
  }
}

favButton.addEventListener("click", function() {
  if (currentPick === null) {
    favDiv.textContent = "Get a pick first, then save it.";
    return;
  }
  const saved = localStorage.getItem("favorites");
  const favs = saved === null ? [] : JSON.parse(saved);
  if (favs.indexOf(currentPick.name) === -1) {
    favs.push(currentPick.name);
    localStorage.setItem("favorites", JSON.stringify(favs));
  }
  showFavorites();
});

showFavorites();
const darkButton = document.getElementById("dark-toggle");

if (localStorage.getItem("darkMode") === "true") {
  document.body.classList.add("dark");
}

darkButton.addEventListener("click", function() {
  document.body.classList.toggle("dark");
  const isDark = document.body.classList.contains("dark");
  localStorage.setItem("darkMode", isDark);
});
const imageButton = document.getElementById("generate-image");
const moodDiv = document.getElementById("mood-image");

imageButton.addEventListener("click", function() {
  if (typeof API_KEY === "undefined" || API_KEY === "YOUR_API_KEY_HERE") {
    moodDiv.textContent = "AI key not set, image needs the local key.";
    return;
  }
  if (currentPick === null) {
    moodDiv.textContent = "Get a pick first, then generate its mood image.";
    return;
  }
  moodDiv.textContent = "Generating image, please wait...";
  const imagePrompt = "Abstract atmospheric mood image inspired by the fragrance " + currentPick.name + ", warm evening light, dark cozy atmosphere, no bottle, no logo, no text, no person.";
  fetch("https://api.meta.ai/v1/images/generations", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + API_KEY
    },
    body: JSON.stringify({
      model: "muse-image-1.0",
      prompt: imagePrompt,
      n: 1,
      output_format: "png"
    })
  })
  .then(function(response) {
    return response.json();
  })
  .then(function(data) {
    if (data.data && data.data[0] && data.data[0].b64_json) {
      moodDiv.textContent = "";
      const img = document.createElement("img");
      img.src = "data:image/png;base64," + data.data[0].b64_json;
      img.alt = "Mood image for " + currentPick.name;
      img.style.width = "100%";
      img.style.maxWidth = "400px";
      moodDiv.appendChild(img);
    } else {
      moodDiv.textContent = "Image generation failed, text pick still works.";
    }
  })
  .catch(function() {
    moodDiv.textContent = "Image generation failed, text pick still works.";
  });
});

