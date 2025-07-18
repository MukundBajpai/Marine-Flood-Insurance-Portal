import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyclientsComponent } from './myclients.component';

describe('MyclientsComponent', () => {
  let component: MyclientsComponent;
  let fixture: ComponentFixture<MyclientsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyclientsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyclientsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
