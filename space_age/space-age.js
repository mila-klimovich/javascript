const age = (planet, time) => {
  let spaceAge;

  switch (planet) {
    case 'earth':
      spaceAge = time / 31557600;
      break;
    case 'mercury':
      spaceAge = time / (31557600 * 0.2408467);
      break;
    case 'venus':
      spaceAge = time / (31557600 * 0.61519726);
      break;
    case 'mars':
      spaceAge = time / (31557600 * 1.8808158);
      break;
    case 'jupiter':
      spaceAge = time / (31557600 * 11.862615);
      break;
    case 'saturn':
      spaceAge = time / (31557600 * 29.447498);
      break;
    case 'uranus':
      spaceAge = time / (31557600 * 84.016846);
      break;
    case 'neptune':
      spaceAge = time / (31557600 * 164.79132);
      break;
    default:
      spaceAge = time;
  }
  return parseFloat(spaceAge.toFixed(2));
};

export { age };
