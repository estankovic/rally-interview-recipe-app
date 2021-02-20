import {initState, recipeAdapter, recipeId, RecipeState} from './recipe.reducer';
import {recipesResponse} from './recipe.reducer.spec';
import {$isFreshState, $recipeFilter, $recipeList, $recipesLoading, $recipesPage} from './recipe.selectors';

describe('RecipeSelectors', () => {
  const initialState: RecipeState = {
    ...recipeAdapter.addMany(recipesResponse, initState),
    list: recipesResponse.map(recipeId),
    filter: {
      name: 'recipe',
      ingredients: 'onion',
    },
  };

  it('$recipesLoading should select loading state', () => {
    const result = $recipesLoading.projector(initialState);
    expect(result).toEqual(false);
  });

  it('$recipesPage should select current page', () => {
    const result = $recipesPage.projector(initialState);
    expect(result).toEqual(1);
  });

  it('$recipeFilter should select current filters', () => {
    const result = $recipeFilter.projector(initialState);
    expect(result).toEqual({
      name: 'recipe',
      ingredients: 'onion'
    });
  });

  it('$isFreshState should select flag whether is state fresh', () => {
    const result = $isFreshState.projector(initialState);
    expect(result).toEqual(false);
  });

  it('$recipeList should select loading state', () => {
    const result = $recipeList.projector(initialState.entities, initialState.list);
    expect(result).toEqual(recipesResponse);
  });
});
