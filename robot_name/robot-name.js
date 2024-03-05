const generateTwoRandomLetters = () => {
  const randomLetter1 = String.fromCharCode(
    Math.floor(Math.random() * 26) + 65,
  );
  const randomLetter2 = String.fromCharCode(
    Math.floor(Math.random() * 26) + 65,
  );
  return randomLetter1 + randomLetter2;
};

const generateRandomNumber = () => Math.floor(Math.random() * (999 - 100 + 1)) + 100;

const generateRobotName = () => generateTwoRandomLetters() + generateRandomNumber().toString();

export class Robot {
  constructor() {
    this.pName = generateRobotName();
  }

  get name() {
    return this.pName;
  }

  arr = [this.pName];

  reset() {
    this.pName = '';
    do {
      this.pName = generateRobotName();
    } while (this.arr.includes(this.pName));
    this.arr.push(this.pName);
  }
}

Robot.releaseNames = () => {
};
