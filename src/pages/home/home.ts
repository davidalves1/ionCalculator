import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  calculation: string = '';
  operators: any[] = ['+', '-', '*', '/'];

  constructor(public navCtrl: NavController) {

  }

  setCalculation(value) {
    const lastChar = this.calculation.charAt(this.calculation.length - 1);

    if (this.operators.includes(value) && this.calculation.length === 0) {
      this.calculation = '0' + String(value);
      return;
    }

    if (this.operators.includes(lastChar) && this.operators.includes(value)) {
      return;
    }

    if (this.operators.includes(value) && this.calculation.search(/[+*\/-]/g) !== -1) {
      const onlyOperators = this.calculation.replace(/\d/g, '');
      console.log('index', onlyOperators);

      const operator = onlyOperators.slice(-1);
      console.log('operator', operator);

      const values = this.calculation.split(operator);
      console.log('values', values);

      this.calculation = String(this.getPartialResult(operator, ...values));
    }

    this.calculation += String(value);
  }

  clearInput() {
    this.calculation = '';
  }

  showResult() {
    console.log('result:', this.calculation);
  }

  private getPartialResult(operator, a, b) {
    switch (operator) {
      case '+': {
        return this.sum(a, b);
        break;
      }

      case '-': {
        return this.subt(a, b);
        break;
      }

      case '*': {
        return this.multi(a, b);
        break;
      }

      case '/': {
        return this.div(a, b);
        break;
      }

      default: {
        return '';
        break;
      }
    }
  }

  private sum(a, b) {
    return parseFloat(a) + parseFloat(b);
  }

  private subt(a, b) {
    return parseFloat(a) - parseFloat(b);
  }

  private multi(a, b) {
    return parseFloat(a) * parseFloat(b);
  }

  private div(a, b) {
    return parseFloat(a) / parseFloat(b);
  }

}
