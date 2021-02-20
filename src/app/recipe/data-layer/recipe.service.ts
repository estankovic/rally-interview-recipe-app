import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Recipe} from './recipe.interface';
import {HttpClient, HttpParams} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {environment} from '../../../environments/environment';

@Injectable({providedIn: 'root'})
export class RecipeService {

  constructor(private readonly http: HttpClient) {
  }

  getRecipes(name = '', ingredients = '', page = 1): Observable<Recipe[]> {

    const params = new HttpParams({
      fromObject: {
        i: ingredients,
        q: name,
        p: page.toString()
      }
    });

    return this.http.get<{results: Recipe[]}>(environment.apiUrl, {params}).pipe(
      map(res => res.results)
    );
  }
}
