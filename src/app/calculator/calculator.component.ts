import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { CalculateService } from './calculate.service';
import { Operator } from './operator.enum';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.css']
})
export class CalculatorComponent {

  layout = [
    '1', '2', '3', Operator.PLUS,
    '4', '5', '6', Operator.MINUS,
    '7', '8', '9', Operator.PLUSMINUS,
    '0', Operator.CLEAR, Operator.ALLCLEAR, Operator.EQUALS,
  ];
  operations: Observable<string>

  constructor(public calculate: CalculateService) {
    this.operations = calculate.resultStream.pipe(
      map((array: Array<number | Operator>): string => array.join(''))
    );
  }

  onPress(char: string): void {
    this.calculate.press(char);
  }
}
