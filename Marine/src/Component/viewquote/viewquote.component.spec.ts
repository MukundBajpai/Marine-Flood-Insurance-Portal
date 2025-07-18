import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewquoteComponent } from './viewquote.component';

describe('ViewquoteComponent', () => {
  let component: ViewquoteComponent;
  let fixture: ComponentFixture<ViewquoteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewquoteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewquoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
