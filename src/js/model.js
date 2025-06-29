export const state = {
  recipe: {},
};


 export const loadRecipe = async function (id){
 try {
    const res = await fetch(`https://forkify-api.herokuapp.com/api/v2/recipes/${id}`);
    const data = await res.json();

    if (!res.ok) throw new Error(`Error al cargar la receta (${res.status})`);

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
  console.log('state.recipe:', state.recipe);
  } catch (err) {
    console.error("Error en loadRecipe:", err);
    throw err; 
  }
};