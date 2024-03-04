export class Robot {
  constructor() {
    this.pName = String.fromCharCode(Math.floor(Math.random() * (90 - 65 + 1)) + 65)
    + String.fromCharCode(Math.floor(Math.random() * (90 - 65 + 1)) + 65)
    + (Math.floor(Math.random() * (999 - 100 + 1)) + 100).toString();
  }

  get name() {
    return this.pName;
  }

  arr = [this.pName];

  reset() {
    this.pName = '';
    do {
      this.pName = String.fromCharCode(Math.floor(Math.random() * (90 - 65 + 1)) + 65)
      + String.fromCharCode(Math.floor(Math.random() * (90 - 65 + 1)) + 65)
      + (Math.floor(Math.random() * (999 - 100 + 1)) + 100).toString();
    } while (this.arr.includes(this.pName));
    this.arr.push(this.pName);
  }
}

Robot.releaseNames = () => {
};
