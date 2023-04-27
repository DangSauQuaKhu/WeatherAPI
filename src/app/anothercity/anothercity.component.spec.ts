import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnothercityComponent } from './anothercity.component';

describe('AnothercityComponent', () => {
  let component: AnothercityComponent;
  let fixture: ComponentFixture<AnothercityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnothercityComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnothercityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
