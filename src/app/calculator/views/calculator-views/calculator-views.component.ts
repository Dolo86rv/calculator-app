import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CalculatorComponent } from '@/calculator/components/calculator/calculator.component';

@Component({
  selector: 'calculator-views',
  imports: [CalculatorComponent],
  templateUrl: './calculator-views.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class CalculatorViewsComponent { }
