import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Operator } from './operator.enum';

@Injectable({
  providedIn: 'root'
})
export class CalculateService {

  private operands: Array<number | Operator> = [];
  private stream: Subject<Array<number | Operator>> = new Subject();
  public resultStream: Observable<Array<number | Operator>> = this.stream.asObservable();

  constructor() { }

  press(char: string): void {
    switch (char) {
      case Operator.PLUS:
      case Operator.MINUS:
        this.updateOperator(char);
        break;
      case Operator.PLUSMINUS:
        this.negative();
        break;
      case Operator.EQUALS:
        break;
      case Operator.CLEAR:
        this.clearLastNumber();
        break;
      case Operator.ALLCLEAR:
        this.clearAll();
        break;
      default:
        this.updateNumber(char);
    }
  }

  private updateOperator(operator: Operator): void {
    const lastOperand = this.operands.pop();
    if (typeof lastOperand === 'number') {
      this.operands.push(lastOperand);
    };
    if (lastOperand !== undefined) { // empty array would pop undefined
      this.operands.push(operator);
    }
    this.emitNext();
  }

  private updateNumber(char: string): void {
    const lastOperand = this.operands.pop();
    if (lastOperand === undefined) {
      this.operands.push(parseInt(char, 10));
    } else if (typeof lastOperand === 'number') {
      this.operands.push(parseInt(lastOperand.toString() + char, 10));
    } else {
      this.operands.push(lastOperand);
      this.operands.push(parseInt(char, 10));
    }
    this.emitNext();
  }

  private negative(): void {
    const lastOperand = this.operands.pop();
    if (typeof lastOperand === 'number') {
      this.operands.push(-1 * lastOperand);  // -0 was not specified in AC, requres architectural change
    } else if (lastOperand !== undefined) { // empty array would pop undefined
      this.operands.push(lastOperand);
    }
    this.emitNext();
  }

  private clearLastNumber(): void {
    const lastOperand = this.operands.pop();
    if (typeof lastOperand !== 'number' && lastOperand !== undefined) {
      this.operands.push(lastOperand);
    }
    this.emitNext();
  }

  private clearAll(): void {
    this.operands = [];
    this.emitNext();
  }

  private emitNext(): void {
    this.stream.next([...this.operands]); // destructuring was needed to emit the changed array
  }
}
