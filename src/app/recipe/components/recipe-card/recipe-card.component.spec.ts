import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipeCardComponent } from './recipe-card.component';
import {Recipe} from '../../data-layer/recipe.interface';

describe('RecipeCardComponent', () => {
  let component: RecipeCardComponent;
  let fixture: ComponentFixture<RecipeCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecipeCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecipeCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('has title, ingredients, and link', () => {
    const recipe: Recipe = {
      href: 'http://res',
      title: 'Recipe',
      ingredients: 'onion, salt',
      thumbnail: ''
    };
    component.recipe = recipe;

    fixture.detectChanges();

    const el = fixture.nativeElement as HTMLElement;
    const title = el.querySelector('mat-card-title').textContent;
    const ingredients = el.querySelector('mat-card-content p').textContent;
    const linkElement = el.querySelector('mat-card-content a');
    const linkValue = linkElement.getAttribute('href');

    expect(title).toEqual(recipe.title);
    expect(ingredients).toEqual(recipe.ingredients);
    expect(linkElement).toBeTruthy();
    expect(linkValue).toEqual(recipe.href);
  });
});
