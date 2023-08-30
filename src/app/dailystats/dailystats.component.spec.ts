import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DailystatsComponent } from './dailystats.component';

describe('DailystatsComponent', () => {
  let component: DailystatsComponent;
  let fixture: ComponentFixture<DailystatsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DailystatsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DailystatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
