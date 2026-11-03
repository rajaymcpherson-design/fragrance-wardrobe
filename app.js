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
 card.textContent = fragrance.name;
container.appendChild(card);
});





console.log("app.js is connected");