import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchBarComponent } from './search-bar.component';

describe('SearchBarComponent', () => {
  let component: SearchBarComponent;
  let fixture: ComponentFixture<SearchBarComponent>;

  let nameInput: HTMLInputElement;
  let ingredientsInput: HTMLInputElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchBarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    const el: HTMLElement = fixture.nativeElement;

    nameInput = el.querySelector('#name_input');
    ingredientsInput = el.querySelector('#ingredients_input');
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set values for forms when component input changes', () => {
    component.filterData = {
      name: 'recipe',
      ingredients: 'onion'
    };
    component.filterDataChanged = jasmine.createSpyObj(['next']);
    fixture.detectChanges();

    expect(component.form.getRawValue()).toEqual({ingredients: 'onion', name: 'recipe'});
    expect(component.filterDataChanged.next).not.toHaveBeenCalled();
  });

  it('should emits new data when ingredients changes', (done) => {
    component.form.get('name').setValue('onion');
    fixture.detectChanges();

    component.filterDataChanged.subscribe(val => {
      expect(val).toEqual({ingredients: '', name: 'onion'});
      done();
    });
  });

  it('should emits new data when recipe name changes', (done) => {
    component.form.get('ingredients').setValue('recipe');
    fixture.detectChanges();

    component.filterDataChanged.subscribe(val => {
      expect(val).toEqual({ingredients: 'recipe', name: ''});
      done();
    });
  });
});
