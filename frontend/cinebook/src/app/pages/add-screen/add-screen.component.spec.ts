import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddScreenComponent } from './add-screen.component';

describe('AddScreenComponent', () => {
  let component: AddScreenComponent;
  let fixture: ComponentFixture<AddScreenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddScreenComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
