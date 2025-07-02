
import icons  from "url../img.icons.svg";
import RecipeView from "./views/RecipeView.js";

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

function renderSpinner(parentEl) {
  const markup = `
<div class="spinner">
          <svg>
            <use href="${icons}icon-loader"></use>
          </svg>
        </div>
        `;

  parentEl.innerHTML = ""; // Limpiar contenido anterior
  parentEl.insertAdjacentHTML("afterbegin", markup); // Insertar spinner
}

import * as model from "./model.js";
const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1);
    if (!id) return;

    recipeView.renderSpinner(); // Mostrar el spinner

    await model.loadRecipe(id); // Cargar la receta desde el modelo

    // const recipeContainer = document.querySelector(".recipe");
    // renderSpinner(recipeContainer);
    // console.log(id);

    recipeView.render(model.state.recipe); // Renderizar la receta
  } catch (err) {
    console.error('Error en controlRecipes:', err);
  }
};


await model.loadRecipe(id); // Llamada al modelo
console.log("Receta:", recipe);
recipeView.render(model.state.recipe);

const resp = await fetch(
  `https://forkify-api.herokuapp.com/api/v2/recipes/${id}`
);
console.log("Respuesta del fetch:", resp);

const data = await resp.json();
console.log("Datos de la receta", data);

const recipeData = data.data.recipe; // Aquí se crea la variable recipe
console.log("Receta:", recipe);

const recipe = {
  id: recipe.id,
  title: recipe.title,
  publisher: recipe.publisher,
  sourceUrl: recipe.source_url,
  image: recipe.image_url,
  servings: recipe.servings,
  cookTime: recipe.cooking_time,
  ingredients: recipe.ingredients,
};

const ingredientsHTML = recipe.ingredients
  .map((ing) => {
    return `
 <li class="recipe__ingredient">
 <svg class="recipe__icon">
 <use href="${icons}#icon-check"></use>
 </svg>
 <div class="recipe__quantity">${ing.quantity}</div>
 <div class="recipe__description">
 <span class="recipe__unit">${ing.unit}</span>
 ${ing.description}
 </div>
 </li>
  `;
  })
  .join("");

const markup = `
        <figure class="recipe__fig">
          <img src="${recipe.image}" alt="Tomato" class="recipe__img" />
          <h1 class="recipe__title"> <span>${recipe.title}</span>
          </h1>
        </figure>

        <div class="recipe__details">
          <div class="recipe__info">
            <svg class="recipe__info-icon">
              <use href="${icons}#icon-clock"></use>
            </svg>
            <span class="recipe__info-data recipe__info-data--minutes">${recipe.cookTime}</span>
            <span class="recipe__info-text">minutes</span>
          </div>

          <div class="recipe__info">
            <svg class="recipe__info-icon">
              <use href="${icons}#icon-users"></use>
            </svg>
            <span class="recipe__info-data recipe__info-data--people">${recipe.servings}</span>
            <span class="recipe__info-text">servings</span>

            <div class="recipe__info-buttons">
              <button class="btn--tiny btn--increase-servings">
                <svg>
                  <use href="${icons}#icon-minus-circle"></use>
                </svg>
              </button>
              <button class="btn--tiny btn--increase-servings">
                <svg>
                  <use href="${icons}#icon-plus-circle"></use>
                </svg>
              </button>
            </div>
          </div>

          <div class="recipe__user-generated">
            <svg>
              <use href="${icons}#icon-user"></use>
            </svg>
          </div>
          <button class="btn--round">
            <svg class="">
              <use href="${icons}#icon-bookmark-fill"></use>
            </svg>
          </button>
        </div>

        <div class="recipe__ingredients">
          <h2 class="heading--2">Recipe ingredients</h2>
          <ul class="recipe__ingredient-list">
            <li class="recipe__ingredient">
              <svg class="recipe__icon">
                <use href="${icons}#icon-check"></use>
              </svg>
              <div class="recipe__quantity">1000</div>
              <div class="recipe__description">
                <span class="recipe__unit">g</span>
                pasta
              </div>
            </li>

            <li class="recipe__ingredient">
              <svg class="recipe__icon">
                <use href="${icons}#icon-check"></use>
              </svg>
              <div class="recipe__quantity">0.5</div>
              <div class="recipe__description">
                <span class="recipe__unit">cup</span>
                ricotta cheese
              </div>
            </li>
          </ul>
        </div>

        <div class="recipe__directions">
          <h2 class="heading--2">How to cook it</h2>
          <p class="recipe__directions-text">
            This recipe was carefully designed and tested by
            <span class="recipe__publisher">${recipe.publisher}</span>. Please check out
            directions at their website.
          </p>
          <a
            class="btn--small recipe__btn"
            href="${recipe.sourceUrl}" target="_blank">
            <span>Directions</span>
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-right"></use>
            </svg>
          </a>
        </div>
        `;

recipeView.render(model.state.recipe);
  } catch(err) {
  alert("Error al obtener la receta: " + err.message);
  console.error("Error al obtener la receta:", err);
}
};


["hashchange", "load"].forEach((ev) => {
  window.addEventListener(ev, controlRecipes);
});


const loadRecipe = async function () {
  try {
    const res = await fetch(`https://forkify-api.herokuapp.com/api/v2/recipes/${id}`);
    if (!res.ok) throw new Error(`Error al cargar la receta (${res.status})`);
    const data = await res.json;
    console.log(recipe);


  } catch (err) {
    alert("Error en loadRecipe", err);
  }
};