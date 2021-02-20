import { Component, OnInit } from '@angular/core';
import {Store} from '@ngrx/store';
import {loadRecipesFromHome} from '../../data-layer/recipe.actions';
import {$recipeList} from '../../data-layer/recipe.selectors';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  recipes$ = this.store.select($recipeList);

  constructor(
    private readonly store: Store
  ) { }

  ngOnInit(): void {
    // todo: only if state is empty
    this.store.dispatch(loadRecipesFromHome());
  }

}
