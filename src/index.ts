import Producer from './observerPattern/Producer';
import IteratorFromArray from './iteratorPattern/IteratorFromArray';
import {getNumbers} from './lazyEval/getNumbers';
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