import {createEntityAdapter, EntityState} from '@ngrx/entity';
import {Recipe} from './recipe.interface';
import {Action, createReducer, on} from '@ngrx/store';
import {loadRecipesFail, loadRecipesFromHomeScreen, loadRecipesSuccess} from './recipe.actions';

export const recipeId = (entity: Recipe) => entity.href;

export const recipeAdapter = createEntityAdapter<Recipe>({
  selectId: recipeId
});

export interface RecipeState extends EntityState<Recipe> {
  list: string[];
  loading: boolean;
  lastPage: number;
}

const initState: RecipeState = recipeAdapter.getInitialState({
  list: [],
  loading: false,
  lastPage: 1,
});

const reducer = createReducer(
  initState,
  on(loadRecipesFromHomeScreen, (state) => ({
    ...state,
    loading: true,
  })),
  on(loadRecipesSuccess, (state, {page, recipes}) => ({
    ...state,
    ...recipeAdapter.upsertMany(recipes, state),
    loading: false,
    list: [...state.list, ...recipes.map(recipeId)],
    lastPage: page
  })),
  on(loadRecipesFail, (state) => ({
    ...state,
    loading: false
  })),
);

export function recipeReducer(state: RecipeState, action: Action): RecipeState {
  return reducer(state, action);
}
