import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VotingPathComponent } from './voting-path.component';

describe('VotingPathComponent', () => {
  let component: VotingPathComponent;
  let fixture: ComponentFixture<VotingPathComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VotingPathComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VotingPathComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
