import { TestBed } from '@angular/core/testing';
import {RecipeService} from './recipe.service';
import {HttpClient} from '@angular/common/http';
import {of} from 'rxjs';
import {environment} from '../../../environments/environment';


describe('RecipeService', () => {
  let service: RecipeService;
  const httpMockSpy = jasmine.createSpyObj( ['get']);
  httpMockSpy.get.and.returnValue(of({results: []}));

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {provide: HttpClient, useValue: httpMockSpy}
      ]
    });
    service = TestBed.inject(RecipeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call http client with proper QueryParams', () => {
    expect(service).toBeTruthy();

    service.getRecipes('recipe', 'onion', 1);

    expect(httpMockSpy.get).toHaveBeenCalledWith(environment.apiUrl, {
      params: {
        i: 'onion',
        q: 'recipe',
        p: '1'
      }
    });
  });
});
