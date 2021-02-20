import { ComponentFixture, TestBed } from '@angular/core/testing';
import {Action} from '@ngrx/store';
import {initState, recipeAdapter, recipeReducer} from './recipe.reducer';
import {loadRecipes, loadRecipesFail, loadRecipesSuccess, updateFilter} from './recipe.actions';
import {Recipe} from './recipe.interface';

const recipesResponse: Recipe[] = [
  {
    href: 'https://url.one',
    thumbnail: '',
    ingredients: 'onions, salt',
    title: 'Recipe One'
  },
  {
    href: 'https://url.two',
    thumbnail: '',
    ingredients: 'sugar, onions, salt',
    title: 'Recipe Two'
  },
  {
    href: 'https://url.three',
    thumbnail: '',
    ingredients: 'onions, salt, water',
    title: 'Recipe Three'
  }
];

describe('RecipeReducer', () => {
  describe('unknown action', () => {
    it('should return default state', () => {
      const unknownAction: Action = {
        type: 'Unknown Action'
      };

      const nextState = recipeReducer(initState, unknownAction);
      expect(nextState).toBe(initState);
    });
  });

  describe('loadRecipe', () => {
    it('should set loading to true', () => {
      const nextState = recipeReducer(initState, loadRecipes({
        filter: {
          ingredients: '',
          name: '',
        },
        page: 1
      }));
      expect(nextState).not.toBe(initState);
      expect(nextState.loading).toEqual(true);
    });
  });

  describe('loadRecipesSuccess', () => {
    it('should add entities to adapter', () => {
      const nextState = recipeReducer(initState, loadRecipesSuccess(
        {
          page: 1,
          recipes: [recipesResponse[0], recipesResponse[1]]
        }
      ));
      expect(nextState).not.toBe(initState);
      expect(nextState.ids.length).toEqual(2);
    });

    it('should add entities to list', () => {
      const oldState = {
        ...initState,
      };

      const nextState = recipeReducer(oldState, loadRecipesSuccess(
        {
          page: 1,
          recipes: [recipesResponse[0], recipesResponse[1]],
        }
      ));
      expect(nextState).not.toBe(oldState);
      expect(nextState.list.length).toEqual(2);
      expect(nextState.list).toEqual([recipesResponse[0].href, recipesResponse[1].href]);
    });

    it('should add entities to list including old ones, when next page is added', () => {
      const oldState = {
        ...initState,
        ...recipeAdapter.addOne(recipesResponse[0], initState),
        list: [recipesResponse[0].href],
      };

      const nextState = recipeReducer(oldState, loadRecipesSuccess(
        {
          page: 2, // increase page
          recipes: [recipesResponse[1], recipesResponse[2]]
        }
      ));
      expect(nextState).not.toBe(oldState);
      expect(nextState.list.length).toEqual(3);
      expect(nextState.list).toEqual([recipesResponse[0].href, recipesResponse[1].href, recipesResponse[2].href]);
    });

    it('should update page number', () => {
      const oldState = {
        ...initState,
      };

      const nextState = recipeReducer(oldState, loadRecipesSuccess(
        {
          page: 2, // increase page
          recipes: []
        }
      ));
      expect(nextState).not.toBe(oldState);
      expect(nextState.lastPage).toEqual(2);
    });

    it('should set loading to false', () => {
      const oldState = {
        ...initState,
      };

      const nextState = recipeReducer(oldState, loadRecipesSuccess(
        {
          page: 1, // increase page
          recipes: []
        }
      ));
      expect(nextState).not.toBe(oldState);
      expect(nextState.loading).toEqual(false);
    });
  });

  describe('loadRecipesFail', () => {
    it('should set loading to false', () => {
      const oldState = {
        ...initState,
      };

      const nextState = recipeReducer(oldState, loadRecipesFail({err: {} }));
      expect(nextState).not.toBe(oldState);
      expect(nextState.loading).toEqual(false);
    });
  });

  describe('updateFilter', () => {
    it('should update filters', () => {
      const oldState = {
        ...initState,
      };

      const nextState = recipeReducer(oldState, updateFilter({
        name: 'Recipe',
        ingredients: 'onion'
      }));

      expect(nextState).not.toBe(oldState);
      expect(nextState.filter).toEqual({
        name: 'Recipe',
        ingredients: 'onion'
      });
    });
  });
});
