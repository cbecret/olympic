import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FlameitemComponent } from './flameitem.component';

describe('FlameitemComponent', () => {
  let component: FlameitemComponent;
  let fixture: ComponentFixture<FlameitemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FlameitemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlameitemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
