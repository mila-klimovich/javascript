const actions = ['wink', 'double blink', 'close your eyes', 'jump'];

const decToBinary = (num) => {
  if (num === 0) {
    return [];
  }

  let result = '';
  let number = num;

  while (number > 0) {
    result = (number % 2) + result;
    number = Math.floor(number / 2);
  }

  return result.split('');
};

export const commands = (n) => {
  const arr = decToBinary(n).reverse();
  let res = [];
  if (arr.length < 5) {
    for (let i = 0; i < arr.length; i += 1) {
      if (arr[i] === '1') {
        res.push(actions[i]);
      }
    }
  } else if (arr.length === 5) {
    for (let i = 0; i < arr.length - 1; i += 1) {
      if (arr[i] === '1') {
        res.push(actions[i]);
      }
    }
    res = res.reverse();
  }
  return res;
};
