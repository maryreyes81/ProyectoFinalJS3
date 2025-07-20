import * as model from "./model.js";
import recipeView from "./views/RecipeView.js";
import searchView from "./views/SearchView.js";
import resultsView from "./views/SearchResultsView.js";
import PaginationView from "./views/PaginationViews.js";

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

    resultsView.renderSpinner();
    await model.loadSearchResults(query);

    if (model.state.search.results.length === 0)
      throw new Error("No se encontraron resultados para esta búsqueda.");

    resultsView.render(model.getSearchResultsPage());
    PaginationView.render(model.state.search);
  } catch (err) {
    console.error(err);
    resultsView.renderError(
      "No se pudieron cargar los resultados de búsqueda."
    );
  }
};

const controlPagination = function (goToPage) {
  console.log("Página solicitada:", goToPage);
  // 1. Renderizar los nuevos resultados
  resultsView.render(model.getSearchResultsPage(goToPage));

  // 2. Renderizar los nuevos botones de paginación
  PaginationView.render(model.state.search);
};

const initializeApp = async function () {
  recipeView.addHandlerRender(controlRecipes);
  searchView.addHandlerSearch(controlSearchResults);
  PaginationView.addHandlerClick(controlPagination);
};

initializeApp();
