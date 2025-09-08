import { Injectable, signal } from '@angular/core';


const numbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
const operators = ['+', '-', 'x', '÷'];
const specialOperators = [ '%', '+/-', '.', '=', 'C', 'Backspace', 'Delete', 'Escape' ];

@Injectable({
  providedIn: 'root'
})
export class CalculatorService {

  public resultText = signal('0');
  public subResultText = signal('0');
  public lastOperator = signal('+');

  public constructNumber(value: string): void{
    if (![...numbers, ...operators, ...specialOperators].includes(value)) {
      console.log(`Invalid input: ${value}`);
      return;
    }

    if ( value === '=') {
      this.calculateResult();
      return;
    }

    if ( value === 'C') {
      //TODO
      console.log('Limpiar calculadora');
      this.resultText.set('0');
      this.subResultText.set('0');
      this.lastOperator.set('+');
      return;
    }

    //TODO: Revisar cuando tengamos numeros negativos
    if ( value === 'Backspace') {
      if ( this.resultText() === '0') return;
      if ( this.resultText().includes('-') && this.resultText().length === 2) {
        this.resultText.set('0');
        return;
      }

      if ( this.resultText().length === 1) {
        this.resultText.set('0');
        return; 
      }

      this.resultText.update((currentValue) =>  currentValue.slice(0, -1));
      return;
    }

    //Aplicar operador
    if ( operators.includes(value)) {
      //this.calculateResult();

      this.lastOperator.set(value);
      this.subResultText.set(this.resultText());
      this.resultText.set('0');
      return;
    }

    if (this.resultText().length >= 10) {
      console.log('Maximum number length reached');
      return;
    }

    //Validar punto decimal
    if ( value === '.') {
      if (this.resultText().includes('.')) {
        return;
      }

      if (this.resultText() === '0' || this.resultText() === '') {
        this.resultText.set('0.');
        return;
      }
      this.resultText.update((text) => text + '.');
      return;
    }

    //Manejo del cero
    if(value === '0' && (this.resultText() === '0' || this.resultText() === '-0')) {
      return;
    }

    //Cambiar signo

    if(value === '+/-') {
      if (this.resultText().includes('-')) {
        this.resultText.update( text => text.slice(1));
        return;
      }

      this.resultText.update(text => `-${text}`);
      return;
    }

    if( numbers.includes(value)) {
      if (this.resultText() === '0') {
        this.resultText.set(value);
        return;
      }

      if (this.resultText().includes('-0')) {
        this.resultText.set(`-${value}`);
        return;
      }

      //Si es un numero, concatenarlo
      this.resultText.update( text => text + value);
      return;
    }

    //Numeros
    this.resultText.update( text =>  text + value);
  }

  public calculateResult() {
    const number1 = parseFloat(this.subResultText());
    const number2 = parseFloat(this.resultText());

    let result = 0;

    switch (this.lastOperator()) {
      case '+':
        result = number1 + number2;
        break;
      case '-':
        result = number1 - number2;
        break;
      case 'x':
        result = number1 * number2;
        break;
      case '÷':
        if (number2 === 0) {
          console.error('Division by zero is not allowed');
          return;
        }
        result = number1 / number2;
        break;
      default:
        console.error(`Unknown operator: ${this.lastOperator()}`);
        return;
    }

    this.resultText.set(result.toString());
    this.subResultText.set('0');
    this.lastOperator.set('+'); // Reset to default operator after calculation



  }

}
