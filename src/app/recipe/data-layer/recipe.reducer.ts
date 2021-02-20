import {createEntityAdapter, EntityState} from '@ngrx/entity';
import {Recipe} from './recipe.interface';
import {Action, createReducer, on} from '@ngrx/store';
import {loadRecipes, loadRecipesFail, loadRecipesFromHome, loadRecipesSuccess, updateIngredients} from './recipe.actions';

export const recipeId = (entity: Recipe) => entity.href;

export const recipeAdapter = createEntityAdapter<Recipe>({
  selectId: recipeId
});

export interface RecipeState extends EntityState<Recipe> {
  list: string[];
  ingredients: string;
  loading: boolean;
  lastPage: number;
}

const initState: RecipeState = recipeAdapter.getInitialState({
  list: [],
  ingredients: '',
  loading: false,
  lastPage: 1,
});

const reducer = createReducer(
  initState,
  on(loadRecipes, (state) => ({
    ...state,
    loading: true,
  })),
  on(loadRecipesSuccess, (state, {page, recipes}) => ({
    ...state,
    ...recipeAdapter.upsertMany(recipes, state),
    loading: false,
    list: page === 1 ? recipes.map(recipeId) : [...state.list, ...recipes.map(recipeId)],
    lastPage: page
  })),
  on(loadRecipesFail, (state) => ({
    ...state,
    loading: false
  })),
  on(updateIngredients, (state, {ingredients}) => ({
    ...state,
    ingredients
  }))
);

export function recipeReducer(state: RecipeState, action: Action): RecipeState {
  return reducer(state, action);
}
