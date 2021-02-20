import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {loadRecipes, loadRecipesFail, loadRecipesFromHome, loadRecipesSuccess, updateIngredients} from './recipe.actions';
import {catchError, map, switchMap, take, withLatestFrom} from 'rxjs/operators';
import {RecipeService} from './recipe.service';
import {of} from 'rxjs';
import {Store} from '@ngrx/store';
import {$ingredients, $recipesPage} from './recipe.selectors';

@Injectable({providedIn: 'root'})
export class RecipeEffects {

  loadRecipesFromHome = createEffect(() => this.actions$.pipe(
    ofType(loadRecipesFromHome),
    withLatestFrom(
      this.store.select($ingredients).pipe(take(1)),
      this.store.select($recipesPage).pipe(take(1)),
    ),
    map(([_, ingredients, page]) => loadRecipes({ingredients, page})),
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
