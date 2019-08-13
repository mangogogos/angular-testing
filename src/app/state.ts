import { Action } from '@ngrx/store';
import { Observable, combineLatest, empty, queueScheduler } from 'rxjs';
import { debounce, observeOn } from 'rxjs/operators';

export interface IDummyState {
    readonly foo: string;
    readonly bar: string;
  }
  
  export interface IState {
    readonly dummy: IDummyState;
  }
  
  const SET_FOO_TYPE = 'SET FOO';
  export class SetFoo implements Action {
    readonly type = SET_FOO_TYPE;
    constructor(readonly foo: string) {
        console.log('setting foo');
    }
  }
  
  const SET_BAR_TYPE = 'SET BAR';
  export class SetBar implements Action {
    readonly type = SET_BAR_TYPE;
    constructor(readonly bar: string) {
        console.log('setting bar');
    }
  }
  
  const SET_BOTH_TYPE = 'SET BOTH';
  export class SetBoth implements Action {
    readonly type = SET_BOTH_TYPE;
    constructor(readonly foo: string, readonly bar: string) {
        console.log('setting both');
    }
  }
  
  const initialState: IDummyState = {
    foo: '1',
    bar: '1',
  };
  
  type MyAction =
    | SetFoo
    | SetBar
    | SetBoth;
  
  export function reducer(state = initialState, action: MyAction): IDummyState {
    switch (action.type) {
      case SET_FOO_TYPE:
        return {
          ...state,
          foo: action.foo,
        };
  
      case SET_BAR_TYPE:
        return {
          ...state,
          bar: action.bar,
        };
  
      case SET_BOTH_TYPE:
        return {
          ...state,
          foo: action.foo,
          bar: action.bar,
        };
  
      default:
        return state;
    }
}

type ObservableTuple<T extends any[]> = {
    [K in keyof T]: Observable<T[K]>;
}

// https://stackoverflow.com/questions/57456271/how-to-remove-transient-events-from-rxjs-combinelatest-with-ngrx-store-source-ob/57466485#57466485
export function combineAndQueue<T extends any[]>(inputs: ObservableTuple<T>): Observable<T> {
    return combineLatest(inputs).pipe(debounce(() => empty().pipe(observeOn(queueScheduler)))) as Observable<T>;
}
