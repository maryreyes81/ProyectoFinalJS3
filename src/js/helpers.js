export const loadRecipe = async function (id) {
  try {
    const res = await fetch(`${API_URL}${id}`);
    if (!res.ok) throw new Error(`Error al cargar la receta (${res.status})`);
    const data = await res.json();
    return data;
  } catch (err) {
    throw err;
  }
};

export const getJSON = async function (url) {
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
    const data = await res.json();
    return data;
  } catch (err) {
    throw err;
  }
};

export const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};
