import {createFeatureSelector} from '@ngrx/store';
import {RecipeState} from './recipe.reducer';

export const recipeFeatureSelector = createFeatureSelector<RecipeState>('recipe');
