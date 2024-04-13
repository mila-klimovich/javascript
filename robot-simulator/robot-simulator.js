export class InvalidInputError extends Error {
  constructor(message) {
    super();
    this.message = message || 'Invalid Input';
  }
}

export class Robot {
  constructor() {
    this.bearing = 'north';
  }

  dir = ['north', 'east', 'south', 'west'];

  get coordinates() {
    return [this.x, this.y];
  }

  place({ x, y, direction }) {
    if (this.dir.includes(direction)) {
      this.bearing = direction;
    } else {
      throw new InvalidInputError('Invalid direction');
    }
    this.x = x;
    this.y = y;
  }

  evaluate(instructions) {
    const instructionsArr = instructions.split('');

    instructionsArr.forEach((i) => {
      switch (i) {
        case 'R':
          if (this.dir.indexOf(this.bearing) < 3) {
            this.bearing = this.dir[this.dir.indexOf(this.bearing) + 1];
          } else if (this.dir.indexOf(this.bearing) === 3) {
            this.bearing = 'north';
          }
          break;
        case 'L':
          if (this.dir.indexOf(this.bearing) > 0) {
            this.bearing = this.dir[this.dir.indexOf(this.bearing) - 1];
          } else if (this.dir.indexOf(this.bearing) === 0) {
            this.bearing = 'west';
          }
          break;
        case 'A':
          switch (this.bearing) {
            case 'north':
              this.y += 1;
              break;
            case 'south':
              this.y -= 1;
              break;
            case 'east':
              this.x += 1;
              break;
            case 'west':
              this.x -= 1;
              break;
            default:
              break;
          }
          break;
        default:
      }
    });
  }
}
