import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeBestsellersComponent } from './home-bestsellers.component';

describe('HomeBestsellersComponent', () => {
  let component: HomeBestsellersComponent;
  let fixture: ComponentFixture<HomeBestsellersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HomeBestsellersComponent]
    });
    fixture = TestBed.createComponent(HomeBestsellersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
