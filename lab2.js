'use strict';

// 1. Возведение в степень.
function pow(x, n) {
  if (!Number.isInteger(n) || n < 1) {
    throw new RangeError('n должно быть натуральным числом');
  }

  let result = 1;
  for (let i = 0; i < n; i++) {
    result *= x;
  }
  return result;
}

// 2. НОД по алгоритму Евклида.
function gcd(a, b) {
  while (b !== 0) {
    const remainder = a % b;
    a = b;
    b = remainder;
  }
  return a;
}

// 3. Наименьшая цифра.
function minDigit(x) {
  let minimum = x % 10;
  while (x >= 10 && minimum !== 0) {
    x = (x - x % 10) / 10;
    const digit = x % 10;
    if (digit < minimum) {
      minimum = digit;
    }
  }
  return minimum;
}

// 4. Числа Фибоначчи.
function fibb(n) {
  let current = 0n;
  let next = 1n;
  for (let i = 0; i < n; i++) {
    const sum = current + next;
    current = next;
    next = sum;
  }
  return current;
}

// 5. Согласование сказуемого и существительного с числом.
function pluralizeRecords(n) {
  const lastDigit = n % 10;
  const lastTwoDigits = n % 100;
  if (lastDigit === 1 && lastTwoDigits !== 11) {
    return `В результате выполнения запроса была найдена ${n} запись`;
  }

  const form = lastDigit >= 2 && lastDigit <= 4 && (lastTwoDigits < 12 || lastTwoDigits > 14)
    ? 'записи'
    : 'записей';
  return `В результате выполнения запроса было найдено ${n} ${form}`;
}

// 6. Сортировка вставками. Числа идут перед строками при смешанных ключах.
function getSortedArray(array, key) {
  const sorted = [];
  for (let i = 0; i < array.length; i++) {
    const item = array[i];
    let j = i;
    while (j > 0 && comesAfter(sorted[j - 1][key], item[key])) {
      sorted[j] = sorted[j - 1];
      j--;
    }
    sorted[j] = item;
  }
  return sorted;
}

function comesAfter(left, right) {
  if (typeof left === typeof right) {
    return left > right;
  }
  return typeof left === 'string';
}

// 7. Шифр Цезаря. «эзтыхз фзъзъз» при сдвиге 8: «хакуна матата».
function cesar(str, shift, action) {
  if (action !== 'encode' && action !== 'decode') {
    throw new RangeError('action должно быть encode или decode');
  }

  const alphabet = 'абвгдеёжзийклмнопрстуфхцчшщъыьэюя';
  const length = alphabet.length;
  const signedShift = action === 'decode' ? -shift : shift;
  const offset = ((signedShift % length) + length) % length;
  let result = '';

  for (const char of str) {
    const index = alphabet.indexOf(char.toLowerCase());
    if (index === -1) {
      result += char;
      continue;
    }

    const letter = alphabet[(index + offset) % length];
    result += char === alphabet[index] ? letter : letter.toUpperCase();
  }
  return result;
}

// 8. Методы для тестирования калькулятора и проверки простых чисел.
class Calculator {
  add(a, b) {
    return a + b;
  }

  subtract(a, b) {
    return a - b;
  }

  multiply(a, b) {
    return a * b;
  }

  divide(a, b) {
    if (b === 0) {
      throw new RangeError('Деление на ноль');
    }
    return a / b;
  }
}

function isPrime(n) {
  if (!Number.isInteger(n) || n < 2) {
    return false;
  }
  for (let divisor = 2; divisor * divisor <= n; divisor++) {
    if (n % divisor === 0) {
      return false;
    }
  }
  return true;
}

if (require.main === module) {
  const array = [{ name: 'Борис', score: 8 }, { name: 'Анна', score: 3 }];
  console.log('Исходный массив:', array);
  console.log('По возрастанию score:', getSortedArray(array, 'score'));
}

module.exports = { pow, gcd, minDigit, fibb, pluralizeRecords, getSortedArray, cesar, Calculator, isPrime };
