import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Recipe} from './recipe.interface';
import {HttpClient, HttpParams} from '@angular/common/http';
import {map} from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class RecipeService {

  constructor(private readonly http: HttpClient) {
  }

  getRecipes(ingredients = '', page = 1): Observable<Recipe[]> {

    const params = new HttpParams({
      fromObject: {
        i: ingredients,
        p: page.toString()
      }
    });

    return this.http.get<{results: Recipe[]}>('http://www.recipepuppy.com/api', {params}).pipe(
      map(res => res.results)
    );
  }
}
