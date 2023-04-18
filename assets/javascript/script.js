// var searchForm = document.querySelector("#search-form")//whole form to search
// var inputEl = document.querySelector("#search-field")//this is gonna be the bar where they type in
// var searchType = document.querySelector("#search-select")

// var ingredient = inputEl.value || "lemon"
// var apiKey = "718caf0218dc49d49623438be5859ba7";
// var complexUrl = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}`;
// var ingredientsSearch = `https://api.spoonacular.com/recipes/findByIngredients?apiKey=${apiKey}&ingredients=${ingredient}`;

function runApi(data) {
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



// let unsplashURL = "https://api.unsplash.com/search/photos?page=1&query=lemon&client_id=efCh77xmBOWOmOalj69JqwdI-oGi_pzWGDd7FlXj1Tw";

// let unsplashURL = "https://api.unsplash.com/search/photos?page=1&query=lemon&client_id=efCh77xmBOWOmOalj69JqwdI-oGi_pzWGDd7FlXj1Tw";

// &client_id=efCh77xmBOWOmOalj69JqwdI-oGi_pzWGDd7FlXj1Tw

let unsplashURL = "https://api.unsplash.com/search/photos?page=1&query="



function getPhotos(data){
  console.log(data);
  let getPhotoURL = unsplashURL + data + "&client_id=efCh77xmBOWOmOalj69JqwdI-oGi_pzWGDd7FlXj1Tw";

    fetch(getPhotoURL)
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






let searchQueryInput = $("#searchQueryInput") // this is where user types their text
$("#searchQuerySubmit").click(function (e) { // when user clicks search button runs function
  e.preventDefault(); // stops page refresh
  console.log(e); // irrelevant
  console.log(searchQueryInput.val().trim()) // this takes user entered text and cuts off junk from end
  // here we would pass on searchQueryInput.val().trim() to function
  let data = searchQueryInput.val().trim();
  console.log(data);
  // getPhotos(data);
  getPhotos(searchQueryInput.val().trim());
  
  // the function for danials code
  // 
  searchQueryInput.val(""); // empties the text box
});


// This is to read the user input and send to functions with the enter key not clicking search button
// $("#searchQuerySubmit").keydown(function (e) { 
//   if(e.keyCode === 13){
//     e.preventDefault(); // stops page refresh
//     console.log(e); // irrelevant
//     console.log(searchQueryInput.val().trim()) // this takes user entered text and cuts off junk from end
//     searchQueryInput.val(""); // empties the text box
//   }
// });
