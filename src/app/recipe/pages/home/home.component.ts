import { Component, OnInit } from '@angular/core';
import {Store} from '@ngrx/store';
import {loadNextPage, loadRecipesFromHome, updateIngredients} from '../../data-layer/recipe.actions';
import {$ingredients, $recipeList, $recipesLoading} from '../../data-layer/recipe.selectors';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  recipes$ = this.store.select($recipeList);
  loading$ = this.store.select($recipesLoading);
  ingredients$ = this.store.select($ingredients);

  constructor(
    private readonly store: Store
  ) { }

  ngOnInit(): void {
    // todo: only if state is empty
    this.store.dispatch(loadRecipesFromHome());
  }

  onIngredientsChange(ingredients: string): void {
    this.store.dispatch(updateIngredients({ingredients}));
  }

  onScroll(event: any): void {
    this.store.dispatch(loadNextPage());
  }
}
