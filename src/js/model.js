import { API_URL, TIMEOUT_SEC } from "./config.js";
import { timeout, getJSON } from "./helpers.js";

export const state = {
  recipe: {},
};

// export const getJSON = async function (url) {
//   try {
//     const fetchPro = fetch(url);
//     const res = await Promise.race([fetchPro, timeout(TIMEOUT_SEC)]);
//     const data = await res.json();

//     if (!res.ok) throw new Error(`${data.message} (${res.status})`);
//     return data;
//   } catch (err) {
//     console.error(`${err} 💥💥💥💥`);
//     throw err;
//   }
// };

export const loadRecipe = async function (id) {
  try {
    const data = await getJSON(`${API_URL}${id}`);
    const { recipe } = data.data;

    state.recipe = {
      id: recipe.id,
      title: recipe.title,
      publisher: recipe.publisher,
      sourceUrl: recipe.source_url,
      image: recipe.image_url,
      servings: recipe.servings,
      cookTime: recipe.cooking_time,
      ingredients: recipe.ingredients,
    };
  } catch (err) {
    console.error(`${err} 💥💥💥💥`);
    throw err;
  }
};

async function loadSearchResults(query) {
  try {
    const data = await getJSON(`${API_URL}/?search=${query}`);
    data.data.recipes.map((rec) => {
      return {
        id: rec.id,
        title: rec.title,
        publisher: rec.publisher,
        image: rec.image_url,
      };
    });
  } catch (err) {
    console.log(`${err} 💥💥💥💥`);
    throw err;
  }
}


