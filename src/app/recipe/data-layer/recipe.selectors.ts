import {recipeAdapter} from './recipe.reducer';
import {createSelector} from '@ngrx/store';
import {recipeFeatureSelector} from './recipe.feature-selector';
import {Recipe} from './recipe.interface';


const {selectEntities} = recipeAdapter.getSelectors();

const recipeListIds = createSelector(recipeFeatureSelector, state => state.list);
const recipeEntities = createSelector(recipeFeatureSelector, state => selectEntities(state));

export const $recipesLoading = createSelector(recipeFeatureSelector, state => state.loading);
export const $recipesPage = createSelector(recipeFeatureSelector, state => state.lastPage);
export const $recipeFilter = createSelector(recipeFeatureSelector, state => state.filter);

export const $isFreshState = createSelector(recipeFeatureSelector, state => state.list.length === 0);

export const $recipeList = createSelector(
  recipeEntities,
  recipeListIds,
  (entities, ids): Recipe[] => {
  return ids.map(id => entities[id]).filter(v => !!v) as Recipe[];
});
