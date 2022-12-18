import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPotholeComponent } from './add-pothole.component';

describe('AddPotholeComponent', () => {
  let component: AddPotholeComponent;
  let fixture: ComponentFixture<AddPotholeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddPotholeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddPotholeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
