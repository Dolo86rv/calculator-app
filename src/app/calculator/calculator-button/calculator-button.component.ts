import { ChangeDetectionStrategy, Component, ElementRef, HostBinding, input, output, signal, viewChild, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'calculator-button',
  imports: [],
  templateUrl: './calculator-button.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./calculator-button.component.css'],
  host: {
    class: 'w-1/4 border-r border-b border-indigo-400',
    '[class.w-2/4]': 'isDoubleSize()',
    '[class.w-1/4]': '!isDoubleSize()'
  },
  //encapsulation: ViewEncapsulation.None,
})
export class CalculatorButtonComponent{

  //Eimitir eventos de click al padre
  public onClick = output<string>();
  public contentValue = viewChild<ElementRef<HTMLButtonElement>>('button');
  public isPressed = signal(false);

  public isCommand = input(false, {
    transform: ( value: boolean | string) =>
      typeof value === 'string' ? value === '' : value
  });

  public isDoubleSize = input(false, {
    transform: ( value: boolean | string) =>
      typeof value === 'string' ? value === '' : value
  });

  //@HostBinding('class.is-command') get commandStyle() {
  //  return this.isCommand() ? true : false;
  //}

  //@HostBinding('class.w-2/4') get doubleSizeStyle() {
  //  return this.isDoubleSize() ? true : false;
  //}

  handleClick() {
    if (!this.contentValue()?.nativeElement) {
      return;
    }
    const value = this.contentValue()!.nativeElement.innerText;
    this.onClick.emit(value.trim());
  }

  public keyboardPressedStyle(key: string) {
    if(!this.contentValue()?.nativeElement) return;

    const value = this.contentValue()!.nativeElement.innerText.trim();

    if ( value !== key) return;

    this.isPressed.set(true);

    setTimeout(() => {
      this.isPressed.set(false);
    }, 100);


  }

  //ngOnInit(): void {
  //  console.log(this.isCommand());
  //}
}
