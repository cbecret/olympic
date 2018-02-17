import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FlamepickerComponent } from './flamepicker.component';

describe('FlamepickerComponent', () => {
  let component: FlamepickerComponent;
  let fixture: ComponentFixture<FlamepickerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FlamepickerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlamepickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
