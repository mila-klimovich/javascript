export const chain = (dominoes) => {
  const res = dominoes.slice();

  if (res.length === 1 && res[0][0] !== res[0][1]) {
    return null;
  }

  if (dominoes.length > 1) {
    const copy = dominoes.slice();
    const result = [];
    result.push(copy.splice(0, 1)[0]);
    while (copy.length > 0) {
      let flag = false;

      for (let i = 0; i < copy.length; i += 1) {
        if (result[result.length - 1][1] === copy[i][0]) {
          result.push(copy.splice(i, 1)[0]);
          flag = true;
          break;
        } else if (result[result.length - 1][1] === copy[i][1]) {
          copy[i].reverse();
          result.push(copy.splice(i, 1)[0]);
          flag = true;
          break;
        }
      }
      if (!flag) break;
    }
    if (result.length < dominoes.length) {
      return null;
    }
    return result;
  }
  return res;
};
