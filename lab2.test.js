'use strict';

const { test } = require('node:test');
const assert = require('node:assert/strict');
const {
  pow, gcd, minDigit, fibb, pluralizeRecords, getSortedArray, cesar, Calculator, isPrime,
} = require('./lab2');

// 8.1. Калькулятор.
const calculator = new Calculator();
for (const [method, a, b, expected] of [
  ['add', 2, 3, 5], ['add', -2, 2, 0],
  ['subtract', 3, 5, -2], ['subtract', 3, 3, 0],
  ['multiply', -2, 3, -6], ['multiply', 7, 0, 0],
  ['divide', 7, 2, 3.5], ['divide', 0, 2, 0], ['divide', 6, -2, -3],
]) {
  test(`Calculator.${method}(${a}, ${b})`, () => {
    assert.equal(calculator[method](a, b), expected);
  });
}

test('Calculator.divide: деление на ноль', () => {
  assert.throws(() => calculator.divide(7, 0), RangeError);
});

// 8.2. Признак простого числа.
for (const [value, expected] of [
  [-7, false], [0, false], [1, false], [2, true], [3, true],
  [4, false], [49, false], [97, true], [2.5, false],
]) {
  test(`isPrime(${value})`, () => {
    assert.equal(isPrime(value), expected);
  });
}

// 8.3. Параметризованные тесты функций из заданий 1–7.
const fib1000 = 43466557686937456435688527675040625802564660517371780402481729089536555417949051890403879840079255169295922593080322634775209689623239873322471161642996440906533187938298969649928516003704476137795166849228875n;

for (const [fn, cases] of [
  [pow, [
    [[2, 5], 32], [[5, 1], 5], [[0, 3], 0], [[-2, 3], -8],
    [[-2, 4], 16], [[0.5, 2], 0.25],
  ]],
  [gcd, [
    [[48, 18], 6], [[18, 48], 6], [[7, 7], 7], [[13, 27], 1],
    [[9, 0], 9], [[0, 9], 9], [[0, 0], 0],
  ]],
  [minDigit, [
    [[0], 0], [[7], 7], [[9216], 1], [[7021], 0], [[6780], 0], [[999], 9],
  ]],
  [fibb, [
    [[0], 0n], [[1], 1n], [[2], 1n], [[10], 55n], [[1000], fib1000],
  ]],
  [cesar, [
    [['хакуна матата', 8, 'encode'], 'эзтыхз фзъзъз'],
    [['эзтыхз фзъзъз', 8, 'decode'], 'хакуна матата'],
    [['Её Я! 42, A🙂', 1, 'encode'], 'Ёж А! 42, A🙂'],
    [['Ёж А! 42, A🙂', 1, 'decode'], 'Её Я! 42, A🙂'],
    [['Абв!', 33, 'encode'], 'Абв!'], [['а', -1, 'encode'], 'я'],
    [['а', 34, 'encode'], 'б'], [['Абв', 0, 'decode'], 'Абв'],
    [['', 8, 'decode'], ''],
  ]],
]) {
  cases.forEach(([args, expected], index) => {
    test(`${fn.name}: набор данных ${index + 1}`, () => {
      assert.equal(fn(...args), expected);
    });
  });
}

for (const exponent of [0, -1, 1.5]) {
  test(`pow: недопустимая степень ${exponent}`, () => {
    assert.throws(() => pow(2, exponent), RangeError);
  });
}

for (const [n, fragment] of [
  [0, 'было найдено 0 записей'], [1, 'была найдена 1 запись'],
  [2, 'было найдено 2 записи'], [4, 'было найдено 4 записи'], [5, 'было найдено 5 записей'],
  [11, 'было найдено 11 записей'], [12, 'было найдено 12 записей'],
  [14, 'было найдено 14 записей'], [21, 'была найдена 21 запись'],
  [22, 'было найдено 22 записи'], [111, 'было найдено 111 записей'],
  [114, 'было найдено 114 записей'],
]) {
  test(`pluralizeRecords(${n})`, () => {
    assert.equal(pluralizeRecords(n), 'В результате выполнения запроса ' + fragment);
  });
}

for (const [name, key, array, positions] of [
  ['пустой массив', 'score', [], []],
  ['один объект', 'score', [{ score: 3 }], [0]],
  ['числа и равные ключи', 'score', [
    { score: 5 }, { score: -2, id: 'a' }, { score: -2, id: 'b' }, { score: 0 },
  ], [1, 2, 3, 0]],
  ['строки', 'name', [{ name: 'Борис' }, { name: 'Анна' }, { name: 'Яна' }], [1, 0, 2]],
  ['смешанные ключи', 'key', [{ key: '2' }, { key: 10 }, { key: 2 }, { key: '10' }], [2, 1, 3, 0]],
]) {
  test(`getSortedArray: ${name}`, () => {
    const original = array.slice();
    assert.deepEqual(getSortedArray(array, key), positions.map((index) => array[index]));
    assert.deepEqual(array, original);
  });
}
