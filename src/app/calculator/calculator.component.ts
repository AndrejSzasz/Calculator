import { Component } from '@angular/core';
import { CalculateService } from './calculate.service';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.css']
})
export class CalculatorComponent {

  layout = [
    '1', '2', '3', '+',
    '4', '5', '6', '-',
    '7', '8', '9', '+/-',
    '0', 'C', 'AC', '=',
  ];

  constructor(public calculate: CalculateService) { }

  onPress(char: string): void {
    this.calculate.press(char);
  }
}
