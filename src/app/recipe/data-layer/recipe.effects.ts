import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {loadRecipesFail, loadRecipesFromHomeScreen, loadRecipesSuccess} from './recipe.actions';
import {catchError, map, switchMap} from 'rxjs/operators';
import {RecipeService} from './recipe.service';
import {of} from 'rxjs';

@Injectable({providedIn: 'root'})
export class RecipeEffects {

  loadRecipes = createEffect(() => this.actions$.pipe(
    ofType(loadRecipesFromHomeScreen),
    switchMap(({ingredients, page}) => this.recipeService.getRecipes(ingredients, page).pipe(
      map(recipes => loadRecipesSuccess({
        recipes,
        page
      })),
      catchError(err => of(loadRecipesFail({err})))
    ))
  ));


  constructor(
    private readonly actions$: Actions,
    private readonly recipeService: RecipeService,
  ) {
  }
}
