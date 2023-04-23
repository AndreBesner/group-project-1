// var searchForm = document.querySelector("#search-form")//whole form to search
// var inputEl = document.querySelector("#search-field")//this is gonna be the bar where they type in
// var searchType = document.querySelector("#search-select")

// // var ingredient = inputEl.value || "lemon"
// // var apiKey = "718caf0218dc49d49623438be5859ba7";
// // var complexUrl = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}`;
// // var ingredientsSearch = `https://api.spoonacular.com/recipes/findByIngredients?apiKey=${apiKey}&ingredients=${ingredient}`;

// function runApi() {
//     var type = searchType.value
//     if(inputEl.value == ""){
//         window.alert("Please enter a search term")
//         return
//     }

//     var fetchUrl
//     switch(type){
//         case "name":
//             fetchUrl=complexUrl
//             break;
//         case "ingredients":
//             fetchUrl=ingredientsSearch
//             break;
//     }

//     // toggle search type based on above variable
//   fetch(fetchUrl)
//     .then((response) => {
//       return response.json();
//     })
//     .then((data) => {
//       console.log(data);
//     });
// }



// let unsplashURL = "https://api.unsplash.com/search/photos?page=1&query=lemon&client_id=efCh77xmBOWOmOalj69JqwdI-oGi_pzWGDd7FlXj1Tw";

// function getPhotos(data){

//     fetch(unsplashURL)
//     .then(function(data){
//         if(!data.ok){
//             console.log("issue try again");
//         }
//         return data.json();
//     })
//     .then(function(data){
//         console.log(data);
//         console.log(data.results[0].urls.thumb);
//     })
// }






// let searchQueryInput = $("#searchQueryInput") // this is where user types their text
// $("#searchQuerySubmit").click(function (e) { // when user clicks search button runs function
//   e.preventDefault(); // stops page refresh
//   console.log(e); // irrelevant
//   console.log(searchQueryInput.val().trim()) // this takes user entered text and cuts off junk from end
//   // here we would pass on searchQueryInput.val().trim() to function
//   getPhotos(searchQueryInput.val().trim());
  
//   // the function for danials code
//   // 
//   searchQueryInput.val(""); // empties the text box
// });

// // $("#searchQuerySubmit").keydown(function (e) { 
// //   if(e.keyCode === 13){
// //     e.preventDefault(); // stops page refresh
// //     console.log(e); // irrelevant
// //     console.log(searchQueryInput.val().trim()) // this takes user entered text and cuts off junk from end
// //     searchQueryInput.val(""); // empties the text box
// //   }
// // });

// Function to fetch recipe data from Spoonacular API based on user's search query
async function getRecipes(searchQuery) {
  const apiKey = "718caf0218dc49d49623438be5859ba7";
  const apiUrl = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}&query=${searchQuery}`;
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error(error);
  }
}

// Function to display recipe information in the UI
function displayRecipes(recipes) {
  const resultsContainer = document.querySelector(".resultsContainer");
  resultsContainer.innerHTML = "";
  // Error handling if no recipes returned
  // THIS IS WHERE FUNCTION CALL FOR ANDRE'S CODE SHOULD BE IMPLEMENTED SO WE DONT DISPLAY RANDOM PHOTOS LOL
  if (recipes.length === 0) {
    resultsContainer.innerHTML = "<p>No results found.</p>";
    return;
  }

  const recipeCards = recipes.map((recipe, index) => {
    if (index % 5 === 0) {
      return `
      <div class="grid-x grid-margin-x small-up-2 medium-up-4">
        <div class="cell">
          <div class="card border">
            <img src="${recipe.image}" alt="${recipe.title}" />
            <div class="card-section">
              <h2>${recipe.title}</h2>
              <a href="${recipe.sourceUrl}" target="_blank">View Recipe</a>
            </div>
          </div>
        </div>
      `;
    } else if ((index + 1) % 5 === 0 || index + 1 === recipes.length) {
      return `
        <div class="cell">
          <div class="card border">
            <img src="${recipe.image}" alt="${recipe.title}" />
            <div class="card-section">
              <h2>${recipe.title}</h2>
              <<a href="${recipe.sourceUrl}" target="_blank">View Recipe</a>
            </div>
          </div>
        </div>
      </div>
      `;
    } else {
      return `
        <div class="cell">
          <div class="card border">
            <img src="${recipe.image}" alt="${recipe.title}" />
            <div class="card-section">
              <h2>${recipe.title}</h2>
              <<a href="${recipe.sourceUrl}" target="_blank">View Recipe</a>
            </div>
          </div>
        </div>
      `;
    }
  });
  
  resultsContainer.innerHTML = recipeCards.join("");

  // const recipeCards = recipes.map((recipe) => {
  //   const recipeCard = `
  //   <div class="grid-x grid-margin-x small-up-2 medium-up-4">
  //     <div class="cell">
  //       <div class="card border">
  //         <img src="${recipe.image}" alt="${recipe.title}" />
  //         <div class="card-section">
  //           <h2>${recipe.title}</h2>
  //           <a href="${recipe.sourceUrl}" target="_blank">View Recipe</a>
  //         </div>
  //     </div>
  //   </div>
  //   `;
  //   return recipeCard;
  // });

  // resultsContainer.innerHTML = recipeCards.join("");
}

//data being saved to local storage
function saveDataToLocalStorage(searchQuery, recipes) {
  localStorage.setItem("searchQuery", searchQuery);
  localStorage.setItem("recipes", JSON.stringify(recipes));
}

function getDataFromLocalStorage() {
  const searchQuery = localStorage.getItem("searchQuery");
  const recipes = JSON.parse(localStorage.getItem("recipes"));
  return { searchQuery, recipes };
}

function getAndDisplayRecipes(){
  getRecipes()
  displayRecipes()
};

// Event listener for form submission
const searchForm = document.querySelector("#searchForm"); // this is the form with the submit event attached
searchForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const searchQuery = document.querySelector("#searchQueryInput").value; // this is the actual text the user has typed
  const recipes = await getRecipes(searchQuery);
  displayRecipes(recipes);
  getIngredientPhoto(searchQuery);
  // window.location.href = "index1.html";
  document.querySelector("#searchQueryInput").value = "" ;
});


// This is the function that calls unsplash to display a photo of the ingredient
// the user has searched

function getIngredientPhoto(data){
  let unsplashURL = "https://api.unsplash.com/search/photos?page=1&query=";
  let searchPhotoURL = unsplashURL + data + "&client_id=efCh77xmBOWOmOalj69JqwdI-oGi_pzWGDd7FlXj1Tw";

    fetch(searchPhotoURL)
    .then(function(data){
        if(!data.ok){
            console.log("issue try again");
        }
        return data.json();
    })
    .then(function(data){
        console.log(data);
        console.log(data.results[0].urls.thumb);
        //print this information to page
        let ingredientPhotoDiv = $("#ingredientPhotoDiv"); // selector for where photo of ingredient will live
        ingredientPhotoDiv.empty();
        let makeDiv = $("<div>"); // this div contains the text of what the user searched
        makeDiv.addClass("column")
        let makeImage = document.createElement("img"); 
        // we need image alt
        makeImage.alt = data.results[0].alt_description;
        // we need image source 
        makeImage.src = data.results[0].urls.thumb;
        // append text of user search 
        ingredientPhotoDiv.append(makeDiv);
        // append image to ingred photo div
        ingredientPhotoDiv.append(makeImage);
    })
}



// </div>
// <div class="recipeCard">
//   <img src="${recipe.image}" alt="${recipe.title}" />
//   <h3>${recipe.title}</h3>
//   <a href="${recipe.sourceUrl}" target="_blank">View Recipe</a>
// </div>