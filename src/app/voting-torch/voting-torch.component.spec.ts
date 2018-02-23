import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VotingTorchComponent } from './voting-torch.component';

describe('VotingTorchComponent', () => {
  let component: VotingTorchComponent;
  let fixture: ComponentFixture<VotingTorchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VotingTorchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VotingTorchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
