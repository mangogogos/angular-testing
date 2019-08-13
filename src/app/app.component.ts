import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { IState, SetFoo, SetBar, SetBoth, combineAndQueue } from './state';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'angular-stuff';

  constructor(readonly store$: Store<IState>) {
  }

  ngOnInit() {
    const dummy$ = this.store$.pipe(select(state => state.dummy));
    
    const foo$ = dummy$.pipe(select(state => state.foo));
    const bar$ = dummy$.pipe(select(state => state.bar));

    combineAndQueue([foo$, bar$]).subscribe(([foo, bar]) => {
      console.log('foo:', foo);
      console.log('bar: ', bar);
    });

    this.store$.dispatch(new SetFoo('2'));
    this.store$.dispatch(new SetBar('2'));
    this.store$.dispatch(new SetBoth('3', '3'));
  }
}
