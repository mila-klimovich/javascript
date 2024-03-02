export class Series {
  constructor(series) {
    this.series = series;
  }

  slices(sliceLength) {
    if (!this.series.length) {
      throw new Error('series cannot be empty');
    } else if (sliceLength > this.series.length) {
      throw new Error('slice length cannot be greater than series length');
    } else if (sliceLength < 0) {
      throw new Error('slice length cannot be negative');
    } else if (sliceLength > 0) {
      const arr = [];
      const str = this.series.split('');
      let temp = '';
      for (let i = 0; i < str.length - sliceLength + 1; i += 1) {
        temp = str.slice(i, i + sliceLength).map((t) => parseInt(t, 10));
        arr.push(temp);
      }
      return arr;
    } else {
      throw new Error('slice length cannot be zero');
    }
  }
}
