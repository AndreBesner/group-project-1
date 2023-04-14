var searchForm = document.querySelector("#search-form")//whole form to search
var inputEl = document.querySelector("#search-field")//this is gonna be the bar where they type in
var searchType = document.querySelector("#search-select")

var ingredient =  "lemon"
var apiKey = "718caf0218dc49d49623438be5859ba7";
var complexUrl = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}`;
var ingredientsSearch = `https://api.spoonacular.com/recipes/findByIngredients?apiKey=${apiKey}&ingredients=${ingredient}`;

function runApi() {
    var type = searchType.value
    if(inputEl.value == ""){
        window.alert("Please enter a search term")
        return
    }

    var fetchUrl
    switch(type){
        case "name":
            fetchUrl=complexUrl
            break;
        case "ingredients":
            fetchUrl=ingredientsSearch
            break;
    }

    // toggle search type based on above variable
  fetch(fetchUrl)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log(data);
    });
}



// searchForm.addEventListener("submit", runApi)



let unsplashURL = "https://api.unsplash.com/search/photos?page=1&query=lemon&client_id=efCh77xmBOWOmOalj69JqwdI-oGi_pzWGDd7FlXj1Tw";

function getPhotos(){

    fetch(unsplashURL)
    .then(function(data){
        if(!data.ok){
            console.log("issue try again");
        }
        return data.json();
    })
    .then(function(data){
        console.log(data);
        console.log(data.results[0].urls.thumb);
    })
}

getPhotos();

