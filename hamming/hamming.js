export const compute = (str1, str2) => {
  let count = 0;

  if (str1.length === str2.length) {
    for (let i = 0; i < str1.length; i += 1) {
      count += str1[i] !== str2[i] ? 1 : 0;
    }
  } else {
    throw new Error('strands must be of equal length');
  }
  return count;
};

// export default compute;
