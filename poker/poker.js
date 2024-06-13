function handsToArrays(hands) {
  const splitHands = hands
    .map((hand) => hand
      .replaceAll('J', '11')
      .replaceAll('Q', '12')
      .replaceAll('K', '13')
      .replaceAll('A', '14'))
    .map((h) => h.split(' '));

  const stringsToArrays = [];

  splitHands.forEach((splitHand) => {
    const modifiedSplitHand = [...splitHand];

    for (let i = 0; i < modifiedSplitHand.length; i += 1) {
      modifiedSplitHand[i] = modifiedSplitHand[i].split('');
      if (modifiedSplitHand[i].length === 2) {
        modifiedSplitHand[i][0] = parseInt(modifiedSplitHand[i][0], 10);
      } else if (modifiedSplitHand[i].length === 3) {
        const temp = [];
        temp.push(modifiedSplitHand[i][0] + modifiedSplitHand[i][1]);
        temp.push(modifiedSplitHand[i][2]);
        modifiedSplitHand[i] = temp;
        modifiedSplitHand[i][0] = parseInt(modifiedSplitHand[i][0], 10);
      }
    }
    stringsToArrays.push(modifiedSplitHand);
  });

  stringsToArrays.forEach((arr, index) => {
    const modifiedArr = [...arr];
    let swapped;
    do {
      swapped = false;

      for (let i = 0; i < modifiedArr.length - 1; i += 1) {
        if (modifiedArr[i][0] > modifiedArr[i + 1][0]) {
          const temp = modifiedArr[i];
          modifiedArr[i] = modifiedArr[i + 1];
          modifiedArr[i + 1] = temp;
          swapped = true;
        }
      }
    } while (swapped);
    stringsToArrays[index] = modifiedArr;
  });
  return stringsToArrays;
}

function winsWithStraightFlush(hands) {
  const arrayOfHands = handsToArrays(hands);
  const winningIndexArray = [];
  arrayOfHands.forEach((hand) => {
    if (
      hand.every(
        (card, i) => card[1] === hand[0][1] && (i === 0 || card[0] === hand[i - 1][0] + 1),
      )
    ) {
      const res = arrayOfHands.findIndex((a) => a === hand);
      winningIndexArray.push(res);
    }
  });
  let winningIndex = [];
  if (winningIndexArray.length === 1) {
    [winningIndex] = winningIndexArray;
  } else if (winningIndexArray.length > 1) {
    if (arrayOfHands[winningIndexArray[0]][4][0] < arrayOfHands[winningIndexArray[1]][4][0]) {
      [, winningIndex] = winningIndexArray;
    } else {
      [winningIndex] = winningIndexArray;
    }
  }
  return hands[winningIndex];
}

function winsWithFourOfAKind(hands) {
  const arrayOfHands = handsToArrays(hands);
  const winningIndexArray = [];
  const occurrences = arrayOfHands.map((hand) => hand.flat(1).filter((h) => typeof h === 'number').reduce((acc, curr) => {
    if (acc[curr]) {
      acc[curr] += 1;
    } else {
      acc[curr] = 1;
    }
    return acc;
  }, {}));
  const values = occurrences.map((o) => Object.values(o));
  values.forEach((v, i) => {
    if (v.includes(4)) {
      winningIndexArray.push(i);
    }
  });
  const keys = occurrences.map((o) => parseInt(Object.keys(o).find((key) => o[key] === 4), 10));
  const kickerKeys = occurrences.map((o) => parseInt(Object.keys(o).find(
    (key) => o[key] !== 4,
  ), 10));
  let winningIndex = [];
  if (winningIndexArray.length === 1) {
    [winningIndex] = winningIndexArray;
  } else if (winningIndexArray.length > 1) {
    if (keys[0] !== keys[1]) {
      winningIndex = keys.indexOf(Math.max(...keys));
    } else {
      winningIndex = kickerKeys.indexOf(Math.max(...kickerKeys));
    }
  }
  return hands[winningIndex];
}

const winsWithFullHouse = (hands) => {
  const arrayOfHands = handsToArrays(hands);

  const winningIndexArray = [];
  const occurrences = arrayOfHands.map((hand) => hand
    .flat(1)
    .filter((h) => typeof h === 'number')
    .reduce((acc, curr) => {
      if (acc[curr]) {
        acc[curr] += 1;
      } else {
        acc[curr] = 1;
      }
      return acc;
    }, {}));
  const values = occurrences.map((o) => Object.values(o));
  values.forEach((v, i) => {
    if (v.includes(3) && v.includes(2)) {
      winningIndexArray.push(i);
    }
  });

  const kickerKeys = occurrences.map((o) => parseInt(Object.keys(o).find(
    (key) => o[key] === 3,
  ), 10));
  const pairKeys = occurrences.map((o) => parseInt(Object.keys(o).find((key) => o[key] !== 3), 10));

  let winningIndex = [];
  if (winningIndexArray.length === 1) {
    [winningIndex] = winningIndexArray;
  } else if (winningIndexArray.length > 1) {
    if (kickerKeys[0] !== kickerKeys[1]) {
      winningIndex = kickerKeys.indexOf(Math.max(...kickerKeys));
    } else {
      winningIndex = pairKeys.indexOf(Math.max(...pairKeys));
    }
  }
  return hands[winningIndex];
};

const winsWithFlush = (hands) => {
  const arrayOfHands = handsToArrays(hands);
  const winningIndexArray = [];
  arrayOfHands.forEach((hand) => {
    if (hand.every((card) => card[1] === hand[0][1])) {
      const res = arrayOfHands.findIndex((a) => a === hand);
      winningIndexArray.push(res);
    }
  });
  const numbersArray = arrayOfHands.map((hand) => hand.flat(1).filter((h) => typeof h === 'number'));
  let winningIndex = [];
  if (winningIndexArray.length === 1) {
    [winningIndex] = winningIndexArray;
  } else if (winningIndexArray.length > 1) {
    if (Math.max(...numbersArray[0]) > Math.max(...numbersArray[1])) {
      winningIndex = 0;
    } else {
      winningIndex = 1;
    }
  }
  return hands[winningIndex];
};

function winWithAStraight(hands) {
  const arrayOfHands = handsToArrays(hands);

  arrayOfHands.forEach((hand, index) => {
    const modifiedHand = [...hand];

    if (modifiedHand.flat(1).includes(14) && modifiedHand.flat(1).includes(2)) {
      const indexOf14 = modifiedHand.findIndex((h) => h[0] === 14);
      if (indexOf14 !== -1) {
        modifiedHand[indexOf14][0] = 1;
        const newFirstEl = modifiedHand.splice(indexOf14, 1)[0];
        modifiedHand.unshift(newFirstEl);
      }
    }

    arrayOfHands[index] = modifiedHand;
  });

  const winningIndexArray = [];
  arrayOfHands.forEach((hand) => {
    if (hand.every((card, i) => i === 0 || card[0] === hand[i - 1][0] + 1)) {
      const res = arrayOfHands.findIndex((a) => a === hand);
      winningIndexArray.push(res);
    }
  });

  let winningIndex = [];
  if (winningIndexArray.length === 1) {
    [winningIndex] = winningIndexArray;
  } else if (winningIndexArray.length > 1) {
    if (arrayOfHands[winningIndexArray[0]][4][0] < arrayOfHands[winningIndexArray[1]][4][0]) {
      [, winningIndex] = winningIndexArray;
    } else {
      [winningIndex] = winningIndexArray;
    }
  }
  return hands[winningIndex];
}

const winsWithThreeOfAKind = (hands) => {
  const arrayOfHands = handsToArrays(hands);

  const winningIndexArray = [];
  const occurrences = arrayOfHands.map((hand) => hand.flat(1).filter((h) => typeof h === 'number').reduce((acc, curr) => {
    if (acc[curr]) {
      acc[curr] += 1;
    } else {
      acc[curr] = 1;
    }
    return acc;
  }, {}));
  const values = occurrences.map((o) => Object.values(o));
  values.forEach((v, i) => {
    if (v.includes(3)) {
      winningIndexArray.push(i);
    }
  });

  const tripletKeys = occurrences.map(
    (o) => parseInt(Object.keys(o).find((key) => o[key] === 3), 10),
  );

  const remainingKeys = [];
  occurrences.forEach((o) => {
    const remKey = Object.keys(o).filter((key) => o[key] !== 3);
    remainingKeys.push(remKey.map((r) => parseInt(r, 10)));
  });

  const maxOfRemaining = [
    Math.max(...remainingKeys[0]),
    Math.max(...remainingKeys[1]),
  ];

  let winningIndex = [];
  if (winningIndexArray.length === 1) {
    [winningIndex] = winningIndexArray;
  } else if (winningIndexArray.length > 1) {
    if (tripletKeys[0] !== tripletKeys[1]) {
      winningIndex = tripletKeys.indexOf(Math.max(...tripletKeys));
    } else {
      winningIndex = maxOfRemaining.indexOf(Math.max(...maxOfRemaining));
    }
  }
  return hands[winningIndex];
};

const winsWithPairs = (hands) => {
  const arrayOfHands = handsToArrays(hands);
  const occurrences = arrayOfHands.map((hand) => hand.flat(1).filter((h) => typeof h === 'number').reduce((acc, curr) => {
    if (acc[curr]) {
      acc[curr] += 1;
    } else {
      acc[curr] = 1;
    }
    return acc;
  }, {}));

  const onlyPairs = occurrences.reduce((acc, curr) => {
    const filteredObj = {};
    Object.entries(curr).forEach(([key, value]) => {
      if (value === 2) {
        filteredObj[key] = value;
      }
    });
    acc.push(filteredObj);
    return acc;
  }, []);

  const keyOfPairs = [];
  onlyPairs.forEach((o) => {
    const remKey = Object.keys(o);
    keyOfPairs.push(remKey.map((r) => parseInt(r, 10)));
  });

  if (keyOfPairs.flat(1).length === 0) {
    return undefined;
  }

  const kickers = occurrences
    .reduce((acc, curr) => {
      const filteredObj = {};
      Object.entries(curr).forEach(([key, value]) => {
        if (value !== 2) {
          filteredObj[key] = value;
        }
      });
      acc.push(filteredObj);
      return acc;
    }, [])
    .map((k) => parseInt(Object.keys(k)[0], 10));

  let winningIndex;
  const pairsFirstHand = Object.keys(onlyPairs[0]).length;
  const pairsSecondHand = Object.keys(onlyPairs[1]).length;
  if (pairsFirstHand !== pairsSecondHand) {
    winningIndex = pairsFirstHand > pairsSecondHand ? 0 : 1;
  } else if (Math.max(...keyOfPairs[0]) !== Math.max(...keyOfPairs[1])) {
    winningIndex = Math.max(...keyOfPairs[0]) > Math.max(...keyOfPairs[1]) ? 0 : 1;
  } else if (Math.min(...keyOfPairs[0]) !== Math.min(...keyOfPairs[1])) {
    winningIndex = Math.min(...keyOfPairs[0]) > Math.min(...keyOfPairs[1]) ? 0 : 1;
  } else {
    winningIndex = kickers.indexOf(Math.max(...kickers));
  }
  return hands[winningIndex];
};

const winsWithHighestCard = (hands) => {
  const arrayOfHands = handsToArrays(hands);
  const numbersArray = arrayOfHands.map((hand) => hand.map((h) => h[0]));

  const arrOfMax = numbersArray.map((n) => Math.max(...n));
  const hasDuplicates = (arr) => arrOfMax.length !== new Set(arr).size;

  let result;
  if (hasDuplicates(arrOfMax)) {
    const max = Math.max(...arrOfMax);
    const winningIndexArray = arrOfMax.reduce((acc, curr, index) => {
      if (curr === max) acc.push(index);
      return acc;
    }, []);

    if (winningIndexArray.length > 1) {
      const sameHigh = winningIndexArray.map((index) => numbersArray[index]);
      let isTie = null;
      for (let i = numbersArray.length - 1; i >= 0; i -= 1) {
        if (sameHigh[0][i] < sameHigh[1][i]) {
          isTie = 1;
        } else if (sameHigh[0][i] > sameHigh[1][i]) {
          isTie = 0;
        }
      }
      if (isTie !== null) {
        result = [hands[isTie]];
      } else {
        result = winningIndexArray.map((index) => hands[index]);
      }
    }
  } else {
    const winningIndex = arrOfMax.indexOf(Math.max(...arrOfMax));
    result = [hands[winningIndex]];
  }
  return result;
};

export const bestHands = (hands) => {
  let expected = [];
  if (hands.length === 1) {
    expected = hands;
  } else if (hands.length > 1) {
    let winningHand = winsWithStraightFlush(hands);
    if (winningHand) {
      expected.push(winningHand);
    } else if (!winningHand) {
      winningHand = winsWithFourOfAKind(hands);
      if (winningHand) {
        expected.push(winningHand);
      } else if (!winningHand) {
        winningHand = winsWithFullHouse(hands);
        if (winningHand) {
          expected.push(winningHand);
        } else if (!winningHand) {
          winningHand = winsWithFlush(hands);
          if (winningHand) {
            expected.push(winningHand);
          } else if (!winningHand) {
            winningHand = winWithAStraight(hands);
            if (winningHand) {
              expected.push(winningHand);
            } else if (!winningHand) {
              winningHand = winsWithThreeOfAKind(hands);
              if (winningHand) {
                expected.push(winningHand);
              } else if (!winningHand) {
                winningHand = winsWithPairs(hands);
                if (winningHand) {
                  expected.push(winningHand);
                } else if (!winningHand) {
                  winningHand = winsWithHighestCard(hands);
                  if (winningHand) {
                    expected.push(...winningHand);
                  }
                }
              }
            }
          }
        }
      }
    }
  }
  return expected.flat();
};
