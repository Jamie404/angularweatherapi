import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChosendayComponent } from './chosenday.component';

describe('ChosendayComponent', () => {
  let component: ChosendayComponent;
  let fixture: ComponentFixture<ChosendayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChosendayComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChosendayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
