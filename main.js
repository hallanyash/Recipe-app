const searchbtn = document.querySelector(".searchbtn");
const searchbox = document.querySelector("#searchinput");
const reciperesult = document.querySelector(".recipe-results");
const reciperesultheading = document.querySelector(".recipe-result-heading");
const recipeDetail = document.querySelector(".recipe-details");
const closebtn = document.querySelector(".closebtn");

const fetchapi= async (result)=>{
    reciperesultheading.innerHTML =`<h2 id="head">Fetching Recipes....</h2>`;
    try {
      const data = await fetch(
        `https://www.themealdb.com/api/json/v1/1/search.php?s=${result}`
      );
      const respone = await data.json();

      respone.meals.forEach((meal) => {
        const recipeDiv = document.createElement("div");
        recipeDiv.classList.add("recipe");
        recipeDiv.innerHTML = `<img id="img" src="${meal.strMealThumb}">
            <h3>${meal.strMeal}</h3>
            <p> <span>${meal.strArea}</span> Dish</p>
            <p>Belongs to <span>${meal.strCategory}</span> Category</p>
            `;
         reciperesultheading.innerHTML = `<h2 id="head">Here's your recipes....</h2>`;    
        const button = document.createElement("button");
        button.textContent = "View Recipe";
        recipeDiv.appendChild(button);

        reciperesult.appendChild(recipeDiv);
        button.addEventListener("click", () => {
          openRecipePopUp(meal);
        });
        reciperesult.appendChild(recipeDiv);
      });
    } catch (error) {
      reciperesult.innerHTML=`<h2>Error in fetching recipe!.</h2>`
    }
}


closebtn.addEventListener('click', ()=>{
   recipeDetail.parentElement.style.display='none';
})

const fetchIngredients = (meal) => {
  let ingredientsList = "";
  for (let i = 1; i <= 20; i++) {
    const ingredient = meal[`strIngredient${i}`]; 
    if (ingredient) {
      const measure = meal[`strMeasure${i}`];
      ingredientsList += `<li>${measure} ${ingredient}</li>`;
      console.log(ingredientsList);
    } else {
      break;
    }
  }
  return ingredientsList;
};


const openRecipePopUp = (meal)=>{
    recipeDetail.innerHTML = `
    <h2 class="dishname">${meal.strMeal}</h2>
    <h3 class="ingredent">Ingredents:</h3>
    <ul class="ingredientpoints">${fetchIngredients(meal)}</ul>
    <div>
    ;`;
    
    recipeDetail.parentElement.style.display='block';
}

searchbtn.addEventListener('click', (e)=>{
    e.preventDefault();
    const searchinput = searchbox.value.trim();
    if(!searchinput){
      reciperesult.innerHTML=`<h2>Please enter the name of your favorite dish. </h2>`;
    }
    else{
      reciperesult.innerHTML = ``;
      fetchapi(searchinput);
    }
    console.log('clicked');
})