import { Component } from '@angular/core';
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
    '7', '8', '9', '+/-',
    '0', 'C', 'AC', Operator.EQUALS,
  ];

  constructor(public calculate: CalculateService) { }

  onPress(char: string): void {
    this.calculate.press(char);
  }
}
