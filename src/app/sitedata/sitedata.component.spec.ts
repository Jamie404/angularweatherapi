import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SitedataComponent } from './sitedata.component';

describe('SitedataComponent', () => {
  let component: SitedataComponent;
  let fixture: ComponentFixture<SitedataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SitedataComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SitedataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
