# Rxjs-demo

## description 
  rxjs introduction by implementation of Observer Pattern and Iterator Pattern with ES6 js

## usage for rxjs

### installation
    npm i rxjs -S

### ES5 common js

```code
const { Observable, Subject, ReplaySubject, from, of, range } = require('rxjs');
const { map, filter, switchMap } = require('rxjs/operators');

range(1, 200)
  .pipe(filter(x => x % 2 === 1), map(x => x + x))
  .subscribe(x => console.log(x));
```

### ES6 

```code
import { Observable, Subject, ReplaySubject, from, of, range } from 'rxjs';
import { map, filter, switchMap } from 'rxjs/operators';

range(1, 200)
  .pipe(filter(x => x % 2 === 1), map(x => x + x))
  .subscribe(x => console.log(x));
```