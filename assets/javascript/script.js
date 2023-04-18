var searchForm = document.querySelector("#search-form")//whole form to search
var inputEl = document.querySelector("#search-field")//this is gonna be the bar where they type in
var searchType = document.querySelector("#search-select")

// var ingredient = inputEl.value || "lemon"
// var apiKey = "718caf0218dc49d49623438be5859ba7";
// var complexUrl = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}`;
// var ingredientsSearch = `https://api.spoonacular.com/recipes/findByIngredients?apiKey=${apiKey}&ingredients=${ingredient}`;

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




let searchQueryInput = $("#searchQueryInput") // this is where user types their text
$("#searchQuerySubmit").click(function (e) { // when user clicks search button runs function
  e.preventDefault(); // stops page refresh
  console.log(e); // irrelevant
  console.log(searchQueryInput.val().trim()) // this takes user entered text and cuts off junk from end
  searchQueryInput.val(""); // empties the text box
});
