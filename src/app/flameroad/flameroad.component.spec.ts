import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FlameroadComponent } from './flameroad.component';

describe('FlameroadComponent', () => {
  let component: FlameroadComponent;
  let fixture: ComponentFixture<FlameroadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FlameroadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlameroadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
