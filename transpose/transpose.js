const calcExpectedArrLength = (arr) => {
  let expectedArrLength = 0;
  for (let i = 0; i < arr.length; i += 1) {
    if (expectedArrLength < arr[i].length) {
      expectedArrLength = arr[i].length;
    }
  }
  return expectedArrLength;
};

const calcLongestStrIndex = (arr) => {
  let longestStrIndex = 0;
  for (let i = 0; i < arr.length; i += 1) {
    if (arr[i].length > arr[longestStrIndex].length) {
      longestStrIndex = i;
    }
  }
  return longestStrIndex;
};

export const transpose = (array) => {
  const expectedArrLength = calcExpectedArrLength(array);
  const newArray = [];
  let temp = '';
  const longestStrIndex = calcLongestStrIndex(array);

  for (let j = 0; j < expectedArrLength; j += 1) {
    temp = '';
    for (let i = 0; i < array.length; i += 1) {
      if (array[i][j]) {
        temp += array[i][j];
      } else if (
        i < longestStrIndex ||
        (array[i + 1] && j < array[i + 1].length) ||
        j < array[array.length - 1].length
      ) {
        temp += ' ';
      }
      newArray[j] = temp;
    }
  }
  return newArray;
};
