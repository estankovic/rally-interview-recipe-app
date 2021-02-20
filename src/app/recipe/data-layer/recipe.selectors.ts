import {recipeAdapter} from './recipe.reducer';
import {createSelector} from '@ngrx/store';
import {recipeFeatureSelector} from './recipe.feature-selector';


const {selectEntities} = recipeAdapter.getSelectors();

const recipeListIds = createSelector(recipeFeatureSelector, state => state.list);
const recipeEntities = createSelector(recipeFeatureSelector, state => selectEntities(state));

export const $recipesLoading = createSelector(recipeFeatureSelector, state => state.loading);
export const $recipesPage = createSelector(recipeFeatureSelector, state => state.lastPage);
export const $ingredients = createSelector(recipeFeatureSelector, state => state.ingredients);

export const $recipeList = createSelector(
  recipeEntities,
  recipeListIds,
  (entities, ids) => {
  return ids.map(id => entities[id]).filter(v => !!v);
});
