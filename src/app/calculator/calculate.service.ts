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
        break;
      default:
        this.updateNumber(char);
    }
  }

  private updateNumber(char: string): void {
    const lastOperand = this.operands.pop();
    if (lastOperand === undefined) {
      this.operands.push(parseInt(char, 10));
    } else if (typeof lastOperand === 'number') {
      this.operands.push(parseInt(lastOperand.toString() + char, 10));
    }
    this.stream.next([...this.operands]); // destructuring was needed to emit the changed array
  }
}
