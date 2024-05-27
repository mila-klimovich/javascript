export class Allergies {
  constructor(number) {
    this.allergies = number;
  }

  foodCodes = [
    ['eggs', 1],
    ['peanuts', 2],
    ['shellfish', 4],
    ['strawberries', 8],
    ['tomatoes', 16],
    ['chocolate', 32],
    ['pollen', 64],
    ['cats', 128],
  ];

  list() {
    const hasAllergies = [];

    let foodCodesCopy = this.foodCodes.slice();
    let total = this.allergies;
    foodCodesCopy = foodCodesCopy.filter((f) => f[1] < total);

    switch (total) {
      case 0:
        hasAllergies.push();
        break;
      case 1:
        hasAllergies.push('eggs');
        break;
      case 2:
        hasAllergies.push('peanuts');
        break;
      case 4:
        hasAllergies.push('shellfish');
        break;
      case 8:
        hasAllergies.push('strawberries');
        break;
      case 16:
        hasAllergies.push('tomatoes');
        break;
      case 32:
        hasAllergies.push('chocolate');
        break;
      case 64:
        hasAllergies.push('pollen');
        break;
      case 128:
        hasAllergies.push('cats');
        break;
      default:
        if (total > 255) {
          let temp = 1;
          do {
            temp *= 2;
          } while (temp < total / 2);
          total -= temp;
        }

        if (total % 2 !== 0) {
          total -= 1;

          for (let i = foodCodesCopy.length - 1; i > 0; i -= 1) {
            total -= foodCodesCopy[i][1];
            hasAllergies.unshift(foodCodesCopy[i][0]);
            if (total === 0) {
              break;
            }
          }
          hasAllergies.unshift('eggs');
        } else if (total % 2 === 0) {
          for (let i = foodCodesCopy.length - 1; i > 0; i -= 1) {
            total -= foodCodesCopy[i][1];
            hasAllergies.unshift(foodCodesCopy[i][0]);
            if (total === 0) {
              break;
            }
          }
        }
    }
    return hasAllergies;
  }

  allergicTo(food) {
    let foodCodesCopy = this.foodCodes.slice();
    let total = this.allergies;
    const foodIndex = foodCodesCopy.findIndex((f) => f[0] === food);
    let result;
    this.foodCodes.map((al) => {
      if (al.includes(food)) {
        if (al[1] === total) {
          result = true;
        } else if (al[1] > total) {
          result = false;
        } else if (al[1] < total) {
          total -= al[1];
          foodCodesCopy.splice(foodIndex, 1);
          const limit = total;
          foodCodesCopy = foodCodesCopy.filter((f) => f[1] <= limit);
          if (foodCodesCopy.length === 0) result = false;
          for (let i = foodCodesCopy.length - 1; i >= 0; i -= 1) {
            total -= foodCodesCopy[i][1];
            if (total === 0) {
              break;
            }
          }
          if (total === 0) {
            result = true;
          } else {
            result = false;
          }
        }
      }
      return result;
    });
    return result;
  }
}
