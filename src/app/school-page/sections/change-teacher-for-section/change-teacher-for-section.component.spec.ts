import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ChangeTeacherForSectionComponent } from './change-teacher-for-section.component';

describe('ChangeTeacherForSectionComponent', () => {
  let component: ChangeTeacherForSectionComponent;
  let fixture: ComponentFixture<ChangeTeacherForSectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChangeTeacherForSectionComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ChangeTeacherForSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
