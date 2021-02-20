import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {Subject} from 'rxjs';
import {debounceTime, takeUntil} from 'rxjs/operators';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnInit, OnDestroy {

  @Input()
  set ingredients(value: string) {
    this.form.get('ingredients')?.patchValue(value, {emitEvent: false});
  }

  @Output() ingredientsChanged = new EventEmitter<string>();

  form = new FormGroup({
    ingredients: new FormControl('')
  });

  private destroyed$ = new Subject();

  constructor() { }

  ngOnInit(): void {
    this.form.get('ingredients')?.valueChanges.pipe(
      takeUntil(this.destroyed$),
      debounceTime(500),
    ).subscribe(ingredients => {
      this.ingredientsChanged.emit(ingredients);
    });
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
}
