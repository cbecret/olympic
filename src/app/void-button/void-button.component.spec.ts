import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VoidButtonComponent } from './void-button.component';

describe('VoidButtonComponent', () => {
  let component: VoidButtonComponent;
  let fixture: ComponentFixture<VoidButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VoidButtonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VoidButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
