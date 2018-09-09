let getNumbers = function* getNumbers(words) {
  for (let word of words) {
    if(/^[0-9]+$/.test(word)) {
      yield parseInt(word, 10);
    }
  }
}

exports.getNumbers = getNumbers;