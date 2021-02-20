import {createAction, props} from '@ngrx/store';
import {Recipe} from './recipe.interface';

export const loadRecipesFromHomeScreen = createAction('[Recipe Home] - Load Recipes', props<{
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
