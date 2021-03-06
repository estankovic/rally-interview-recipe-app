import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {loadNextPage, loadRecipesFromHomeInit, updateFilter} from '../../data-layer/recipe.actions';
import {$recipeFilter, $recipeList, $recipesLoading} from '../../data-layer/recipe.selectors';
import {SearchBarData} from '../../components/search-bar/search-bar.interface';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent implements OnInit {

  recipes$ = this.store.select($recipeList);
  loading$ = this.store.select($recipesLoading);
  ingredients$ = this.store.select($recipeFilter);

  constructor(
    private readonly store: Store
  ) { }

  ngOnInit(): void {
    this.store.dispatch(loadRecipesFromHomeInit());
  }

  onIngredientsChange(filter: SearchBarData): void {
    this.store.dispatch(updateFilter(filter));
  }

  onScroll(event: any): void {
    this.store.dispatch(loadNextPage());
  }
}
