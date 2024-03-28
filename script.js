const searchMeal = document.getElementById('search');
const inputField = document.getElementById('inputField');
const result = document.getElementById('results');
let allIngredients = document.getElementById('ingredients');

//a Function that displays the results of the search term
function displayResult(data) {
    const searchTerm = inputField.value.trim();
    let allMeals = [data.meals];

    if (data.meals === null) {
        result.innerHTML = `
          <h2 style="margin-top: 20px">No results found for: '${searchTerm}'<h2>
        `
    } else {
        result.innerHTML = `
          <h2 style="margin-top: 20px">Search result: <h2>
        `
        allMeals.forEach(meal => {
            meal.forEach(singleMeal => {
                //Creating a div that displays the image of meal and the name of the meal
                let mealDiv = document.createElement('div');
                mealDiv.classList.add('mealDiv');

                mealDiv.innerHTML = `
                   <div class="miniDiv">
                     <img src= ${singleMeal.strMealThumb}>
                     <h4>${singleMeal.strMeal}</h4>
                   </div>
                `
        
                result.appendChild(mealDiv);
                result.classList.add('singleMeal');

    
                mealDiv.addEventListener('click', function () {
                    result.classList.remove('singleMeal');
                    const ingredients = [];

                    for (let i = 1; i <= 20; i++) {
                        if (singleMeal[`strMeasure${i}`] && singleMeal[`strIngredient${i}`] !== "") {
                            let item = [singleMeal[`strMeasure${i}`] + " " + singleMeal[`strIngredient${i}`]]
                            ingredients.push(item);
                        }
                    }

                    let parent = document.createElement('ul');

                    ingredients.forEach(function (i) {
                        let child = document.createElement('li');
                        child.textContent = i;
                        parent.appendChild(child);
                        allIngredients.appendChild(parent)
                    })

                    result.innerHTML = `
                    <div>
                    <div id="mealImg" class="mealImg">
                      <img src= ${singleMeal.strMealThumb}>
                    </div>
                    <div id="mealInfo" class="mealInfo">
                        <div class="subDiv">
                          <h4>${singleMeal.strMeal}</h4>
                          <p>${singleMeal.strArea}</p>
                        </div>
                    </div>
                    </div>
                    <div id="ingredients" class="ingredients"></div>
                    </div>
                    <button id="recipe-btn" class="recipe-btn">View Recipe</button>
                    <div id="recipe-page" class="recipe-page hide">
                         <div id="content" class="content">
                         </div>
                    </div>
                    `

                    let recipeBtn = document.getElementById('recipe-btn');
                    let recipePage = document.getElementById('recipe-page');
                    let content = document.getElementById('content');
                    content.innerHTML = `
                    <button id="close-btn" class="closeBtn">X</button>
                    ${singleMeal.strInstructions}
                    `;

                    recipeBtn.addEventListener('click', function(){
                    recipePage.classList.remove('hide');
                    let closeBtn = document.getElementById('close-btn');
                    closeBtn.addEventListener('click', function(){
                        recipePage.classList.add('hide');
                    })
                });
                })
            })
        });
    }
}

//a Function that fetches the search term
function fetchData() {
    const searchTerm = inputField.value.trim();

    const url = `https:themealdb.com/api/json/v1/1/search.php?s=${searchTerm}`;

    function emptyField() {
                result.innerHTML = `
                <h4 style="margin-top: 20px" text-align:center;>Input field can't be empty <h2>
                `
            }

    function notEmpty(){
        let mealInfo = document.getElementById('mealInfo');
        let mealImg = document.getElementById('mealImg');
        let recipeBtn = document.getElementById('recipe-btn');
        if (searchTerm !== '') {
            mealImg.innerHTML = ``;
            mealInfo.innerHTML = ``;
            allIngredients.innerHTML = ``;
            recipeBtn.innerHTML = ``;
        }
    }        
    try {
        if (searchTerm === '') {
            emptyField();
        }else{
            fetch(url)
            .then(res => res.json())
            .then(data => displayResult(data));
            console.log(url);
            notEmpty();
        }
    } catch (error) {
        console.log(error);
    }
}


//Event listener on the search and recipe buttons
searchMeal.addEventListener('click', fetchData);

