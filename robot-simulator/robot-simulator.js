
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
    throw new Error('Remove this statement and implement this function');
  }
}
