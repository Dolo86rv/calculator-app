import { provideZonelessChangeDetection } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { App } from './app';

describe('App', () => {

  let fixture: ComponentFixture<App>;
  let compiled: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
      providers: [provideZonelessChangeDetection()]
    }).compileComponents();

    fixture = TestBed.createComponent(App);
    compiled = fixture.nativeElement as HTMLElement;
  });

  it('should create the app', () => {
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it("should be 5", () => {
    //A = Arrage
    const num1 = 1;
    const num2 = 4;

    //A = Act
    const result = num1 + num2;

    //A = Assert
    expect(result).toBe(5);
  })

  it('should render router-outlet', () => {
    expect(compiled.querySelector('router-outlet')).not.toBeNull();
  })

  it('should render router-oulet wrapped with css classes', () => {
    const divElement = compiled.querySelector('div');
    const mustHaveClasses = "min-w-screen min-h-screen bg-slate-600 flex items-center justify-center px-5 py-5".split(' ');

    expect(divElement).not.toBeNull();

    //divElement?.classList.forEach(cssName => {
    //  expect(mustHaveClasses).toContain(cssName);
    //})

    const divClasses = divElement?.classList.value.split(' ');

    mustHaveClasses.forEach(cssName => {
      expect(divClasses).toContain(cssName);
    });
  })

  it("should contain the 'buy me a beer' link", () => {

    const anchorElement = compiled.querySelector('a');
    expect(anchorElement).not.toBeNull();
    expect(anchorElement?.title).toBe('Buy me a beer');
    expect(anchorElement?.getAttribute('href')).toBe('https://www.buymeacoffee.com/scottwindon');
  })

  
  //it('should render title', () => {
  //  const fixture = TestBed.createComponent(App);
  //  fixture.detectChanges();
  //  const compiled = fixture.nativeElement as HTMLElement;
  //  expect(compiled.querySelector('h1')?.textContent).toContain('zoneless-calculator');
  //});




});
