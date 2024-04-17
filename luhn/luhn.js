export const valid = (card) => {
  let cardNumber = card.split(' ').join('');

  if (cardNumber.length <= 1) {
    return false;
  }

  for (let i = 0; i < cardNumber.length; i += 1) {
    let temp = cardNumber.charCodeAt(i);
    if (temp >= 48 && temp <= 57) {
      temp = true;
    } else {
      temp = false;
    }
  }

  cardNumber = cardNumber.split('');

  for (let i = cardNumber.length - 2; i >= 0; i -= 2) {
    cardNumber[i] = Number(cardNumber[i]) * 2;
    if (cardNumber[i] > 9) {
      cardNumber[i] -= 9;
    }
  }

  cardNumber = cardNumber.map((s) => Number(s));

  let res = 0;
  cardNumber.forEach((i) => { res += i; return res; });

  if (res % 10 === 0) {
    res = true;
  } else {
    res = false;
  }

  return res;
};
