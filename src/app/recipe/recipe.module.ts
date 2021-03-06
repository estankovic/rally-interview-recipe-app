import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RecipeRoutingModule } from './recipe-routing.module';
import { HomeComponent } from './pages/home/home.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { RecipeCardComponent } from './components/recipe-card/recipe-card.component';
import {StoreModule} from '@ngrx/store';
import {recipeReducer} from './data-layer/recipe.reducer';
import {EffectsModule} from '@ngrx/effects';
import {RecipeEffects} from './data-layer/recipe.effects';
import {HttpClientModule} from '@angular/common/http';
import {ReactiveFormsModule} from '@angular/forms';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatCardModule} from '@angular/material/card';
import {MatInputModule} from '@angular/material/input';
import {InfiniteScrollModule} from 'ngx-infinite-scroll';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatProgressBarModule} from '@angular/material/progress-bar';


@NgModule({
  declarations: [HomeComponent, SearchBarComponent, RecipeCardComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    RecipeRoutingModule,
    StoreModule.forFeature('recipe', recipeReducer),
    EffectsModule.forFeature([RecipeEffects]),
    MatToolbarModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatProgressBarModule,
    InfiniteScrollModule,
  ]
})
export class RecipeModule { }
