import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {Subject} from 'rxjs';
import {debounceTime, takeUntil} from 'rxjs/operators';
import {SearchBarData} from './search-bar.interface';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnInit, OnDestroy {

  @Input()
  set ingredients(value: SearchBarData) {
    this.form.patchValue(value, {emitEvent: false});
  }

  @Output() ingredientsChanged = new EventEmitter<SearchBarData>();

  form = new FormGroup({
    name: new FormControl(''),
    ingredients: new FormControl(''),
  });

  private destroyed$ = new Subject();

  constructor() { }

  ngOnInit(): void {
    this.form.valueChanges.pipe(
      takeUntil(this.destroyed$),
      debounceTime(500),
    ).subscribe(data => {
      this.ingredientsChanged.emit(data);
    });
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
}
