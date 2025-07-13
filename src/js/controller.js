import * as model from "./model.js";
import recipeView from "./views/RecipeView.js";
import searchResultsView from "./views/SearchResultsView.js";
import searchView from "./views/SearchView.js";

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1);
    // console.log(id);
    if (!id) return;

    recipeView.renderSpinner(); // Mostrar el spinner
    await model.loadRecipe(id); // Llamada al modelo
    // console.log("Receta:", recipe);
    recipeView.render(model.state.recipe);
  } catch (err) {
    recipeView.renderError();
  }
};


const controlSearchResults = async function () {
  try {
    const query = searchView.getQuery();
    if (!query) return;

    await model.loadSearchResults(query);
    searchResultsView.render(model.state.search.results);
    // console.log(model.state.search.results);
  } catch (err) {
    console.error(err);
    searchResultsView.renderError(
      "No se pudieron cargar los resultados de búsqueda."
    );
  }
};

const initializeApp = async function () {
  recipeView.addHandlerRender(controlRecipes);
  searchView.addHandlerSearch(controlSearchResults);
  // try {
  //   await controlSearchResults();
  // } catch (err) {
  //   console.error(err);
  //   recipeView.renderError("No se pudieron cargar los resultados de búsqueda.");
  // }
};

initializeApp();

