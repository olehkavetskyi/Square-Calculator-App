import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';

import { FormsModule } from '@angular/forms';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppComponent],
      imports: [FormsModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should calculate the midpoint correctly', () => {
    const midPoint = component.calculateMidpoint(0, 0, 4, 4);
    expect(midPoint).toEqual({ x: 2, y: 2 });
  });

  it('should calculate the distance correctly', () => {
    const distance = component.calculateDistance(0, 0, 3, 4);
    expect(distance).toBeCloseTo(5);
  });

  it('should calculate the angle correctly', () => {
    const angle = component.calculateAngle(1, 0, 0, 0, 0, 1);
    expect(angle).toBeCloseTo(90);
  });

  it('should determine if a shape is a square', () => {
    component.points = {
      AX: 0,
      AY: 0,
      BX: 0,
      BY: 4,
      CX: 4,
      CY: 4,
      DX: 4,
      DY: 0,
      OX: 2,
      OY: 2
    };

    const isSquare = component.isSquare(component.points);
    expect(isSquare).toBe(true);
  });

  it('should determine if a shape is not a square', () => {
    component.points = {
      AX: 0,
      AY: 0,
      BX: 0,
      BY: 4,
      CX: 3,
      CY: 4,
      DX: 3,
      DY: 0,
      OX: 2,
      OY: 2
    };

    const isSquare = component.isSquare(component.points);
    expect(isSquare).toBe(false);
  });

  it('should determine if the O point is the center of the square', () => {
    component.points = {
      AX: 0,
      AY: 0,
      BX: 0,
      BY: 4,
      CX: 4,
      CY: 4,
      DX: 4,
      DY: 0,
      OX: 2,
      OY: 2,
    };

    const isCenter = component.isCentre();
    expect(isCenter).toBe(true);
  });

  it('should determine if the O point is not the center of the square', () => {
    component.points = {
      AX: 0,
      AY: 0,
      BX: 0,
      BY: 4,
      CX: 4,
      CY: 4,
      DX: 4,
      DY: 0,
      OX: 1,
      OY: 2,
    };

    const isCenter = component.isCentre();
    expect(isCenter).toBe(false);
  });
});
