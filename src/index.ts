import Producer from './observerPattern/Producer';
import IteratorFromArray from './iteratorPattern/IteratorFromArray';
import {getNumbers} from './lazyEval/getNumbers';
import { Observable, of, from, interval, timer, Subject, BehaviorSubject, ReplaySubject, AsyncSubject, asyncScheduler} from 'rxjs';
import {take, multicast, map as Rmap, refCount, publish, share, observeOn} from 'rxjs/operators';
import {Promise} from 'es6-promise';
console.time('Observable example');
let egghead = new Producer();
function listener1(message) {
  console.log(`${message} from listener1`);
}
function listener2(message) {
  console.log(`${message} from listener2`);
}
egghead.addListener(listener1);
egghead.addListener(listener2);
egghead.notify('A new course!');
console.timeEnd('Observable example');

console.time('Iterator Pattern');
let iterator = new IteratorFromArray([1,2,3]);
let newIterator = iterator.map(value => value + 3);
console.log(newIterator.next());
console.log(newIterator.next());
console.log(newIterator.next());
console.log(newIterator.next());
console.timeEnd('Iterator Pattern');


console.time('lazy eval1');
const iteratorLazy = getNumbers('30 天精通 RxJS (04)');	
console.log(iteratorLazy.next());
// { value: 3, done: false }
console.log(iteratorLazy.next());
// { value: 0, done: false }
console.log(iteratorLazy.next());
// { value: 0, done: false }
console.log(iteratorLazy.next());
// { value: 4, done: false }
console.log(iteratorLazy.next());
console.timeEnd('lazy eval1');

console.time('observable example');
let observableObj = Observable.create(function(observer) {
  observer.next('Jerry');
  observer.next('Anna');
});

console.log('start');
observableObj.subscribe((value)=>{
  console.log(value);
});
console.log('end');
console.timeEnd('observable example');


// console.time('Observer Example');
// let observable = Observable.create((observer)=>{
//   try {
//     observer.next('first value');
//     observer.next('second value');
//     throw 'some exception';
//   } catch(e) {
//     observer.error(e);
//   }
// // });
// console.time('Observer Example');
// let observable = of('Jerry', 'Anna');

// console.time('Observer Example');
// const arr = ['Jerry', 'Anna', 2016, 2017, '30 days'] 
// let observable = from('測試');
console.time('Observer Example');
// let observable = from(new Promise((resolve, reject)=>{
//   setTimeout(()=> {
//     resolve('after 3 seconds');
//   }, 3000);
// }));
let observable = timer(1000,5000);
let observerObj = {
  next: (value) => {
    console.log(value);
  },
  error: (error) => {
    console.log('Error', error);
  },
  complete: () => {
    console.log('complete');
  }
}

let subscription = observable.subscribe(observerObj);
setTimeout(()=>{
  subscription.unsubscribe();
}, 5000);
console.timeEnd('Observer Example');

console.time('observable operator');
let people = of('Json', 'Michael');
function map(source, callback) {
  return Observable.create((observer)=>{
    return source.subscribe(
      (value) => {
        try {
          observer.next(callback(value));
        } catch(e) {
          observer.error(e);
        }
      },
      (err) => {observer.error(err);},
      () => {observer.complete();}
    );
  });
}

let helloPeople = map(people, (item) => item + 'Hello~');
helloPeople.subscribe(console.log);
console.timeEnd('observable operator');


// console.time('multiple subscribe case');
// let source = interval(1000).pipe(take(3));
// let observerA = {
//   next: value => console.log(`A next: ${value}`),
//   error: error => console.log(`A error: ${error}`),
//   complete: () => console.log('A complete')
// };
// let observerB = {
//   next: value => console.log(`B next: ${value}`),
//   error: error => console.log(`B error: ${error}`),
//   complete: () => console.log('B complete')
// };
// let subjectObj = new Subject();
// subjectObj.subscribe(observerA);
// source.subscribe(subjectObj);
// setTimeout(()=> {
//   subjectObj.subscribe(observerB);
// }, 1000);
// console.timeEnd('multiple subscribe case');

// console.time('behavior subject example');

// let observerA1 = {
//   next: value => console.log(`A1 next: ${value}`),
//   error: error => console.log(`A1 error: ${error}`),
//   complete: () => console.log('A1 complete')
// };
// let observerB1 = {
//   next: value => console.log(`B1 next: ${value}`),
//   error: error => console.log(`B1 error: ${error}`),
//   complete: () => console.log('B1 complete')
// };
// let behaviorSubObj = new BehaviorSubject(0);
// behaviorSubObj.subscribe(observerA1);
// behaviorSubObj.next(1);
// behaviorSubObj.next(2);
// behaviorSubObj.next(3);
// setTimeout(()=> {
//   behaviorSubObj.subscribe(observerB1);
// }, 1000);
// console.timeEnd('behavior subject example');


// console.time('Replay subject example');

// let observerA2 = {
//   next: value => console.log(`A2 next: ${value}`),
//   error: error => console.log(`A2 error: ${error}`),
//   complete: () => console.log('A2 complete')
// };
// let observerB2 = {
//   next: value => console.log(`B2 next: ${value}`),
//   error: error => console.log(`B2 error: ${error}`),
//   complete: () => console.log('B2 complete')
// };
// let replaySubObj = new ReplaySubject(2);
// replaySubObj.subscribe(observerA2);
// replaySubObj.next(1);
// replaySubObj.next(2);
// replaySubObj.next(3);
// setTimeout(()=> {
//   replaySubObj.subscribe(observerB2);
// }, 3000);
// console.timeEnd('Replay subject example');



// console.time('Async subject example');

// let observerA3 = {
//   next: value => console.log(`A3 next: ${value}`),
//   error: error => console.log(`A3 error: ${error}`),
//   complete: () => console.log('A3 complete')
// };
// let observerB3 = {
//   next: value => console.log(`B3 next: ${value}`),
//   error: error => console.log(`B3 error: ${error}`),
//   complete: () => console.log('B3 complete')
// };
// let asyncSubObj = new AsyncSubject();
// asyncSubObj.subscribe(observerA3);
// asyncSubObj.next(1);
// asyncSubObj.next(2);
// asyncSubObj.next(3);
// asyncSubObj.complete();
// setTimeout(()=> {
//   asyncSubObj.subscribe(observerB3);
// }, 3000);
// console.timeEnd('Async subject example');

// console.time('multicast refCount subscription example');
// let sourceMulti: any = interval(1000).pipe(take(7))
// .pipe(Rmap(x=>{console.log(`send: ${x}`); return x;})).pipe(multicast(new Subject()))
// .pipe(refCount());
// let observerA4 = {
//   next: value => console.log(`A4 next: ${value}`),
//   error: error => console.log(`A4 error: ${error}`),
//   complete: () => console.log('A4 complete')
// };
// let observerB4 = {
//   next: value => console.log(`B4 next: ${value}`),
//   error: error => console.log(`B4 error: ${error}`),
//   complete: () => console.log('B4 complete')
// };

// let subscribptionA4 = sourceMulti.subscribe(observerA4);
// let subscriptionB4;
// setTimeout(()=> {
//   subscriptionB4 = sourceMulti.subscribe(observerB4);
// }, 1000);
// setTimeout(()=> {
//   subscribptionA4.unsubscribe();
//   subscriptionB4.unsubscribe();
// }, 5000);
// console.timeEnd('multicast refCount subscription example');

// console.time('publish refCount subscription example');
// let sourceMulti: any = interval(1000).pipe(take(7))
// .pipe(Rmap(x=>{console.log(`send: ${x}`); return x;})).pipe(publish())
// .pipe(refCount());
// let observerA5 = {
//   next: value => console.log(`A5 next: ${value}`),
//   error: error => console.log(`A5 error: ${error}`),
//   complete: () => console.log('A5 complete')
// };
// let observerB5 = {
//   next: value => console.log(`B5 next: ${value}`),
//   error: error => console.log(`B5 error: ${error}`),
//   complete: () => console.log('B5 complete')
// };

// let subscribptionA5 = sourceMulti.subscribe(observerA5);
// let subscriptionB5;
// setTimeout(()=> {
//   subscriptionB5 = sourceMulti.subscribe(observerB5);
// }, 1000);
// setTimeout(()=> {
//   subscribptionA5.unsubscribe();
//   subscriptionB5.unsubscribe();
// }, 5000);
// console.timeEnd('publish refCount subscription example');


// console.time('share subscription example');
// let sourceMulti: any = interval(1000).pipe(take(7))
// .pipe(Rmap(x=>{console.log(`send: ${x}`); return x;})).pipe(share());
// let observerA6 = {
//   next: value => console.log(`A6 next: ${value}`),
//   error: error => console.log(`A6 error: ${error}`),
//   complete: () => console.log('A6 complete')
// };
// let observerB6 = {
//   next: value => console.log(`B6 next: ${value}`),
//   error: error => console.log(`B6 error: ${error}`),
//   complete: () => console.log('B6 complete')
// };

// let subscribptionA6 = sourceMulti.subscribe(observerA6);
// let subscriptionB6;
// setTimeout(()=> {
//   subscriptionB6 = sourceMulti.subscribe(observerB6);
// }, 1000);
// setTimeout(()=> {
//   subscribptionA6.unsubscribe();
//   subscriptionB6.unsubscribe();
// }, 5000);

// console.timeEnd('share subscription example');

// console.time('side effect example');
// let sourceSideEff: any = interval(1000).pipe(take(7))
// .pipe(Rmap(x=>Math.random())).pipe(share());
// let observerA7 = {
//   next: value => console.log(`A7 next: ${value}`),
//   error: error => console.log(`A7 error: ${error}`),
//   complete: () => console.log('A7 complete')
// };
// let observerB7 = {
//   next: value => console.log(`B7 next: ${value}`),
//   error: error => console.log(`B7 error: ${error}`),
//   complete: () => console.log('B7 complete')
// };
// sourceSideEff.subscribe(observerA7);
// sourceSideEff.subscribe(observerB7);
// console.timeEnd('side effect example');

console.time('scheduler Example');
let observableObj8 = Observable.create((observer)=>{
  observer.next(1);
  observer.next(2);
  observer.next(3);
  observer.complete()
}).pipe(observeOn(asyncScheduler));
console.log('before subscribe');
observableObj8.subscribe({
  next: (value) => {
    console.log(`got value: ${value}`);
  },
  error: (err) => {
    console.error(`got error: ${err}`);
  },
  complete: () => {
    console.log('done');
  }
});
console.log('after subscribe'); 
console.timeEnd('scheduler Example');