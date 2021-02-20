import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {loadNextPage, loadRecipes, loadRecipesFail, loadRecipesFromHomeInit, loadRecipesSuccess, updateFilter} from './recipe.actions';
import {catchError, filter, map, switchMap, take, withLatestFrom} from 'rxjs/operators';
import {RecipeService} from './recipe.service';
import {of} from 'rxjs';
import {Store} from '@ngrx/store';
import {$recipeFilter, $isFreshState, $recipesPage} from './recipe.selectors';

@Injectable({providedIn: 'root'})
export class RecipeEffects {

  loadRecipesFromHomeInit = createEffect(() => this.actions$.pipe(
    ofType(loadRecipesFromHomeInit),
    withLatestFrom(
      this.store.select($isFreshState),
      this.store.select($recipeFilter),
      this.store.select($recipesPage),
    ),
    // allow only when state was not initialized from localstorage
    filter(([_, isFresh]) => isFresh),
    map(([_, __, recipeFilter, page]) => loadRecipes({filter: recipeFilter, page})),
  ));

  loadNextPage = createEffect(() => this.actions$.pipe(
    ofType(loadNextPage),
    withLatestFrom(
      this.store.select($recipeFilter),
      this.store.select($recipesPage),
    ),
    map(([_, recipeFilter, page]) => loadRecipes({filter: recipeFilter, page: page + 1})),
  ));

  loadRecipes = createEffect(() => this.actions$.pipe(
    ofType(loadRecipes),
    switchMap(({filter: recipeFilter, page}) => this.recipeService.getRecipes(
      recipeFilter.name,
      recipeFilter.ingredients,
      page,
    ).pipe(
      map(recipes => loadRecipesSuccess({
        recipes,
        page
      })),
      catchError(err => of(loadRecipesFail({err})))
    ))
  ));

  loadRecipesOnIngredientChange = createEffect(() => this.actions$.pipe(
    ofType(updateFilter),
    map(({name, ingredients}) => loadRecipes({filter: {ingredients, name}, page: 1}))
  ));

  constructor(
    private readonly actions$: Actions,
    private readonly recipeService: RecipeService,
    private readonly store: Store,
  ) {
  }
}
