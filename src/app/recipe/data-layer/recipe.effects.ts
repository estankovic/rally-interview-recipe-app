import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {loadNextPage, loadRecipes, loadRecipesFail, loadRecipesFromHomeInit, loadRecipesSuccess, updateIngredients} from './recipe.actions';
import {catchError, filter, map, switchMap, take, withLatestFrom} from 'rxjs/operators';
import {RecipeService} from './recipe.service';
import {of} from 'rxjs';
import {Store} from '@ngrx/store';
import {$ingredients, $isFreshState, $recipesPage} from './recipe.selectors';

@Injectable({providedIn: 'root'})
export class RecipeEffects {

  loadRecipesFromHomeInit = createEffect(() => this.actions$.pipe(
    ofType(loadRecipesFromHomeInit),
    withLatestFrom(
      this.store.select($isFreshState),
      this.store.select($ingredients),
      this.store.select($recipesPage),
    ),
    // allow only when state was not initialized from localstorage
    filter(([_, isFresh]) => isFresh),
    map(([_, __, ingredients, page]) => loadRecipes({ingredients, page})),
  ));

  loadNextPage = createEffect(() => this.actions$.pipe(
    ofType(loadNextPage),
    withLatestFrom(
      this.store.select($ingredients),
      this.store.select($recipesPage),
    ),
    map(([_, ingredients, page]) => loadRecipes({ingredients, page: page + 1})),
  ));

  loadRecipes = createEffect(() => this.actions$.pipe(
    ofType(loadRecipes),
    switchMap(({ingredients, page}) => this.recipeService.getRecipes(ingredients, page).pipe(
      map(recipes => loadRecipesSuccess({
        recipes,
        page
      })),
      catchError(err => of(loadRecipesFail({err})))
    ))
  ));

  loadRecipesOnIngredientChange = createEffect(() => this.actions$.pipe(
    ofType(updateIngredients),
    map(({ingredients}) => loadRecipes({ingredients, page: 1}))
  ));

  constructor(
    private readonly actions$: Actions,
    private readonly recipeService: RecipeService,
    private readonly store: Store,
  ) {
  }
}
