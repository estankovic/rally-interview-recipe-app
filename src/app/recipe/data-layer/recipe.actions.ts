import {createAction, props} from '@ngrx/store';
import {Recipe} from './recipe.interface';

export const loadRecipesFromHomeInit = createAction('[Recipe Home] - Load Recipes');

export const loadRecipes = createAction('[Recipe] - Load Recipes', props<{
  filter: {
    ingredients: string;
    name: string;
  };
  page: number;
}>());

export const loadRecipesSuccess = createAction('[Recipe] - Load Recipes Success', props<{
  recipes: Recipe[],
  page: number;
}>());

export const loadRecipesFail = createAction('[Recipe] - Load Recipes Fail', props<{
  err: any
}>());

export const updateFilter = createAction('[Recipe] - Update Filter', props<{
  ingredients: string;
  name: string;
}>());

export const loadNextPage = createAction('[Recipe] - Load Next Page');
