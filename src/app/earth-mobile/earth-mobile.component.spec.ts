import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EarthMobileComponent } from './earth-mobile.component';

describe('EarthComponent', () => {
  let component: EarthMobileComponent;
  let fixture: ComponentFixture<EarthMobileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EarthMobileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EarthMobileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
