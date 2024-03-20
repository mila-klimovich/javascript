const createMatrix = (string, number) => {
  const matrix = [];
  for (let i = 0; i < number; i += 1) {
    matrix[i] = [];
    for (let j = 0; j < string.length; j += 1) {
      matrix[i][j] = ' ';
    }
  }
  return matrix;
};

export const encode = (string, number) => {
  let matrix = createMatrix(string, number);
  let j = 0;
  let i = 0;

  while (j < string.length) {
    for (i = 0; i < number && j < string.length; i += 1) {
      matrix[i][j] = string[j];
      j += 1;
    }
    for (i = number - 2; i > 0 && j < string.length; i -= 1) {
      matrix[i][j] = string[j];
      j += 1;
    }
  }

  matrix = matrix.join('');

  let temp = '';
  for (let k = 0; k < matrix.length; k += 1) {
    if (matrix[k] !== ' ' && matrix[k] !== ',') {
      temp += matrix[k];
    }
  }

  return temp;
};

export const decode = (string, number) => {
  const matrix = createMatrix(string, number);
  let j = 0;
  let i = 0;

  while (j < string.length) {
    for (i = 0; i < number && j < string.length; i += 1) {
      matrix[i][j] = '?';
      j += 1;
    }
    for (i = number - 2; i > 0 && j < string.length; i -= 1) {
      matrix[i][j] = '?';
      j += 1;
    }
  }

  let s = 0;
  for (let a = 0; a < number; a += 1) {
    for (let b = 0; b < string.length; b += 1) {
      if (matrix[a][b] === '?') {
        matrix[a][b] = string[s];
        s += 1;
      }
    }
  }

  let temp = '';
  for (let c = 0; c < string.length; c += 1) {
    for (let d = 0; d < number; d += 1) {
      if (matrix[d][c] !== ' ') {
        temp += matrix[d][c];
      }
    }
  }

  return temp;
};
