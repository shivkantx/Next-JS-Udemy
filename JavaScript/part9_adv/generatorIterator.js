function* numberGenerator() {
  yield 1;
  yield 2;
  yield 3;
  yield 4;
}

let gen = numberGenerator();
let gentwo = numberGenerator();

console.log(gen.next().value);
console.log(gen.next().value);
console.log(gen.next().value);
console.log(gen.next().value);
console.log(gen.next().value);

console.log(gentwo.next().value);
console.log(gentwo.next().value);
console.log(gentwo.next().value);
