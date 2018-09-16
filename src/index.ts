import Producer from './observerPattern/Producer';
import IteratorFromArray from './iteratorPattern/IteratorFromArray';
import {getNumbers} from './lazyEval/getNumbers';
import { Observable, of, from, interval, timer, Subject } from 'rxjs';
import {take} from 'rxjs/operators';
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


console.time('multiple subscribe case');
let source = interval(1000).pipe(take(3));
let observerA = {
  next: value => console.log(`A next: ${value}`),
  error: error => console.log(`A error: ${error}`),
  complete: () => console.log('A complete')
};
let observerB = {
  next: value => console.log(`B next: ${value}`),
  error: error => console.log(`B error: ${error}`),
  complete: () => console.log('B complete')
};
let subjectObj = new Subject();
subjectObj.subscribe(observerA);
source.subscribe(subjectObj);
setTimeout(()=> {
  subjectObj.subscribe(observerB);
}, 1000);
console.timeEnd('multiple subscribe case');