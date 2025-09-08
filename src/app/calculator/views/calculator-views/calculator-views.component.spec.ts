import { ComponentFixture, TestBed } from '@angular/core/testing';
import CalculatorViewsComponent from './calculator-views.component';

describe('calculatorViewComponent', () => {

  let fixture: ComponentFixture<CalculatorViewsComponent>;
  let compiled: HTMLElement;
  let component: CalculatorViewsComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CalculatorViewsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CalculatorViewsComponent);
    compiled = fixture.nativeElement as HTMLElement;
    component = fixture.componentInstance;
  });

  it('should create the app', () => {
    console.log(compiled);
    expect(component).toBeTruthy();
  });

  it('should contain calculator component', () => {
    expect(compiled.querySelector('calculator')).not.toBeNull();
  });

  it('should contain basic css classes', () => {
    const divElement = compiled.querySelector('div');
    const divClasses = divElement?.classList.value.split(' ');
    const shouldHave = 'w-full mx-auto rounded-xl bg-gray-100 shadow-xl text-gray-800 relative overflow-hidden'.split(' ');

    shouldHave.forEach(cls => {
      expect(divClasses).toContain(cls);
    });
  });

});

