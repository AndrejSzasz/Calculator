import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Operator } from './operator.enum';

@Injectable({
  providedIn: 'root'
})
export class CalculateService {

  private operands: Array<number | Operator> = [];
  private stream: Subject<Array<number | Operator>> = new Subject();
  public resultStream: Observable<Array<number | Operator>>;

  constructor() {
    this.resultStream = this.stream.asObservable();
  }

  press(char: string): void {
    console.log(char);
    if (char in Operator) {
      console.log('alma');
    }
  }

  add(param: any): void {

    if (typeof param === 'number') {
      this.operands.push(param);
    } else if (param === '+') {
      this.operands.push(Operator.PLUS);
    } else if (param === '=') {
      // this.operands.reduce((previous, current, array) => previous + current, 0);

    }
    this.stream.next(this.operands);


  }
}
