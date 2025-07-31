import * as model from './model.js';
import recipeView, { RecipeView } from './view/recipeView.js';
import { MODAL_CLOSE_SEC } from './config.js';
import { key } from './config.js';
import searchView from './view/searchView.js';
import resultsView from './view/resultsView.js';
import paginationView from './view/paginationView.js';
import bookmarksView from './view/bookmarksView.js';
import addRecipeView from './view/addRecipeView.js';

import 'core-js/stable'; //pollyfiling the code
import 'regenerator-runtime'; //pollyfilling asynca/await

// if (module.hot) {
//   module.hot.accept();
// }

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

// NEW API URL (instead of the one shown in the video)
// https://forkify-api.jonas.io

///////////////////////////////////////
//path of recipes: https://forkify-api.jonas.io/api/v2/recipes

// const testRecipes = async function (recipeName) {
//   try {
//     const result = await fetch(
//       `https://forkify-api.jonas.io/api/v2/recipes?search=${recipeName}?key=<a08d2f71-51f3-4435-937d-260de8792b7c>`
//     );

//     const data = await result.json();
//     console.log(data);
//   } catch (error) {}
// };

const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1);

    if (!id) return;

    //0 - infinite spinning to load the page
    recipeView.renderSpinner();

    //1 - Updating results view to mark the selected result that the user clicks
    resultsView.update(model.getSearchResultsPage());

    //2 - getting the result from model.js
    await model.loadRecipe(id, key);

    const recipe = model.state.recipe;

    //3 -> rendering the recipe
    recipeView.render(recipe);
  } catch (error) {
    console.log(error);

    recipeView.renderError(`${error} 💥 💥`);
  }
};

const controlSearchResults = async function () {
  try {
    resultsView.renderSpinner();
    //getting the query
    const query = searchView.getQuery();
    if (!query) return;

    await model.loadSearchResults(query, key);

    resultsView.render(model.getSearchResultsPage());

    //render the initial pagination just after rendering the results
    paginationView.render(model.state.search);
  } catch (error) {
    console.log(error);
    resultsView.renderError();
  }
};

const controlPagination = function (goToPage) {
  resultsView.render(model.getSearchResultsPage(goToPage));

  //render the initial pagination just after rendering the results
  paginationView.render(model.state.search);
};

const controlServings = function (newServings) {
  //Updating the data
  model.updateServings(newServings);

  //Updating the recipe
  recipeView.update(model.state.recipe);
};

const controlAddBookmark = async function () {
  //1 - Adding or remvoving an existing bookmark
  if (!model.state.recipe.bookmarked) model.addBookMark(model.state.recipe);
  else model.deleteBookmark(model.state.recipe.id);

  //2 - Update the recipe view
  recipeView.update(model.state.recipe);

  //3 - Loading the bookmark list
  bookmarksView.render(model.state.bookmarks);
  bookmarksView.update(model.state.bookmarks);
};

const controlBookmarks = function () {
  bookmarksView.render(model.state.bookmarks);
};

const controlAddRecipe = async function (newRecipeData) {
  try {
    addRecipeView.renderSpinner();
    //Methods to call model.sth to upload the data to the API
    await model.uploadRecipe(newRecipeData);

    //Certifying that the new recipe is at bookmarks
    bookmarksView.render(model.state.bookmarks);

    recipeView.render(model.state.recipe);

    //Succesful message
    addRecipeView.renderMessage();

    //Render the bookmark.view
    bookmarksView.render(model.state.bookmarks);

    //Change id in url
    window.history.pushState(null, '', `#${model.state.recipe.id}`);

    setTimeout(function () {
      addRecipeView.toggleWindow();
    }, MODAL_CLOSE_SEC * 1000);
  } catch (error) {
    console.error('💥 💥', error);
    addRecipeView.renderError(error.message);
  }
};

const init = function () {
  bookmarksView.addHandlerRenderBookmarks(controlBookmarks);
  recipeView.addHandlerEvent(controlRecipes);
  recipeView.addHandlerUpdateServings(controlServings);
  recipeView.addHandlerAddBookmark(controlAddBookmark);
  searchView.addHandler(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);
  addRecipeView._addHandlerUpload(controlAddRecipe);
};
init();
