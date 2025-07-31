import { async } from 'regenerator-runtime';
import { API_URL, RES_PER_PAGE } from './config.js';
import { key } from './config.js';
import { AJAX } from './helpers.js';

export const state = {
  recipe: {},
  search: {
    query: '',
    results: [],
    page: 1,
    resultsPerPage: RES_PER_PAGE,
  },
  bookmarks: [],
};

const createRecipeObject = function (recipeData) {
  const { recipe } = recipeData.data;
  return {
    id: recipe.id,
    title: recipe.title,
    image: recipe.image_url,
    ingredients: recipe.ingredients,
    publisher: recipe.publisher,
    servings: recipe.servings,
    cookingTime: recipe.cooking_time,
    source_url: recipe.source_url,
    ...(recipe.key && { key: recipe.key }),
  };
};

export const loadRecipe = async function (id, key) {
  try {
    const data = await AJAX(`${API_URL}${id}?key=${key}sdsd`);
    state.recipe = createRecipeObject(data);

    if (state.bookmarks.some(bookmark => bookmark.id === id))
      state.recipe.bookmarked = true;
    else state.recipe.bookmarked = false;
  } catch (err) {
    console.log(`Error getting the data of the recipe: ${err}`);
    throw err;
  }
};

export const loadSearchResults = async function (query, key) {
  try {
    state.search.query = query;
    const data = await AJAX(`${API_URL}?search=${query}&key=${key}`);

    //Transforming it to an array of new objects
    state.search.results = data.data.recipes.map(recipe => {
      return {
        id: recipe.id,
        title: recipe.title,
        image: recipe.image_url,
        publisher: recipe.publisher,
        ...(recipe.key && { key: recipe.key }),
      };
    });

    state.search.page = 1;
  } catch (error) {
    console.log(`Look at the error: ${error}`);
    throw error;
  }
};

export const getSearchResultsPage = function (page = state.search.page) {
  const start = (page - 1) * state.search.resultsPerPage;
  const end = page * state.search.resultsPerPage;

  state.search.page = page;

  return state.search.results.slice(start, end);
};

export const updateServings = function (newServings) {
  state.recipe.ingredients.forEach(ingredient => {
    ingredient.quantity =
      (ingredient.quantity * newServings) / state.recipe.servings;
  });

  state.recipe.servings = newServings;
};

const persistBookmarks = function () {
  localStorage.setItem('bookmarks', JSON.stringify(state.bookmarks));
};

export const addBookMark = async function (recipe) {
  state.bookmarks.push(recipe);

  //Changing the recipe's bookmarked value to true
  if (recipe.id === state.recipe.id) state.recipe.bookmarked = true;

  persistBookmarks();
};

export const deleteBookmark = function (id) {
  const index = state.bookmarks.findIndex(element => element.id === id);
  state.bookmarks.splice(index, 1);

  //Changing the recipe's bookmarked value to false
  if (id === state.recipe.id) state.recipe.bookmarked = false;
};

const init = function () {
  const storage = localStorage.getItem('bookmarks');
  if (storage) state.bookmarks = JSON.parse(storage);
};
init();

const clearBookmarks = function () {
  localStorage.clear('bookmarks');
};

export const uploadRecipe = async function (newRecipeData) {
  try {
    clearBookmarks();

    const ingredients = Object.entries(newRecipeData)
      .filter(entry => entry[0].startsWith('ingredient') && entry[1] !== '')
      .map(ingredient => {
        const ingredientArr = ingredient[1].split(',').map(el => el.trim());

        if (ingredientArr.length !== 3)
          throw new Error(
            'Wrong ingredient format!! Please use the right format!!'
          );

        const [quantity, unit, description] = ingredientArr;
        return { quantity: quantity ? +quantity : null, unit, description };
      });

    const recipe = {
      title: newRecipeData.title,
      source_url: newRecipeData.sourceUrl,
      image_url: newRecipeData.image,
      publisher: newRecipeData.publisher,
      cooking_time: +newRecipeData.cookingTime,
      servings: +newRecipeData.servings,
      ingredients,
    };

    const data = await AJAX(`${API_URL}?key=${key}`, recipe);
    state.recipe = createRecipeObject(data);

    addBookMark(state.recipe);
  } catch (error) {
    throw error;
  }
};
