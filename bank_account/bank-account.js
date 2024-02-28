export class ValueError extends Error {
  constructor() {
    super('Bank account error');
  }
}

export class BankAccount {
  get balance() {
    if (this.pBalance == null) {
      throw new ValueError();
    } else {
      return this.pBalance;
    }
  }

  open() {
    if (this.pBalance >= 0 && this.pBalance != null) {
      throw new ValueError();
    } else {
      this.pBalance = 0;
    }
  }

  close() {
    if (this.pBalance == null) {
      throw new ValueError();
    } else {
      this.pBalance = null;
    }
  }

  deposit(amount) {
    if (this.pBalance == null || amount < 0) {
      throw new ValueError();
    } else {
      this.pBalance += amount;
    }
  }

  withdraw(amount) {
    if (this.pBalance == null || amount > this.pBalance || amount < 0) {
      throw new ValueError();
    } else {
      this.pBalance -= amount;
    }
  }
}
