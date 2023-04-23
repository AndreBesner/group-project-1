//This is the section where the user enters their desired search query
//The program asks for an ingredient, or general recipe, and the user will enter text in form and hit enter key
const searchForm = document.querySelector("#searchForm"); // this is the form with the submit event attached
searchForm.addEventListener("submit", async (event) => {
  event.preventDefault(); // stops page refresh
  const searchQuery = document.querySelector("#searchQueryInput").value; // this is the actual text the user has typed
  let searchArray = JSON.parse(localStorage.getItem("searchArray")) || []; // we get local storage array ready or create a new one
  searchArray.push(searchQuery); // adds the text to the local storage "searchArray" array
  //code to delete previous searches once array is 5 entries long
  if (searchArray.length > 5) {
    searchArray.shift(); // removes oldest entry
  }
  localStorage.setItem("searchArray", JSON.stringify(searchArray));
  printLastSearches(); // makes call to printLastSearches function as now there will be entry present
  const recipes = await getRecipes(searchQuery); //this was a pain to realize i needed to use await w rafee and danials code
  displayRecipes(recipes);
  getIngredientPhoto(searchQuery);
  document.querySelector("#searchQueryInput").value = ""; // empties the user typed text box and readies for next search
});

// CODE FOR LOCAL STORAGE
let previousSearches = $("#previous-searches");
function printLastSearches() {
  previousSearches.empty();
  let searchArray = JSON.parse(localStorage.getItem("searchArray")) || [];
  for (let i = searchArray.length - 1; i >= 0; i--) {
    let makeDiv = document.createElement("div");
    let makeText = document.createElement("a");
    makeText.classList.add("button");
    makeText.textContent = searchArray[i];
    makeDiv.append(makeText);
    previousSearches.append(makeDiv);
    // here i will make it clickable after
    makeText.addEventListener("click", async (e) => {
      // run next function with (makeText.textContent)
      // getRecipes(makeText.textContent);
      getIngredientPhoto(makeText.textContent);
      const recipes = await getRecipes(makeText.textContent);
      displayRecipes(recipes);
    });
  }
}

printLastSearches();

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

// This is the function that calls unsplash to display a photo of the ingredient
// the user has searched

function getIngredientPhoto(data) {
  let unsplashURL = "https://api.unsplash.com/search/photos?page=1&query=";
  let searchPhotoURL =
    unsplashURL +
    data +
    "&client_id=efCh77xmBOWOmOalj69JqwdI-oGi_pzWGDd7FlXj1Tw";

  fetch(searchPhotoURL)
    .then(function (data) {
      if (!data.ok) {
        console.log("issue try again");
      }
      return data.json();
    })
    .then(function (data) {
      console.log(data);
      console.log(data.results[0].urls.thumb);
      //print this information to page
      let ingredientPhotoDiv = $("#ingredientPhotoDiv"); // selector for where photo of ingredient will live
      ingredientPhotoDiv.empty();
      let makeDiv = $("<div>"); // this div contains the text of what the user searched
      makeDiv.addClass("column");
      let makeImage = document.createElement("img");
      // we need image alt
      makeImage.alt = data.results[0].alt_description;
      // we need image source
      makeImage.src = data.results[0].urls.thumb;
      //ensure image will always be same width and height
      makeImage.style.width = "300px";
      makeImage.style.height = "300px";
      makeImage.style.objectFit = "cover";
      // append text of user search
      ingredientPhotoDiv.append(makeDiv);
      // append image to ingred photo div
      ingredientPhotoDiv.append(makeImage);
    });
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
}
