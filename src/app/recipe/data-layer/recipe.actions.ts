import {createAction, props} from '@ngrx/store';
import {Recipe} from './recipe.interface';

export const loadRecipesFromHome = createAction('[Recipe Home] - Load Recipes');

export const loadRecipes = createAction('[Recipe] - Load Recipes', props<{
  ingredients: string;
  page: number;
}>());

export const loadRecipesSuccess = createAction('[Recipe] - Load Recipes Success', props<{
  recipes: Recipe[],
  page: number;
}>());

export const loadRecipesFail = createAction('[Recipe] - Load Recipes Fail', props<{
  err: any
}>());

export const updateIngredients = createAction('[Recipe] - Update Ingredients Filter', props<{
  ingredients: string
}>());
